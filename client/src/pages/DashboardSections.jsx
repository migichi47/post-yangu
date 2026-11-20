import Icon from "../components/Icon";
import { photos } from "../data/photos";
import { useRateCardVisibility } from "../contexts/RateCardVisibilityContext";

const panelClass =
  "rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm";
const buttonClass =
  "inline-flex items-center gap-2 rounded-lg bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--navy-2)]";

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--blue)]">
          Creator workspace / {eyebrow}
        </p>
        <h1 className="m-0 text-2xl font-extrabold text-[var(--navy)] sm:text-3xl">
          {title}
        </h1>
        <p className="mb-0 mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function MetricCards({ items }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {items.map(({ icon, label, value, change }, index) => (
        <article
          className={`${panelClass} p-4 sm:p-5`}
          key={label}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={`grid size-10 place-items-center rounded-xl ${
                index % 2 === 0
                  ? "bg-[var(--blue-light)] text-[var(--blue)]"
                  : "bg-[var(--pink-light)] text-[var(--pink-dark)]"
              }`}
            >
              <Icon name={icon} size={18} />
            </span>
            <span className="text-xs font-bold text-emerald-600">{change}</span>
          </div>
          <p className="mb-1 mt-4 text-xs font-semibold text-[var(--muted)]">
            {label}
          </p>
          <strong className="text-xl font-extrabold text-[var(--navy)]">
            {value}
          </strong>
        </article>
      ))}
    </div>
  );
}

