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

function summarizeList(items: string[] | undefined, max = 6) {
  const arr = (items ?? []).filter(Boolean);
  if (!arr.length) return "";
  return arr.slice(0, max).join(" • ");
}

/**
 * Enticing, short summaries for the WHITE bottom section.
 * No buttons here. User should use the overlay CTA (Learn more / Book now).
 */
function enticer(
  type: "caption" | "split_get" | "split_switch",
  card: StoryCard
) {
  const bulletsSummary = summarizeList(card.bullets, 6);
  const chipsSummary = summarizeList(card.chips, 6);

  const base =
    bulletsSummary ||
    chipsSummary ||
    "A cleaner, calmer experience with disciplined standards — designed for premium movement.";

  if (type === "caption") {
    return `${base} Tap “Learn more” on the card to see the full breakdown.`;
  }

  if (type === "split_get") {
    return (
      bulletsSummary ||
      "Cleaner vehicles, calmer pickups, and a more premium end-to-end experience — without the noise."
    );
  }

  // split_switch
  return (
    chipsSummary ||
    "People switch for reliability, presentation, and standards you can feel from pickup to drop-off."
  );
}

function LiquidCard({
  card,
  onBook,
}: {
  card: StoryCard;
  onBook: () => void;
}) {
  const isDark = card.theme === "dark";
  const fit: MediaFit = card.fit ?? "cover";

  // ✅ Mobile-only: collapsed/expanded subtitle+chips (desktop unaffected)
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const waterGlass =
    "backdrop-blur-x-2 bg-black/50 border border-white/38 shadow-[0_28px_85px_rgba(50,10,0,0.18)]";
  const waterGlassDark =
    "backdrop-blur-x-2 bg-black/50 border border-white/36 shadow-[0_28px_85px_rgba(50,10,0,0.28)]";

  const outer =
    "rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.07)]";

  // ✅ Remove weird “white/grey/black” outer layer showing around images on mobile:
  // - keep stage background fully transparent on mobile
  // - rely on object-cover and centered positioning to fill the card nicely
  const imageStage = cx(
    "relative w-full overflow-hidden",
    "h-[300px] sm:h-[340px] md:h-[520px]",
    "bg-transparent md:" + (isDark ? "bg-black" : "bg-neutral-100")
  );

  // ✅ Mobile: always cover (fills card, no white edges)
  // ✅ Desktop: keep your requested behavior (contain on mobile, cover on md) was causing edges;
  //            now desktop honors fit, mobile forced to cover.
  const imageClass = cx(
    "h-full w-full object-center transition duration-700 ease-out",
    "object-cover", // mobile forced
    fit === "contain" ? "md:object-contain" : "md:object-cover",
    "md:group-hover:scale-[1.03]"
  );

  const eyebrowCls = "text-[11px] font-semibold tracking-wide text-white/85";
  const titleCls = "mt-1 text-2xl font-semibold md:text-3xl text-white";
  const subtitleCls = "mt-2 text-sm md:text-[15px] text-white/78";

  const chipCls =
    "rounded-full px-3 py-1 text-[11px] font-semibold border border-white/14 bg-white/10 text-white/85";

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

  const renderOverlayCTA = (cta: CTA) => {
    const cls = cta.variant === "outline" ? ctaOutline : ctaSolid;

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

  const overlayCtas = withLearnMore(card.ctas);

  // Mobile-only toggler: click subtitle area to expand/collapse
  const onToggleMobileDetails = () => setMobileExpanded((v) => !v);

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

          {/* ✅ Keep overlay subtle; don’t add solid layers that show as borders */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-black/6 to-transparent" />
            <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl opacity-0 transition duration-700 group-hover:opacity-100" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <div
              className={cx(
                "max-w-3xl",
                isDark ? waterGlassDark : waterGlass,
                "rounded-2xl p-4 md:p-5",
                // ✅ On mobile, allow tapping the content block (not buttons) to expand text
                "select-none"
              )}
            >
              {card.eyebrow && <div className={eyebrowCls}>{card.eyebrow}</div>}
              <h3 className={titleCls}>{card.title}</h3>

              {/* ✅ MOBILE: collapsed subtitle/chips by default (title + buttons visible) */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={onToggleMobileDetails}
                  className="mt-2 w-full text-left"
                  aria-expanded={mobileExpanded}
                  aria-controls={`mobile-details-${card.key}`}
                >
                  {/* when collapsed, show a tiny hint line instead of full subtitle */}
                  {!mobileExpanded ? (
                    <div className="text-[12px] text-white/70">
                      Tap to read more
                      <span className="ml-2 text-white/55">▾</span>
                    </div>
                  ) : (
                    <div className="text-[12px] text-white/70">
                      Tap to collapse
                      <span className="ml-2 text-white/55">▴</span>
                    </div>
                  )}
                </button>

                <div
                  id={`mobile-details-${card.key}`}
                  className={cx(
                    "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                    mobileExpanded ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
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
                </div>
              </div>

              {/* ✅ DESKTOP: unchanged (always show subtitle + chips) */}
              <div className="hidden md:block">
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
              </div>

              {/* Buttons always visible (mobile + desktop) */}
              {overlayCtas.length ? (
                <div className="mt-4 flex flex-wrap gap-2.5 md:gap-3">
                  {overlayCtas.map(renderOverlayCTA)}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* ✅ WHITE SECTION: NO BUTTONS AT ALL (book/learn removed everywhere here) */}
        {card.variant === "caption" && (
          <div className="bg-white border-t border-black/10 px-5 py-5 md:px-7 md:py-6">
            <div className="grid gap-2">
              <div className="text-sm font-semibold text-black/85">
                Quick summary
              </div>
              <div className="text-sm text-black/65 leading-relaxed">
                {enticer("caption", card)}
              </div>
            </div>
          </div>
        )}

        {card.variant === "split" && (
          <div className="bg-white border-t border-black/10 px-5 py-5 md:px-7 md:py-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
              <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                <div className="text-sm font-semibold">What you get</div>
                <div className="mt-2 text-sm text-black/65 leading-relaxed">
                  {enticer("split_get", card)}
                </div>
                <div className="mt-2 text-[12px] text-black/45">
                  Use “Learn more” on the card to see details.
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="text-sm font-semibold">Why people switch</div>
                <div className="mt-2 text-sm text-black/65 leading-relaxed">
                  {enticer("split_switch", card)}
                </div>
                <div className="mt-2 text-[12px] text-black/45">
                  Use “Learn more” on the card to see details.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Minimal + Overlay variants have no white bottom sections */}
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
        alt: "6ride premium lifestyle pickup after shopping",
        eyebrow: "Lifestyle • Premium pickup",
        title: "Designed for real life, not just rides.",
        subtitle:
          "From quick errands to lifestyle movement, 6ride is built around cleanliness, comfort, and predictable service — so every trip feels premium, not stressful.",
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
        learnHref: "/learn/hero",
      },

      {
        key: "food_brand",
        src: "/images/6ride/food/6ride_food_delivery_brand_showcase.png",
        alt: "6ride food delivery branded rider",
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
        alt: "6ride food delivery in heavy traffic",
        eyebrow: "Food delivery • City performance",
        title: "Delivery that performs in real traffic.",
        subtitle:
          "Nigeria traffic is real. 6ride delivery is built around smart routing, disciplined riders, and predictable updates — so customers stay calm and restaurants stay respected.",
        chips: [
          "Smart routing",
          "Disciplined riders",
          "Predictable updates",
          "Reliable handover",
        ],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },

      {
        key: "food_handover",
        src: "/images/6ride/food/6ride_food_delivery_customer_handover.png",
        alt: "6ride rider handing over a food delivery",
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
        alt: "6ride emergency response vehicle assisting on the street",
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
        ctas: [{ label: "Request support", href: "/contact" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      // PARTNER VEHICLES (NO BOOK NOW)
      {
        key: "partner_male_phone",
        src: "/images/6ride/partner/6ride_partner_vehicle_premium_male_phone.png",
        alt: "6ride partner premium vehicle with male rider on phone",
        eyebrow: "Partner vehicles • Earn with standards",
        title: "Partner with 6ride and earn with premium positioning.",
        subtitle:
          "Own a premium vehicle? Join a structured partner program built around brand standards, verified onboarding, and a quality-first rider experience.",
        ctas: [{ label: "Partner with 6ride", href: "/partners" }],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "partner_female_cadillac",
        src: "/images/6ride/partner/6ride_partner_vehicle_premium_female_cadillac.png",
        alt: "6ride partner vehicle premium female near Cadillac SUV",
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
        ctas: [{ label: "Partner with 6ride", href: "/partners" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "partner_range_rover",
        src: "/images/6ride/partner/6ride_partner_vehicle_range_rover_female.png",
        alt: "6ride partner Range Rover with female rider",
        eyebrow: "Partner vehicles • SUV class",
        title: "SUV owners: partner with a premium-first brand.",
        subtitle:
          "Executive SUVs are in demand for business and lifestyle movement. Join the 6ride partner program and list your SUV under enforced standards and premium positioning.",
        ctas: [{ label: "Partner with 6ride", href: "/partners" }],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "partner_audi_male",
        src: "/images/6ride/partner/6ride_partner_vehicle_audi_male.png",
        alt: "6ride partner Audi premium with male rider",
        eyebrow: "Partner vehicles • Premium sedans",
        title: "Premium sedans. Premium rules. Premium earnings.",
        subtitle:
          "If you can maintain a high standard, we help you earn at a higher standard. 6ride is building a premium sedan partner network city-by-city.",
        chips: [
          "Verified onboarding",
          "Brand protection",
          "Premium positioning",
          "Standards enforcement",
        ],
        ctas: [{ label: "Partner with 6ride", href: "/partners" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },

      {
        key: "partner_bmw_female_tablet",
        src: "/images/6ride/partner/6ride_partner_vehicle_bmw_female_tablet.png",
        alt: "6ride partner BMW with female using tablet",
        eyebrow: "Partner vehicles • Business-ready",
        title: "A partner program designed for professionals.",
        subtitle:
          "This is for owners who value professionalism: verified onboarding, disciplined standards, and a premium rider experience that protects your vehicle’s image.",
        bullets: [
          "Verified onboarding",
          "Premium standards",
          "Professional conduct",
          "Brand protection",
        ],
        ctas: [{ label: "Partner with 6ride", href: "/partners" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "partner_mercedes_male",
        src: "/images/6ride/partner/6ride_partner_vehicle_mercedes_male.png",
        alt: "6ride partner Mercedes with male rider",
        eyebrow: "Partner vehicles • Premium badge",
        title: "Mercedes owners: list with standards, not noise.",
        subtitle:
          "We’re building a premium-only image. If your car is premium and your conduct is professional, the partner program is built for you.",
        ctas: [{ label: "Partner with 6ride", href: "/partners" }],
        variant: "minimal",
        theme: "dark",
        fit: "cover",
      },

      // SERVICES
      {
        key: "hotel_chauffeur",
        src: "/images/6ride/corporate/6ride_chauffeur_hotel_arrival_service.png",
        alt: "6ride chauffeur service at hotel arrival",
        eyebrow: "Chauffeur • Hotel arrivals",
        title: "Hotel arrivals with a chauffeur mindset.",
        subtitle:
          "Premium arrivals should feel calm and organized. 6ride supports disciplined pickups for travelers, executives, and high-standard movement.",
        bullets: ["Hotel arrivals", "Executive pickups", "Scheduled trips", "Professional conduct"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "night_traffic",
        src: "/images/6ride/infrastructure/6ride_night_city_traffic_mercedes.png",
        alt: "6ride vehicle in night city traffic",
        eyebrow: "Urban mobility • Night rides",
        title: "Night rides you can trust.",
        subtitle:
          "Dense traffic and low visibility demand discipline. 6ride emphasizes safer driving culture, compliance, and quick support escalation when needed.",
        chips: ["Compliance culture", "Safer driving", "Support escalation", "Professional conduct"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },

      {
        key: "corporate_pickup",
        src: "/images/6ride/corporate/6ride_corporate_client_pickup.png",
        alt: "6ride corporate client pickup at office",
        eyebrow: "Corporate • Client movement",
        title: "Corporate pickups that look professional.",
        subtitle:
          "For meetings and client movement, presentation matters. 6ride is built to deliver a cleaner, more premium, and more dependable experience than basic ride-hailing.",
        bullets: ["Client pickups", "Office mobility", "Professional look", "Dependable"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "airport_fleet",
        src: "/images/6ride/infrastructure/6ride_airport_fleet_lineup.png",
        alt: "6ride fleet lineup at airport",
        eyebrow: "Operations • Fleet readiness",
        title: "Fleet readiness for scheduled operations.",
        subtitle:
          "Airport transfers and scheduled trips depend on reliability. 6ride is structured to run disciplined operations with predictable service and support.",
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "police_compliance",
        src: "/images/6ride/infrastructure/6ride_police_traffic_compliance.png",
        alt: "6ride traffic compliance scene",
        eyebrow: "Safety • Traffic compliance",
        title: "Traffic & compliance — built into the brand.",
        subtitle:
          "A serious ride brand respects the road. 6ride emphasizes compliance, safer driving culture, and professional conduct — especially in busy city movement.",
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
        alt: "6ride vehicle at Elixir of Restaurant pickup",
        eyebrow: "Brand moments • Pickup points",
        title: "Clean pickups at premium venues.",
        subtitle:
          "From restaurants to lounges and events — pickup experience matters. 6ride is designed to feel premium where people actually live and socialize.",
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "overlay",
        theme: "dark",
        fit: "cover",
      },

      {
        key: "family_beach",
        src: "/images/6ride/lifestyle/6ride_family_beach_lifestyle.png",
        alt: "6ride family beach lifestyle transport",
        eyebrow: "Lifestyle • Family movement",
        title: "Family trips made smoother.",
        subtitle:
          "When comfort matters — outings, weekend trips, lifestyle movement — 6ride supports cleaner rides and calmer travel moments for families.",
        chips: ["Calm pickups", "Clean rides", "Family-friendly comfort", "More predictable service"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "split",
        theme: "light",
        fit: "cover",
      },

      {
        key: "business_exchange",
        src: "/images/6ride/corporate/6ride_business_document_exchange.png",
        alt: "6ride business document exchange beside vehicle",
        eyebrow: "Business • Secure handovers",
        title: "Business movement with confidence.",
        subtitle:
          "For professionals, time and trust matter. 6ride supports dependable movement for business activity — when you want a calmer, cleaner, more credible ride.",
        bullets: ["Professional trust", "Business-ready", "Clean arrival", "Reliable pickup"],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "campus",
        src: "/images/6ride/lifestyle/6ride_campus_student_transport.png",
        alt: "6ride campus student transport scene",
        eyebrow: "Campus • Student movement",
        title: "Campus movement that feels safer and more organized.",
        subtitle:
          "Students need reliability and safe pickup culture. 6ride supports more disciplined operations for daily campus movement and local trips.",
        bullets: [
          "Clear pickup culture",
          "More predictable arrival experience",
          "Safe movement mindset",
          "Support-first escalation",
        ],
        ctas: [{ label: "Book now", href: "/book" }],
        variant: "caption",
        theme: "light",
        fit: "cover",
      },

      {
        key: "urus",
        src: "/images/6ride/lifestyle/6ride_highway_performance_urus.png",
        alt: "6ride performance vehicle on highway",
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
      alt: "6ride partner program premium vehicle standardization",
      eyebrow: "Partners • Scale program",
      title: "A partner program designed to scale city-by-city.",
      subtitle:
        "6ride gives premium car owners a structured system: brand standards, premium positioning, onboarding verification, and a utilization-based earning model designed to grow fast.",
      chips: [
        "Onboarding verification",
        "Brand standards",
        "Premium positioning",
        "Utilization-based earnings",
      ],
      ctas: [
        { label: "Partner with 6ride", href: "/partner" },
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
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-20%] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-white/10 blur-[150px]" />
          <div className="absolute right-[-10%] top-[35%] h-[520px] w-[520px] rounded-full bg-white/5 blur-[170px]" />
        </div>

        <header className="flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-2">
            <Image
              src="/6logo.PNG"
              alt="6ride"
              width={32}
              height={32}
              priority
              className="h-9 w-9"
            />
            <div className="text-xl font-semibold tracking-wide">
              <span className="opacity-90">ride</span>
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
                Ride-hailing, food delivery, emergency response, corporate
                movement, and premium partner vehicles — engineered with trust,
                compliance, and comfort.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.25 }}
                className="mt-8 flex flex-wrap gap-4"
              >
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
                  Download 6ride
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.32 }}
                className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60"
              >
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Verified drivers
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Emergency support
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Premium fleet
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Nigeria-first
                </span>
              </motion.div>

              <div className="mt-6 text-xs text-white/55">
                Currently operating with focus in{" "}
                <span className="font-semibold text-white/80">
                  Cross River (HQ)
                </span>{" "}
                and expanding across{" "}
                <span className="font-semibold text-white/80">
                  Abuja, Lagos, Port Harcourt, and Akwa Ibom
                </span>
                .
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
              <h2 className="text-2xl font-semibold md:text-3xl">
                See what premium looks like
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-black/65">
                Every scene below represents a service promise — cleaner
                vehicles, stronger standards, better safety culture, and a more
                enjoyable experience from pickup to drop-off.
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
              <Image
                src="/6logo.PNG"
                alt="6ride"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-sm font-semibold">ride</span>
            </div>

            <p className="mt-1 text-sm text-black/50">
              Premium mobility for modern Nigeria.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-center text-[12px] font-semibold text-black/70">
            <Link
              href="/policies/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Terms of Service
            </Link>
            <Link
              href="/policies/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/acceptable-use"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Acceptable Use
            </Link>
            <Link
              href="/policies/safety"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Safety Guidelines
            </Link>
            <Link
              href="/policies/refunds"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Refund & Cancellation
            </Link>
            <Link
              href="/policies/subscription-billing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Subscription & Billing
            </Link>
            <Link
              href="/policies/partner-terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Partner Terms
            </Link>
            <Link
              href="/policies/emergency"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Emergency Disclaimer
            </Link>
            <Link
              href="/policies/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Contact
            </Link>
            <Link
              href="/policies/child-student-safety"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Child & Student Safety
            </Link>
            <Link
              href="/policies/insurance-liability"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Insurance & Liability
            </Link>
            <Link
              href="/policies/corporate-sla"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Corporate SLA
            </Link>
            <Link
              href="/policies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Cookies Policy
            </Link>

          </div>

          <div className="mt-8 text-center text-xs text-black/50">
            © {new Date().getFullYear()} 6ride. A 6Clement Joshua Service. All
            rights reserved.
          </div>
        </div>
      </footer>

      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        source="hero"
      />
    </main>
  );
}
