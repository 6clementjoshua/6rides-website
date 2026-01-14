"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import VehicleShowcase from "@/components/VehicleShowcase";
import WaitlistModal from "@/components/WaitlistModal";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CTA = { label: string; href: string; variant?: "solid" | "outline" };
type CardVariant = "overlay" | "caption" | "split" | "minimal";
type MediaFit = "cover" | "contain";

type StoryCard = {
  key: string;
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  bullets?: string[];
  chips?: string[];
  ctas?: CTA[];
  variant: CardVariant;
  theme?: "light" | "dark";
  fit?: MediaFit;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function LiquidCard({ card }: { card: StoryCard }) {
  const isDark = card.theme === "dark";
  const fit: MediaFit = card.fit ?? "cover";

  /**
   * WATER GLASS (ALMOST TRANSPARENT):
   * - Very light tint
   * - Strong blur for “water” feel
   * - Subtle border, subtle shadow
   */
  const waterGlass =
    "backdrop-blur-x-2 bg-black/50 border border-white/38 shadow-[0_28px_85px_rgba(50,10,0,0.18)]";
  const waterGlassDark =
    "backdrop-blur-x-2 bg-black/50 border border-white/36 shadow-[0_28px_85px_rgba(50,10,0,0.28)]";

  const outer =
    "rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.07)]";

  const imageStage = cx(
    "relative w-full",
    "h-[360px] md:h-[520px]",
    isDark ? "bg-black" : "bg-neutral-100"
  );

  const imageClass = cx(
    "h-full w-full",
    fit === "contain" ? "object-contain" : "object-cover",
    "object-center",
    "transition duration-700 ease-out",
    "group-hover:scale-[1.03]"
  );

  // Overlay content is ALWAYS WHITE (as requested)
  const eyebrowCls = "text-[11px] font-semibold tracking-wide text-white/85";
  const titleCls = "mt-1 text-2xl font-semibold md:text-3xl text-white";
  const subtitleCls = "mt-2 text-sm md:text-[15px] text-white/78";

  const chipCls =
    "rounded-full px-3 py-1 text-[11px] font-semibold border border-white/14 bg-white/10 text-white/85";

  const ctaSolid =
    "rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90";
  const ctaOutline =
    "rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition hover:border-white/45 hover:bg-white/10";

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="group"
    >
      <div className={outer}>
        {/* IMAGE */}
        <div className={imageStage}>
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className={imageClass}
            priority={card.key === "hero"}
          />

          {/* SUPER SOFT GRADIENT (don’t darken the photo too much) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/04 to-transparent" />
            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-0 transition duration-700 group-hover:opacity-100" />
          </div>

          {/* WATER SEE-THROUGH HEADING BLOCK */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <div className={cx("max-w-3xl", isDark ? waterGlassDark : waterGlass, "rounded-2xl p-4 md:p-5")}>
              {card.eyebrow && <div className={eyebrowCls}>{card.eyebrow}</div>}

              <h3 className={titleCls}>{card.title}</h3>

              <p className={subtitleCls}>{card.subtitle}</p>

              {card.chips?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.chips.map((c) => (
                    <span key={c} className={chipCls}>
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}

              {card.ctas?.length ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {card.ctas.map((cta) => (
                    <a
                      key={cta.href + cta.label}
                      href={cta.href}
                      className={cta.variant === "outline" ? ctaOutline : ctaSolid}
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Text under image for caption/split variants (leave normal clean white section) */}
        {card.variant === "caption" && (
          <div className="bg-white border-t border-black/10 px-5 py-5 md:px-7 md:py-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="w-full">
                {card.bullets?.length ? (
                  <ul className="mt-1 grid gap-2 text-sm text-black/65 sm:grid-cols-2">
                    {card.bullets.map((b) => (
                      <li key={b} className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2">
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-black/65">{(card.chips ?? []).slice(0, 6).join(" • ")}</div>
                )}
              </div>

              {card.ctas?.length ? (
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {card.ctas.map((cta) => (
                    <a
                      key={cta.href + cta.label}
                      href={cta.href}
                      className={cx(
                        "rounded-full px-5 py-2.5 text-xs font-semibold transition",
                        cta.variant === "outline"
                          ? "border border-black/15 text-black hover:border-black/30"
                          : "bg-black text-white hover:bg-black/90"
                      )}
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {card.variant === "split" && (
          <div className="bg-white border-t border-black/10 px-5 py-5 md:px-7 md:py-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
              <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                <div className="text-sm font-semibold">What you get</div>
                <div className="mt-2 grid gap-2 text-sm text-black/65 sm:grid-cols-2">
                  {(card.chips ?? []).slice(0, 6).map((c) => (
                    <div key={c} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-black/70" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                {card.ctas?.length ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {card.ctas.map((cta) => (
                      <a
                        key={cta.href + cta.label}
                        href={cta.href}
                        className={cx(
                          "rounded-full px-5 py-2.5 text-xs font-semibold transition",
                          cta.variant === "outline"
                            ? "border border-black/15 text-black hover:border-black/30"
                            : "bg-black text-white hover:bg-black/90"
                        )}
                      >
                        {cta.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="text-sm font-semibold">Why people switch</div>
                <div className="mt-2 space-y-2 text-sm text-black/65">
                  {(card.chips ?? []).slice(0, 5).map((c) => (
                    <div key={c} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-black/70" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                {card.ctas?.length ? (
                  <div className="mt-4">
                    {card.ctas.slice(0, 1).map((cta) => (
                      <a
                        key={cta.href + cta.label}
                        href={cta.href}
                        className="block rounded-full bg-black px-5 py-3 text-center text-xs font-semibold text-white transition hover:bg-black/90"
                      >
                        {cta.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const cards: StoryCard[] = useMemo(
    () => [
      {
        key: "hero",
        src: "/images/6ride/lifestyle/6ride_shopping_trunk_loading.png",
        alt: "6Rides premium lifestyle pickup after shopping",
        eyebrow: "Lifestyle • Premium pickup",
        title: "Designed for real life, not just rides.",
        subtitle:
          "Shopping runs, daily movement, and smooth pickups — 6Rides is built for comfort, cleanliness, and confidence across every trip.",
        chips: ["Clean pickups", "Premium comfort", "Schedule-ready", "Safe arrivals"],
        ctas: [
          { label: "Book now", href: "/book" },
          { label: "Contact us", href: "/contact", variant: "outline" },
        ],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "food_brand",
        src: "/images/6ride/food/6ride_food_delivery_brand_showcase.png",
        alt: "6Rides food delivery branded rider",
        eyebrow: "Food delivery • Branded operations",
        title: "Food delivery with brand standards.",
        subtitle:
          "Branded riders, protected packaging, and consistent service rules — designed to keep restaurants and customers satisfied, every single delivery.",
        bullets: [
          "Branded delivery kits and uniformed riders",
          "Secure handling and clean presentation",
          "Fast dispatch and reliable drop-off",
          "Support available when needed",
        ],
        ctas: [{ label: "Order delivery", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },
      {
        key: "food_traffic",
        src: "/images/6ride/food/6ride_food_delivery_heavy_traffic.png",
        alt: "6Rides food delivery in heavy traffic",
        eyebrow: "Food delivery • City performance",
        title: "Delivery that performs in real traffic.",
        subtitle:
          "Nigeria traffic is real — 6Rides delivery operations are built around smart routing, disciplined riders, and predictable customer updates.",
        chips: ["Traffic-ready operations", "Reliable dispatch", "Fast city coverage", "Consistent quality", "Predictable updates"],
        ctas: [{ label: "Book delivery", href: "/book" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },
      {
        key: "food_handover",
        src: "/images/6ride/food/6ride_food_delivery_customer_handover.png",
        alt: "6Rides rider handing over a food delivery",
        eyebrow: "Food delivery • Customer handover",
        title: "A handover you can trust.",
        subtitle:
          "Every drop-off is treated like a brand moment — clean, respectful, and professional, so customers remember the service (and order again).",
        chips: ["Professional delivery", "Clean handover", "Customer satisfaction", "Repeat orders"],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "emergency",
        src: "/images/6ride/emergency/6ride_emergency_medical_street_response.png",
        alt: "6Rides emergency response vehicle assisting on the street",
        eyebrow: "Emergency • Rapid response support",
        title: "Emergency response support when minutes matter.",
        subtitle:
          "In urgent moments, speed and coordination matter. 6Rides emergency support is built for fast dispatch, calm handling, and responsible transport.",
        bullets: [
          "Rapid dispatch support in active city zones",
          "Professional handling and coordination mindset",
          "Designed for safety-first response",
          "Clear communication from pickup to drop-off",
        ],
        ctas: [{ label: "Request support", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "partner_male_phone",
        src: "/images/6ride/partner/6ride_partner_vehicle_premium_male_phone.png",
        alt: "6Rides partner premium vehicle with male rider on phone",
        eyebrow: "Partner vehicles • Premium listing",
        title: "Partner-listed premium cars, controlled by standards.",
        subtitle:
          "Partners list premium cars while 6Rides enforces brand standards for cleanliness, driver conduct, and rider experience — so quality stays consistent.",
        chips: ["Premium partners", "Brand standards", "Monthly earning model", "Quality control"],
        ctas: [
          { label: "Partner with 6Rides", href: "/partners" },
          { label: "Book now", href: "/book", variant: "outline" },
        ],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },
      {
        key: "partner_female_cadillac",
        src: "/images/6ride/partner/6ride_partner_vehicle_premium_female_cadillac.png",
        alt: "6Rides partner vehicle premium female near Cadillac SUV",
        eyebrow: "Partner vehicles • Comfort & class",
        title: "Premium comfort for daily movement.",
        subtitle:
          "If you’re switching from ordinary ride-hailing, you’ll feel the difference: cleaner vehicles, calmer service, and a more premium arrival experience.",
        bullets: ["Cleaner rides", "Better arrivals", "Premium comfort", "Professional drivers"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },
      {
        key: "partner_range_rover",
        src: "/images/6ride/partner/6ride_partner_vehicle_range_rover_female.png",
        alt: "6Rides partner Range Rover with female rider",
        eyebrow: "Partner vehicles • Premium SUV",
        title: "SUV class for executive comfort.",
        subtitle: "Perfect for premium pickups, business movement, and higher-comfort trips — when you want more than a basic ride.",
        chips: ["Executive comfort", "SUV class", "Smooth experience", "Clean interior"],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },
      {
        key: "partner_audi_male",
        src: "/images/6ride/partner/6ride_partner_vehicle_audi_male.png",
        alt: "6Rides partner Audi premium with male rider",
        eyebrow: "Partner vehicles • Premium sedan",
        title: "Premium sedans that look as good as they ride.",
        subtitle: "For airport runs, meetings, and night movement — premium sedans give you a cleaner arrival, better comfort, and a more confident experience.",
        chips: ["Meetings", "Airport runs", "Night mobility", "Comfort", "Better arrivals"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },
      {
        key: "partner_bmw_female_tablet",
        src: "/images/6ride/partner/6ride_partner_vehicle_bmw_female_tablet.png",
        alt: "6Rides partner BMW with female using tablet",
        eyebrow: "Partner vehicles • Business-ready",
        title: "Business-ready rides for modern professionals.",
        subtitle: "Stable pickup time, clean interior, and a calmer ride — the kind of experience that matches business life in Abuja, Lagos, and beyond.",
        bullets: ["Business-ready", "Calm trips", "Clean interior", "Stable pickup"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },
      {
        key: "partner_mercedes_male",
        src: "/images/6ride/partner/6ride_partner_vehicle_mercedes_male.png",
        alt: "6Rides partner Mercedes with male rider",
        eyebrow: "Partner vehicles • Premium badge",
        title: "Premium rides, premium standards — every time.",
        subtitle: "6Rides targets consistency: verified drivers, higher service expectations, and the kind of ride you’re proud to step out of.",
        chips: ["Verified drivers", "Higher standards", "Premium feel", "Proud arrivals"],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "hotel_chauffeur",
        src: "/images/6ride/corporate/6ride_chauffeur_hotel_arrival_service.png",
        alt: "6Rides chauffeur service at hotel arrival",
        eyebrow: "Chauffeur • Hotel arrivals",
        title: "Hotel arrivals with a chauffeur mindset.",
        subtitle:
          "Professional arrivals and respectful service matter. 6Rides is built to handle premium pickups smoothly — especially for travelers and executives.",
        bullets: ["Hotel arrivals", "Executive pickups", "Scheduled trips", "Professional conduct"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "night_traffic",
        src: "/images/6ride/infrastructure/6ride_night_city_traffic_mercedes.png",
        alt: "6Rides vehicle in night city traffic",
        eyebrow: "Urban mobility • Night rides",
        title: "Night rides you can trust.",
        subtitle: "When traffic is dense and visibility is low, you want a service built around compliance, safe driving, and quick support when needed.",
        chips: ["Night safety", "Urban reliability", "Support-ready", "Compliance", "Safer trips"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },

      {
        key: "corporate_pickup",
        src: "/images/6ride/corporate/6ride_corporate_client_pickup.png",
        alt: "6Rides corporate client pickup at office",
        eyebrow: "Corporate • Client movement",
        title: "Corporate client pickups that look professional.",
        subtitle: "For meetings, office movement, and client pickups, 6Rides gives you a cleaner, more premium, and more dependable experience than basic ride-hailing.",
        bullets: ["Client pickups", "Office mobility", "Professional look", "Dependable"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "airport_fleet",
        src: "/images/6ride/infrastructure/6ride_airport_fleet_lineup.png",
        alt: "6Rides fleet lineup at airport",
        eyebrow: "Operations • Fleet readiness",
        title: "Fleet readiness for scheduled operations.",
        subtitle: "Airport transfers and scheduled trips depend on reliability. 6Rides is structured to run fleet operations with discipline and predictable service.",
        chips: ["Scheduled rides", "Airport transfers", "Fleet discipline", "Reliable dispatch"],
        ctas: [
          { label: "Book now", href: "/book" },
          { label: "Corporate accounts", href: "/contact", variant: "outline" },
        ],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "police_compliance",
        src: "/images/6ride/infrastructure/6ride_police_traffic_compliance.png",
        alt: "6Rides traffic compliance scene",
        eyebrow: "Safety • Traffic compliance",
        title: "Traffic & compliance — built into the brand.",
        subtitle: "A serious ride brand respects the road. 6Rides emphasizes compliance, safer driving culture, and professional conduct — especially in busy city movement.",
        bullets: ["Compliance-focused service culture", "Professional conduct expectations", "Safer operation in dense traffic areas", "Support-first escalation when needed"],
        ctas: [
          { label: "Book now", href: "/book" },
          { label: "Contact support", href: "/contact", variant: "outline" },
        ],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "restaurant_elixir",
        src: "/images/6ride/infrastructure/6ride_restaurant_pickup_elixir.png",
        alt: "6Rides vehicle at Elixir of Restaurant pickup",
        eyebrow: "Brand moments • Pickup points",
        title: "Clean pickups at premium venues.",
        subtitle: "From restaurants to lounges and events — the pickup experience matters. 6Rides is designed to feel premium where people actually live and socialize.",
        chips: ["Premium venues", "Clean pickup", "Brand presence", "Smooth exit"],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "family_beach",
        src: "/images/6ride/lifestyle/6ride_family_beach_lifestyle.png",
        alt: "6Rides family beach lifestyle transport",
        eyebrow: "Lifestyle • Family movement",
        title: "Family trips made smoother.",
        subtitle: "When comfort matters — family outings, weekend trips, lifestyle movement — 6Rides supports clean rides and calmer travel moments.",
        chips: ["Family-friendly", "Comfort", "Clean ride", "Weekend-ready", "Safe arrivals"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },

      {
        key: "business_exchange",
        src: "/images/6ride/corporate/6ride_business_document_exchange.png",
        alt: "6Rides business document exchange beside vehicle",
        eyebrow: "Business • Secure handovers",
        title: "Business movement with confidence.",
        subtitle: "For professionals, time and trust matter. 6Rides supports dependable movement for business activities — when you want a calmer, cleaner, more credible ride.",
        bullets: ["Professional trust", "Business-ready", "Clean arrival", "Reliable pickup"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "campus",
        src: "/images/6ride/lifestyle/6ride_campus_student_transport.png",
        alt: "6Rides campus student transport scene",
        eyebrow: "Campus • Student movement",
        title: "Campus movement that feels safer and more organized.",
        subtitle: "Students need reliability and safe pickup culture. 6Rides supports more disciplined operations for daily campus movement and local trips.",
        bullets: ["Clear pickup culture", "More predictable arrival experience", "Safe movement mindset", "Support-first escalation"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "urus",
        src: "/images/6ride/lifestyle/6ride_highway_performance_urus.png",
        alt: "6Rides performance vehicle on highway",
        eyebrow: "Premium fleet • Highway performance",
        title: "Premium performance when you’re moving long distance.",
        subtitle: "For highway travel and inter-city movement, premium comfort and calm handling change the entire experience — less stress, better control, better travel.",
        chips: ["Highway comfort", "Premium handling", "Long-distance feel", "Stable experience"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },
    ],
    []
  );

  const allCards = useMemo(() => {
    const extra: StoryCard = {
      key: "partner_scale_program",
      src: "/images/6ride/partner/6ride_partner_vehicle_premium_female_cadillac.png",
      alt: "6Rides partner program premium vehicle standardization",
      eyebrow: "Partners • Scale program",
      title: "A partner program designed to scale.",
      subtitle:
        "6Rides gives premium car owners a structured system: brand standards, premium positioning, and a monthly earning model tied to utilization — built to grow city-by-city.",
      chips: ["Monthly payouts", "Premium positioning", "Brand standards", "City-by-city expansion", "Partner growth"],
      ctas: [
        { label: "Partner with 6Rides", href: "/partners" },
        { label: "Investor overview", href: "/investors", variant: "outline" },
      ],
      variant: "split",
      theme: "light",
      fit: "cover",
    };

    return [...cards, extra];
  }, [cards]);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-20%] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-white/10 blur-[150px]" />
          <div className="absolute right-[-10%] top-[35%] h-[520px] w-[520px] rounded-full bg-white/5 blur-[170px]" />
        </div>

        <header className="flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-2">
            <Image src="/6logo.PNG" alt="6Rides" width={32} height={32} priority className="h-9 w-9" />
            <div className="text-xl font-semibold tracking-wide">
              <span className="opacity-90">Rides</span>
            </div>
          </div>
        </header>

        <div className="px-6 pb-14 pt-6 md:px-12">
          <div className="grid min-h-[calc(92vh-140px)] grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOut }}
                className="text-4xl font-semibold leading-tight md:text-6xl"
              >
                Premium mobility,
                <br />
                <span className="text-white/90">built for modern Nigeria.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
                className="mt-4 max-w-xl text-sm text-white/70 md:text-base"
              >
                Ride-hailing, food delivery, emergency response, corporate movement, and premium partner vehicles — engineered with trust, compliance, and comfort.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.25 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.a
                  href="/book"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Book a Ride Now
                </motion.a>

                <motion.button
                  onClick={() => setWaitlistOpen(true)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm transition hover:border-white/40"
                >
                  Download 6Rides
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.32 }}
                className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60"
              >
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Verified drivers</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Emergency support</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Premium fleet</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Nigeria-first</span>
              </motion.div>

              <div className="mt-6 text-xs text-white/55">
                Currently operating with focus in <span className="font-semibold text-white/80">Cross River (HQ)</span> and expanding across{" "}
                <span className="font-semibold text-white/80">Abuja, Lagos, Port Harcourt, and Akwa Ibom</span>. Booking is completed online through{" "}
                <span className="font-semibold text-white/80">Book Now</span>.
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <VehicleShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE GALLERY */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">See what premium looks like</h2>
              <p className="mt-2 max-w-2xl text-sm text-black/65">
                Every scene below represents a service promise — cleaner vehicles, stronger standards, better safety culture, and a more enjoyable experience from pickup to drop-off.
              </p>
            </div>
            
          </motion.div>

          <div className="mt-8 space-y-10 md:space-y-12">
            {allCards.map((card) => (
              <LiquidCard key={card.key} card={card} />
            ))}
          </div>
        </div>
      </section>
      {/* FOOTER + POLICIES */}
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
          {/* BRAND */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-0">
              <Image
                src="/6logo.png"
                alt="6Rides"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-sm font-semibold">Rides</span>
            </div>

            <p className="mt-1 text-sm text-black/50">
              Premium mobility for modern Nigeria.
            </p>
          </div>

          {/* POLICIES */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-center text-[12px] font-semibold text-black/70">
            <Link href="/policies/terms" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Terms of Service
            </Link>

            <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Privacy Policy
            </Link>

            <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Acceptable Use
            </Link>

            <Link href="/policies/safety" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Safety Guidelines
            </Link>

            <Link href="/policies/refunds" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Refund & Cancellation
            </Link>

            <Link href="/policies/subscription-billing" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Subscription & Billing
            </Link>

            <Link href="/policies/partner-terms" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Partner Terms
            </Link>

            <Link href="/policies/emergency" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Emergency Disclaimer
            </Link>

            <Link href="/policies/contact" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Contact
            </Link>

            <Link href="/policies/child-student-safety" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Child & Student Safety
            </Link>

            <Link href="/policies/insurance-liability" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Insurance & Liability
            </Link>

            <Link href="/policies/corporate-sla" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              Corporate SLA
            </Link>

          </div>

          {/* TRADEMARK */}
          <div className="mt-8 text-center text-xs text-black/50">
            © {new Date().getFullYear()} 6Rides. A 6Clement Joshua Service. All rights reserved.
          </div>
        </div>
      </footer>


      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} source="hero" />
    </main>
  );
}
