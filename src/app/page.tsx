// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import VehicleShowcase from "@/components/VehicleShowcase";
import WaitlistModal from "@/components/WaitlistModal";
import BookingModal from "@/components/BookingModal";

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
  learnHref?: string; // card detail page route
  hideLearnMore?: boolean;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function LiquidCard({
  card,
  onBook,
}: {
  card: StoryCard;
  onBook: () => void;
}) {
  const isDark = card.theme === "dark";

  // Mobile priority: show full image (no crop), desktop remains premium cover.
  // If card.fit is explicitly "contain", keep contain everywhere.
  const fit: MediaFit = card.fit ?? "cover";

  const waterGlass =
    "backdrop-blur-x-2 bg-black/50 border border-white/38 shadow-[0_28px_85px_rgba(50,10,0,0.18)]";
  const waterGlassDark =
    "backdrop-blur-x-2 bg-black/50 border border-white/36 shadow-[0_28px_85px_rgba(50,10,0,0.28)]";

  const outer =
    "rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.07)]";

  const imageStage = cx(
    "relative w-full overflow-hidden",
    "h-[300px] sm:h-[340px] md:h-[520px]",
    isDark ? "bg-black" : "bg-neutral-100"
  );

  const imageClass = cx(
    "h-full w-full object-center transition duration-700 ease-out",
    // Mobile: contain for full visibility; Desktop: keep the original look.
    fit === "contain" ? "object-contain" : "object-contain md:object-cover",
    // Remove zoom on mobile; keep mild zoom on desktop hover only.
    "md:group-hover:scale-[1.03]"
  );

  const eyebrowCls = "text-[11px] font-semibold tracking-wide text-white/85";
  const titleCls = "mt-1 text-2xl font-semibold md:text-3xl text-white";
  const subtitleCls = "mt-2 text-sm md:text-[15px] text-white/78";

  const chipCls =
    "rounded-full px-3 py-1 text-[11px] font-semibold border border-white/14 bg-white/10 text-white/85";

  // Desktop stays as-is; Mobile becomes smaller pill size.
  const ctaSolid =
    "rounded-full bg-white px-3.5 py-2 text-[11px] font-semibold text-black transition hover:bg-white/90 md:px-5 md:py-2.5 md:text-xs";
  const ctaOutline =
    "rounded-full border border-white/25 bg-white/5 px-3.5 py-2 text-[11px] font-semibold text-white transition hover:border-white/45 hover:bg-white/10 md:px-5 md:py-2.5 md:text-xs";

  const learnHref = card.learnHref ?? `/learn/${card.key}`;

  const withLearnMore = (ctas: CTA[] | undefined) => {
    const base = ctas ? [...ctas] : [];
    if (card.hideLearnMore) return base;

    const alreadyHasLearn = base.some((c) => c.href === learnHref);
    if (!alreadyHasLearn) {
      base.push({ label: "Learn more", href: learnHref, variant: "outline" });
    }
    return base;
  };

  const renderCTA = (cta: CTA) => {
    const cls = cta.variant === "outline" ? ctaOutline : ctaSolid;

    // IMPORTANT: any CTA pointing to /book opens modal (no navigation)
    if (cta.href === "/book") {
      return (
        <button
          key={cta.href + cta.label}
          type="button"
          onClick={onBook}
          className={cls}
        >
          {cta.label}
        </button>
      );
    }

    return (
      <a key={cta.href + cta.label} href={cta.href} className={cls}>
        {cta.label}
      </a>
    );
  };

  const topCtas = withLearnMore(card.ctas);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="group"
    >
      <div className={outer}>
        <div className={imageStage}>
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className={imageClass}
            priority={card.key === "hero"}
          />

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/04 to-transparent" />
            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-0 transition duration-700 group-hover:opacity-100" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <div
              className={cx(
                "max-w-3xl",
                isDark ? waterGlassDark : waterGlass,
                "rounded-2xl p-4 md:p-5"
              )}
            >
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

              {topCtas.length ? (
                <div className="mt-4 flex flex-wrap gap-2.5 md:gap-3">
                  {topCtas.map(renderCTA)}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {card.variant === "caption" && (
          <div className="bg-white border-t border-black/10 px-5 py-5 md:px-7 md:py-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="w-full">
                {card.bullets?.length ? (
                  <ul className="mt-1 grid gap-2 text-sm text-black/65 sm:grid-cols-2">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-black/65">
                    {(card.chips ?? []).slice(0, 6).join(" • ")}
                  </div>
                )}
              </div>

              {withLearnMore(card.ctas).length ? (
                <div className="flex flex-wrap gap-2.5 md:gap-3 lg:justify-end">
                  {withLearnMore(card.ctas).map((cta) => {
                    const cls = cx(
                      "rounded-full font-semibold transition",
                      // Mobile smaller pills; Desktop unchanged
                      "px-3.5 py-2 text-[11px] md:px-5 md:py-2.5 md:text-xs",
                      cta.variant === "outline"
                        ? "border border-black/15 text-black hover:border-black/30"
                        : "bg-black text-white hover:bg-black/90"
                    );

                    if (cta.href === "/book") {
                      return (
                        <button
                          key={cta.href + cta.label}
                          type="button"
                          onClick={onBook}
                          className={cls}
                        >
                          {cta.label}
                        </button>
                      );
                    }

                    return (
                      <a
                        key={cta.href + cta.label}
                        href={cta.href}
                        className={cls}
                      >
                        {cta.label}
                      </a>
                    );
                  })}
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

                {withLearnMore(card.ctas).length ? (
                  <div className="mt-4 flex flex-wrap gap-2.5 md:gap-3">
                    {withLearnMore(card.ctas).map((cta) => {
                      const cls = cx(
                        "rounded-full font-semibold transition",
                        "px-3.5 py-2 text-[11px] md:px-5 md:py-2.5 md:text-xs",
                        cta.variant === "outline"
                          ? "border border-black/15 text-black hover:border-black/30"
                          : "bg-black text-white hover:bg-black/90"
                      );

                      if (cta.href === "/book") {
                        return (
                          <button
                            key={cta.href + cta.label}
                            type="button"
                            onClick={onBook}
                            className={cls}
                          >
                            {cta.label}
                          </button>
                        );
                      }

                      return (
                        <a
                          key={cta.href + cta.label}
                          href={cta.href}
                          className={cls}
                        >
                          {cta.label}
                        </a>
                      );
                    })}
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

                {withLearnMore(card.ctas).length ? (
                  <div className="mt-4">
                    {/* Keep first CTA prominent; Learn more remains available in top overlay + caption/split pills */}
                    {withLearnMore(card.ctas).slice(0, 1).map((cta) => {
                      const cls =
                        "block rounded-full bg-black px-4 py-2.5 text-center text-[11px] font-semibold text-white transition hover:bg-black/90 md:px-5 md:py-3 md:text-xs";

                      if (cta.href === "/book") {
                        return (
                          <button
                            key={cta.href + cta.label}
                            type="button"
                            onClick={onBook}
                            className={cls}
                          >
                            {cta.label}
                          </button>
                        );
                      }

                      return (
                        <a
                          key={cta.href + cta.label}
                          href={cta.href}
                          className={cls}
                        >
                          {cta.label}
                        </a>
                      );
                    })}
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
  const [bookingOpen, setBookingOpen] = useState(false);

  const onBook = () => setBookingOpen(true);

  const cards: StoryCard[] = useMemo(
    () => [
      {
        key: "hero",
        src: "/images/6ride/lifestyle/6ride_shopping_trunk_loading.png",
        alt: "6Rides premium lifestyle pickup after shopping",
        eyebrow: "Lifestyle • Premium pickup",
        title: "Designed for real life, not just rides.",
        subtitle:
          "From quick errands to lifestyle movement, 6Rides is built around cleanliness, comfort, and predictable service — so every trip feels premium, not stressful.",
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
        learnHref: "/learn/hero",
      },

      {
        key: "food_brand",
        src: "/images/6ride/food/6ride_food_delivery_brand_showcase.png",
        alt: "6Rides food delivery branded rider",
        eyebrow: "Food delivery • Branded operations",
        title: "Food delivery with brand standards.",
        subtitle:
          "Not just dispatch — a disciplined delivery system: branded riders, protected packaging, and consistent handling that keeps restaurants trusted and customers confident.",
        bullets: [
          "Branded delivery kits and uniformed riders",
          "Secure handling and clean presentation",
          "Fast dispatch and reliable drop-off",
          "Support available when needed",
        ],
        ctas: [{ label: "Book now", href: "/book" }],
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
          "Nigeria traffic is real. 6Rides delivery is built around smart routing, disciplined riders, and predictable updates — so customers stay calm and restaurants stay respected.",
        ctas: [{ label: "Book now", href: "/book" }],
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
          "Every drop-off is treated like a brand moment — clean, respectful, and professional. Customers remember good delivery, and they order again.",
        ctas: [{ label: "Book now", href: "/book" }],
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
          "In urgent moments, speed and coordination matter. This program is built for fast dispatch, calm handling, and responsible transport support — with safety-first rules.",
        bullets: [
          "Rapid dispatch support in active city zones",
          "Professional handling and coordination mindset",
          "Designed for safety-first response",
          "Clear communication from pickup to drop-off",
        ],
        // IMPORTANT: Request support routes to /emergency-support (not booking)
        ctas: [{ label: "Request support", href: "/emergency-support" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      // PARTNER VEHICLES (NO BOOK NOW)
      {
        key: "partner_male_phone",
        src: "/images/6ride/partner/6ride_partner_vehicle_premium_male_phone.png",
        alt: "6Rides partner premium vehicle with male rider on phone",
        eyebrow: "Partner vehicles • Earn with standards",
        title: "Partner with 6Rides and earn with premium positioning.",
        subtitle:
          "Own a premium vehicle? Join a structured partner program built around brand standards, verified onboarding, and a quality-first rider experience.",
        ctas: [{ label: "Partner with 6Rides", href: "/partner" }],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "partner_female_cadillac",
        src: "/images/6ride/partner/6ride_partner_vehicle_premium_female_cadillac.png",
        alt: "6Rides partner vehicle premium female near Cadillac SUV",
        eyebrow: "Partner vehicles • Premium owners",
        title: "Turn your premium car into a premium income stream.",
        subtitle:
          "We’re building a partner network where image, cleanliness, and conduct matter. If you keep your car premium, we position it premium — and protect the brand.",
        bullets: [
          "Premium vehicle onboarding",
          "Brand & cleanliness standards",
          "Verified partner identity",
          "Structured earning model",
        ],
        ctas: [{ label: "Partner with 6Rides", href: "/partner" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "partner_range_rover",
        src: "/images/6ride/partner/6ride_partner_vehicle_range_rover_female.png",
        alt: "6Rides partner Range Rover with female rider",
        eyebrow: "Partner vehicles • SUV class",
        title: "SUV owners: partner with a premium-first brand.",
        subtitle:
          "Executive SUVs are in demand for business and lifestyle movement. Join the 6Rides partner program and list your SUV under enforced standards and premium positioning.",
        ctas: [{ label: "Partner with 6Rides", href: "/partner" }],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "partner_audi_male",
        src: "/images/6ride/partner/6ride_partner_vehicle_audi_male.png",
        alt: "6Rides partner Audi premium with male rider",
        eyebrow: "Partner vehicles • Premium sedans",
        title: "Premium sedans. Premium rules. Premium earnings.",
        subtitle:
          "If you can maintain a high standard, we help you earn at a higher standard. 6Rides is building a premium sedan partner network city-by-city.",
        ctas: [{ label: "Partner with 6Rides", href: "/partner" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },

      {
        key: "partner_bmw_female_tablet",
        src: "/images/6ride/partner/6ride_partner_vehicle_bmw_female_tablet.png",
        alt: "6Rides partner BMW with female using tablet",
        eyebrow: "Partner vehicles • Business-ready",
        title: "A partner program designed for professionals.",
        subtitle:
          "This is for owners who value professionalism: verified onboarding, disciplined standards, and a premium rider experience that protects your vehicle’s image.",
        bullets: ["Verified onboarding", "Premium standards", "Professional conduct", "Brand protection"],
        ctas: [{ label: "Partner with 6Rides", href: "/partner" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "partner_mercedes_male",
        src: "/images/6ride/partner/6ride_partner_vehicle_mercedes_male.png",
        alt: "6Rides partner Mercedes with male rider",
        eyebrow: "Partner vehicles • Premium badge",
        title: "Mercedes owners: list with standards, not noise.",
        subtitle:
          "We’re building a premium-only image. If your car is premium and your conduct is professional, the partner program is built for you.",
        ctas: [{ label: "Partner with 6Rides", href: "/partner" }],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },

      // SERVICES (BOOK NOW + LEARN MORE)
      {
        key: "hotel_chauffeur",
        src: "/images/6ride/corporate/6ride_chauffeur_hotel_arrival_service.png",
        alt: "6Rides chauffeur service at hotel arrival",
        eyebrow: "Chauffeur • Hotel arrivals",
        title: "Hotel arrivals with a chauffeur mindset.",
        subtitle:
          "Premium arrivals should feel calm and organized. 6Rides supports disciplined pickups for travelers, executives, and high-standard movement.",
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
        subtitle:
          "Dense traffic and low visibility demand discipline. 6Rides emphasizes safer driving culture, compliance, and quick support escalation when needed.",
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
        title: "Corporate pickups that look professional.",
        subtitle:
          "For meetings and client movement, presentation matters. 6Rides is built to deliver a cleaner, more premium, and more dependable experience than basic ride-hailing.",
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
        subtitle:
          "Airport transfers and scheduled trips depend on reliability. 6Rides is structured to run disciplined operations with predictable service and support.",
        ctas: [{ label: "Book now", href: "/book" }],
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
        subtitle:
          "A serious ride brand respects the road. 6Rides emphasizes compliance, safer driving culture, and professional conduct — especially in busy city movement.",
        bullets: [
          "Compliance-focused service culture",
          "Professional conduct expectations",
          "Safer operation in dense traffic areas",
          "Support-first escalation when needed",
        ],
        ctas: [{ label: "Book now", href: "/book" }],
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
        subtitle:
          "From restaurants to lounges and events — pickup experience matters. 6Rides is designed to feel premium where people actually live and socialize.",
        ctas: [{ label: "Book now", href: "/book" }],
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
        subtitle:
          "When comfort matters — outings, weekend trips, lifestyle movement — 6Rides supports cleaner rides and calmer travel moments for families.",
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
        subtitle:
          "For professionals, time and trust matter. 6Rides supports dependable movement for business activity — when you want a calmer, cleaner, more credible ride.",
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
        subtitle:
          "Students need reliability and safe pickup culture. 6Rides supports more disciplined operations for daily campus movement and local trips.",
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
        title: "Premium performance for longer movement.",
        subtitle:
          "For highway travel and inter-city movement, premium comfort changes everything — less stress, better control, and a calmer travel experience.",
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
      title: "A partner program designed to scale city-by-city.",
      subtitle:
        "6Rides gives premium car owners a structured system: brand standards, premium positioning, onboarding verification, and a utilization-based earning model designed to grow fast.",
      ctas: [
        { label: "Partner with 6Rides", href: "/partner" },
        { label: "Investor overview", href: "/investors", variant: "outline" },
      ],
      variant: "split",
      theme: "light",
      fit: "cover",
    };

    return [...cards, extra];
  }, [cards]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      {/* BOOKING MODAL MOUNTED HERE (so it can open from ANY button) */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

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
                {/* HERO BOOK BUTTON -> OPENS MODAL (NO NAVIGATION) */}
                <motion.button
                  type="button"
                  onClick={onBook}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Book a Ride Now
                </motion.button>

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
              <LiquidCard key={card.key} card={card} onBook={onBook} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER + POLICIES */}
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-0">
              <Image src="/6logo.PNG" alt="6Rides" width={28} height={28} className="h-7 w-7" />
              <span className="text-sm font-semibold">Rides</span>
            </div>

            <p className="mt-1 text-sm text-black/50">Premium mobility for modern Nigeria.</p>
          </div>

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

          <div className="mt-8 text-center text-xs text-black/50">
            © {new Date().getFullYear()} 6Rides. A 6Clement Joshua Service. All rights reserved.
          </div>
        </div>
      </footer>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} source="hero" />
    </main>
  );
}