function Panel({ title, description, children, className = "" }) {
  return (
    <section className={`${panelClass} ${className}`}>
      <div className="mb-4">
        <h2 className="m-0 text-base font-extrabold text-[var(--navy)]">
          {title}
        </h2>
        {description && (
          <p className="mb-0 mt-1 text-xs leading-5 text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Status({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-[var(--blue-light)] text-[var(--navy)]",
    pink: "bg-[var(--pink-light)] text-[var(--pink-dark)]",
    green: "bg-emerald-50 text-emerald-700",
    gray: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function ProfileSection({ go }) {
  return (
    <>
      <PageHeading
        eyebrow="My profile"
        title="Your creator profile"
        description="Keep your story and creator details ready for brands and fans."
        action={
          <button className={buttonClass} onClick={() => go("profile")}>
            Preview public profile <Icon name="arrow" size={16} />
          </button>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Panel title="Profile overview" description="Your public creator identity">
          <div className="flex flex-wrap items-center gap-4 border-b border-[var(--border)] pb-5">
            <img
              className="size-16 rounded-2xl object-cover"
              src={photos.wanjiku}
              alt="Wanjiku Muriithi"
            />
            <div>
              <h3 className="m-0 text-lg font-extrabold text-[var(--navy)]">
                Wanjiku Muriithi
              </h3>
              <p className="mb-0 mt-1 text-sm text-[var(--muted)]">
                @wanjiku.wanders · Nairobi, Kenya
              </p>
            </div>
            <Status tone="green">Verified creator</Status>
          </div>
          <p className="mb-4 mt-5 max-w-2xl text-sm leading-6 text-slate-600">
            Travel storyteller finding beautiful corners of Kenya and sharing
            thoughtful guides for curious people. Good food, slow journeys and
            honest stories.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Travel", "Lifestyle", "Food"].map((niche) => (
              <Status key={niche}>{niche}</Status>
            ))}
          </div>
        </Panel>
        <Panel title="Profile strength" description="A complete profile helps brands find you">
          <div className="flex items-baseline justify-between">
            <strong className="text-3xl font-extrabold text-[var(--navy)]">
              84%
            </strong>
            <span className="text-xs font-bold text-[var(--blue)]">
              Almost there
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--blue-light)]">
            <div className="h-full w-[84%] rounded-full bg-[var(--blue)]" />
          </div>
          <ul className="mb-0 mt-5 space-y-3 p-0 text-sm text-slate-600">
            {[
              ["check", "Add your audience demographics"],
              ["check", "Connect your social channels"],
              ["check", "Upload a rate card"],
            ].map(([icon, text]) => (
              <li className="flex items-center gap-2" key={text}>
                <span className="text-[var(--blue)]">
                  <Icon name={icon} size={16} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function AnalyticsSection() {
  const bars = [40, 55, 46, 70, 58, 82, 66, 94, 74, 100, 86, 92];
  const sources = [
    ["Instagram", "48%", "bg-[var(--pink)]"],
    ["TikTok", "32%", "bg-[var(--blue)]"],
    ["YouTube", "14%", "bg-[var(--navy)]"],
    ["Other", "6%", "bg-slate-300"],
  ];

  return (
    <>
      <PageHeading
        eyebrow="Analytics"
        title="Your audience at a glance"
        description="Track the reach and engagement behind your recent creator activity."
      />
      <MetricCards
        items={[
          { icon: "users", label: "Total audience", value: "48.2K", change: "+12.8%" },
          { icon: "chart", label: "Profile visits", value: "3,842", change: "+24.8%" },
          { icon: "heart", label: "Engagement rate", value: "6.4%", change: "+0.8%" },
          { icon: "play", label: "Content views", value: "126K", change: "+18.2%" },
        ]}
      />
      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
        <Panel title="Audience growth" description="Follower growth over the last 12 weeks">
          <div className="mt-6 flex h-52 items-end gap-2 border-b border-[var(--border)] pb-2 sm:gap-3">
            {bars.map((height, index) => (
              <div className="flex h-full flex-1 items-end" key={index}>
                <div
                  className={`w-full rounded-t-md ${
                    index === bars.length - 1
                      ? "bg-[var(--pink)]"
                      : "bg-[var(--blue-light)]"
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${height}%`}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-xs text-[var(--muted)]">
            <span>Week 1</span>
            <span>Week 4</span>
            <span>Week 8</span>
            <span>Week 12</span>
          </div>
        </Panel>
        <Panel title="Audience sources" description="Where this month's profile visits came from">
          <div className="space-y-5">
            {sources.map(([name, percent, color]) => (
              <div key={name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold text-[var(--navy)]">{name}</span>
                  <span className="text-[var(--muted)]">{percent}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface)]">
                  <div
                    className={`h-2 rounded-full ${color}`}
                    style={{ width: percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function RateCardSection() {
  const {
    isRateCardPublic,
    updateRateCardVisibility,
    visibilityError,
  } = useRateCardVisibility();
  const packages = [
    {
      title: "Social story",
      description: "A thoughtful introduction to your brand.",
      price: "KSh 8,500",
      detail: "3-frame Instagram story",
      accent: "bg-[var(--blue-light)] text-[var(--blue)]",
    },
    {
      title: "Creator video",
      description: "A native video made for my community.",
      price: "KSh 28,000",
      detail: "TikTok or Instagram Reel",
      accent: "bg-[var(--pink-light)] text-[var(--pink-dark)]",
      featured: true,
    },
    {
      title: "Cross-platform",
      description: "A campaign that travels further.",
      price: "KSh 48,000",
      detail: "Video + Reel + 3 stories",
      accent: "bg-[var(--blue-light)] text-[var(--blue)]",
    },
  ];

  return (
    <>
      <PageHeading
        eyebrow="Rate card"
        title="Packages for every campaign"
        description="A clear starting point for brands planning their next collaboration."
        action={
          <button
            type="button"
            aria-pressed={!isRateCardPublic}
            onClick={() => updateRateCardVisibility(!isRateCardPublic)}
            className={`${buttonClass} ${
              isRateCardPublic
                ? "bg-[var(--navy)]"
                : "bg-[var(--pink-dark)] hover:bg-[var(--pink)]"
            }`}
          >
            <Icon name={isRateCardPublic ? "lock" : "check"} size={16} />
            Make rate card {isRateCardPublic ? "private" : "public"}
          </button>
        }
      />
      <div
        className={`mb-5 flex items-start gap-3 rounded-xl border p-4 ${
          isRateCardPublic
            ? "border-[var(--blue-light)] bg-[var(--blue-light)]"
            : "border-[var(--pink-light)] bg-[var(--pink-light)]"
        }`}
        role="status"
      >
        <span className="mt-0.5 text-[var(--navy)]">
          <Icon name={isRateCardPublic ? "check" : "lock"} size={18} />
        </span>
        <div>
          <p className="m-0 text-sm font-bold text-[var(--navy)]">
            Rate card is {isRateCardPublic ? "public" : "private"}
          </p>
          <p className="mb-0 mt-1 text-xs leading-5 text-[var(--muted)]">
            {isRateCardPublic
              ? "Brands can see your packages and starting prices on your profile."
              : "Your packages and prices are hidden from your public profile."}
          </p>
          {visibilityError && (
            <p
              className="mb-0 mt-2 text-xs font-semibold text-[var(--pink-dark)]"
              role="alert"
            >
              {visibilityError}
            </p>
          )}
        </div>
      </div>
      <div className="mb-5 rounded-2xl bg-[var(--navy)] p-5 text-white sm:flex sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--blue-mid)]">
            Creator pricing
          </p>
          <h2 className="m-0 text-xl font-extrabold">Your work, valued clearly.</h2>
          <p className="mb-0 mt-2 text-sm text-blue-100">
            Rates shown are starting prices and can be tailored to the brief.
          </p>
        </div>
        <span className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white sm:mt-0">
          Updated this month
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((item) => (
          <article
            className={`${panelClass} relative flex flex-col`}
            key={item.title}
          >
            {item.featured && (
              <span className="absolute right-4 top-4 rounded-full bg-[var(--pink-light)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[var(--pink-dark)]">
                Popular
              </span>
            )}
            <span className={`grid size-11 place-items-center rounded-xl ${item.accent}`}>
              <Icon name="shop" size={19} />
            </span>
            <h2 className="mb-1 mt-5 text-lg font-extrabold text-[var(--navy)]">
              {item.title}
            </h2>
            <p className="mb-5 mt-0 min-h-10 text-sm leading-5 text-[var(--muted)]">
              {item.description}
            </p>
            <strong className="text-2xl font-extrabold text-[var(--navy)]">
              {item.price}
            </strong>
            <p className="mb-0 mt-1 text-xs text-[var(--muted)]">Starting price</p>
            <div className="mt-5 border-t border-[var(--border)] pt-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Icon name="check" size={16} /> {item.detail}
              </span>
              <span className="mt-3 flex items-center gap-2">
                <Icon name="check" size={16} /> Usage and timeline agreed per brief
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function BrandInquiriesSection() {
  const inquiries = [
    ["SA", "Safari Air Kenya", "Coastal routes launch", "KSh 75,000", "New", "pink"],
    ["NK", "Nia Kenya", "New season lookbook", "KSh 48,000", "In discussion", "blue"],
    ["BK", "Brew Kenya", "Cold brew summer", "KSh 32,500", "Quoted", "gray"],
    ["TW", "Tamu Wellness", "Everyday rituals", "KSh 54,000", "New", "pink"],
  ];

  return (
    <>
      <PageHeading
        eyebrow="Brand inquiries"
        title="Collaboration pipeline"
        description="Keep track of incoming campaign opportunities and their next steps."
      />
      <MetricCards
        items={[
          { icon: "inbox", label: "Open inquiries", value: "12", change: "+3 this week" },
          { icon: "spark", label: "Awaiting your reply", value: "3", change: "Needs attention" },
          { icon: "chart", label: "In discussion", value: "5", change: "Active" },
          { icon: "wallet", label: "Pipeline value", value: "KSh 248K", change: "+16.4%" },
        ]}
      />
      <Panel title="Recent opportunities" description="Sample campaign activity">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <th className="px-3 py-3 font-bold">Brand</th>
                <th className="px-3 py-3 font-bold">Campaign</th>
                <th className="px-3 py-3 font-bold">Budget</th>
                <th className="px-3 py-3 font-bold">Status</th>
                <th className="px-3 py-3 font-bold">Received</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(([initial, brand, campaign, budget, status, tone]) => (
                <tr className="border-b border-[var(--border)] last:border-0" key={brand}>
                  <td className="px-3 py-4">
                    <span className="flex items-center gap-3 font-bold text-[var(--navy)]">
                      <span className="grid size-9 place-items-center rounded-lg bg-[var(--navy)] text-xs text-white">
                        {initial}
                      </span>
                      {brand}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-slate-600">{campaign}</td>
                  <td className="px-3 py-4 font-bold text-[var(--navy)]">{budget}</td>
                  <td className="px-3 py-4">
                    <Status tone={tone}>{status}</Status>
                  </td>
                  <td className="px-3 py-4 text-[var(--muted)]">This week</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function ProductsSection() {
  const products = [
    {
      icon: "shop",
      title: "Nairobi Weekend Guide",
      description: "A curated map of my favourite stays, cafés and local finds.",
      price: "KSh 1,200",
      sales: "84 sales",
      tone: "bg-[var(--blue-light)] text-[var(--blue)]",
      status: "Published",
    },
    {
      icon: "play",
      title: "Brand-ready UGC video",
      description: "A short-form video package for your brand's social channels.",
      price: "From KSh 18,000",
      sales: "Available for booking",
      tone: "bg-[var(--pink-light)] text-[var(--pink-dark)]",
      status: "Service",
    },
    {
      icon: "spark",
      title: "Kenya coast itinerary",
      description: "A five-day slow-travel plan with practical local tips.",
      price: "KSh 950",
      sales: "52 sales",
      tone: "bg-[var(--blue-light)] text-[var(--blue)]",
      status: "Published",
    },
  ];

  return (
    <>
      <PageHeading
        eyebrow="Products & services"
        title="Your creator storefront"
        description="A snapshot of the guides, services and experiences you offer."
      />
      <MetricCards
        items={[
          { icon: "shop", label: "Active offerings", value: "3", change: "All up to date" },
          { icon: "wallet", label: "Store revenue", value: "KSh 42,800", change: "+9.2%" },
          { icon: "users", label: "Orders this month", value: "36", change: "+8 orders" },
          { icon: "chart", label: "Store visits", value: "1,204", change: "+14.6%" },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {products.map((product) => (
          <article className={`${panelClass} flex gap-4`} key={product.title}>
            <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${product.tone}`}>
              <Icon name={product.icon} size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="m-0 text-base font-extrabold text-[var(--navy)]">
                    {product.title}
                  </h2>
                  <p className="mb-0 mt-2 text-sm leading-5 text-[var(--muted)]">
                    {product.description}
                  </p>
                </div>
                <Status tone={product.status === "Service" ? "pink" : "green"}>
                  {product.status}
                </Status>
              </div>
              <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-[var(--border)] pt-4 text-sm">
                <strong className="text-[var(--navy)]">{product.price}</strong>
                <span className="text-[var(--muted)]">{product.sales}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function EarningsSection() {
  const payouts = [
    ["Campaign payout", "Safari Air Kenya · 14 Mar", "KSh 24,500", "Paid"],
    ["Guide sales", "Nairobi Weekend Guide · 12 Mar", "KSh 8,400", "Paid"],
    ["Superfan support", "Community support · 10 Mar", "KSh 6,200", "Paid"],
  ];

  return (
    <>
      <PageHeading
        eyebrow="Tips & earnings"
        title="Your earnings"
        description="Review your creator income, recent payouts and upcoming balance."
      />
      <MetricCards
        items={[
          { icon: "wallet", label: "Earned this month", value: "KSh 86,400", change: "+18.2%" },
          { icon: "chart", label: "Available balance", value: "KSh 32,800", change: "Ready to withdraw" },
          { icon: "heart", label: "Fan support", value: "KSh 18,200", change: "+12.5%" },
          { icon: "shop", label: "Product sales", value: "KSh 12,600", change: "+9.2%" },
        ]}
      />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl bg-[var(--navy)] p-6 text-white">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--blue-mid)]">
            Payout balance
          </p>
          <strong className="text-3xl font-extrabold">KSh 32,800</strong>
          <p className="mb-0 mt-2 text-sm text-blue-100">
            Your next payout is scheduled for 25 March.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">
            <Icon name="check" size={15} /> M-Pesa ending in 4821
          </div>
        </section>
        <Panel title="Recent transactions" description="Your latest creator income">
          <div className="divide-y divide-[var(--border)]">
            {payouts.map(([title, detail, amount, status]) => (
              <div className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0" key={title}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-[var(--blue-light)] text-[var(--blue)]">
                    <Icon name="wallet" size={18} />
                  </span>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-[var(--navy)]">{title}</h3>
                    <p className="mb-0 mt-1 text-xs text-[var(--muted)]">{detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <strong className="block text-sm text-[var(--navy)]">{amount}</strong>
                  <span className="mt-1 inline-block text-xs font-semibold text-emerald-600">{status}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function SuperfansSection() {
  const members = [
    ["FN", "Faith N.", "Explorer", "Today"],
    ["JM", "Joy M.", "Inner Circle", "Yesterday"],
    ["AK", "Asha K.", "Explorer", "12 Mar"],
    ["MW", "Miriam W.", "Early Supporter", "10 Mar"],
  ];

  return (
    <>
      <PageHeading
        eyebrow="Superfan memberships"
        title="Your community"
        description="Celebrate the people who support your work and follow your journey."
      />
      <MetricCards
        items={[
          { icon: "heart", label: "Active superfans", value: "126", change: "+14 this month" },
          { icon: "wallet", label: "Monthly support", value: "KSh 38,400", change: "+11.6%" },
          { icon: "users", label: "New members", value: "18", change: "This month" },
          { icon: "chart", label: "Renewal rate", value: "92%", change: "+3.4%" },
        ]}
      />
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Panel title="Membership tiers" description="Your sample community levels">
          <div className="space-y-3">
            {[
              ["Explorer", "KSh 300 / month", "78 members", "bg-[var(--blue-light)] text-[var(--blue)]"],
              ["Inner Circle", "KSh 800 / month", "32 members", "bg-[var(--pink-light)] text-[var(--pink-dark)]"],
              ["Early Supporter", "KSh 1,500 / month", "16 members", "bg-[var(--navy)] text-white"],
            ].map(([tier, price, count, tone]) => (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] p-4" key={tier}>
                <div className="flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-xl ${tone}`}>
                    <Icon name="heart" size={17} />
                  </span>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-[var(--navy)]">{tier}</h3>
                    <p className="mb-0 mt-1 text-xs text-[var(--muted)]">{price}</p>
                  </div>
                </div>
                <span className="text-right text-xs font-semibold text-[var(--muted)]">{count}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Recent members" description="New people joining your community">
          <div className="divide-y divide-[var(--border)]">
            {members.map(([initials, name, tier, joined]) => (
              <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" key={name}>
                <span className="grid size-10 place-items-center rounded-full bg-[var(--pink-light)] text-xs font-extrabold text-[var(--pink-dark)]">
                  {initials}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="m-0 text-sm font-bold text-[var(--navy)]">{name}</h3>
                  <p className="mb-0 mt-1 text-xs text-[var(--muted)]">{tier}</p>
                </div>
                <span className="text-xs text-[var(--muted)]">{joined}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

export default function DashboardSection({ section, go }) {
  const sections = {
    "my-profile": <ProfileSection go={go} />,
    analytics: <AnalyticsSection />,
    "rate-card": <RateCardSection />,
    "brand-inquiries": <BrandInquiriesSection />,
    products: <ProductsSection />,
    earnings: <EarningsSection />,
    superfans: <SuperfansSection />,
  };

  return sections[section] || null;
}
