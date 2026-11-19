import CreatorCard from "../components/CreatorCard";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
import { creators } from "../data/creators";
import { photos } from "../data/photos";

function Home({ go }) {
  return (
    <>
      <main>
        <section className="hero [position:relative] [overflow:hidden] [background:linear-gradient(125deg,_#f7fcff_0%,_#fff_49%,_#fff7fb_100%)] [min-height:690px] [display:flex] [align-items:center] [&::before]:[content:''] [&::before]:[position:absolute] [&::before]:[inset:0] [&::before]:[background-image:radial-gradient(#b8dfff_1px,_transparent_1px)] [&::before]:[background-size:22px_22px] [&::before]:[opacity:.24] [&::before]:[mask-image:linear-gradient(90deg,_black,_transparent_48%)] [@media(max-width:760px)]:[min-height:auto]">
          <div className="hero-glow hero-glow-one [position:absolute] [border-radius:50%] [filter:blur(4px)] [width:360px] [height:360px] [background:rgba(221,_242,_255,_.8)] [top:130px] [right:12%]" />
          <div className="hero-glow hero-glow-two [position:absolute] [border-radius:50%] [filter:blur(4px)] [width:260px] [height:260px] [background:rgba(255,_214,_231,_.45)] [bottom:-80px] [right:30%]" />
          <div className="section-shell hero-grid [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)] [display:grid] [grid-template-columns:1fr_1fr] [gap:88px] [align-items:center] [padding-block:74px] [position:relative] [z-index:1] [@media(max-width:1000px)]:[gap:30px] [@media(max-width:760px)]:[grid-template-columns:1fr] [@media(max-width:760px)]:[padding-block:55px_40px]">
            <div className="hero-copy [&_h1]:[font-size:clamp(44px,_5vw,_68px)] [&_h1]:[letter-spacing:-.055em] [&_h1]:[line-height:1.05] [&_h1]:[margin:24px_0] [&_h1_em]:[font-style:normal] [&_h1_em]:[color:var(--pink)] [&_>_p]:[font-size:18px] [&_>_p]:[line-height:1.7] [&_>_p]:[color:#526078] [&_>_p]:[max-width:580px] [@media(max-width:760px)]:[&_h1]:[font-size:44px] [@media(max-width:760px)]:[&_>_p]:[font-size:16px] [@media(max-width:430px)]:[&_h1]:[font-size:39px]">
              <span className="eyebrow [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase] [background:var(--blue-light)] [border:1px_solid_#c3e7fc] [padding:8px_12px] [border-radius:99px] [letter-spacing:.03em] [text-transform:none] [font-size:13px]">
                <Icon name="spark" size={16} /> Built for Kenyan creators
              </span>
              <h1>
                Your audience.
                <br />
                Your value. <em>Your income.</em>
              </h1>
              <p>
                Turn your creativity into a business. Get discovered by brands,
                sell your products, receive fan support and build a community
                that pays.
              </p>
              <div className="hero-actions [display:flex] [gap:12px] [margin-top:30px] [@media(max-width:760px)]:[flex-direction:column] [@media(max-width:760px)]:[align-items:stretch]">
                <button
                  className="button button-primary button-large [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--navy)] [color:white] [box-shadow:0_7px_18px_rgba(23,_37,_84,_.17)] hover:[background:#24366d] [min-height:52px] [padding:0_24px] [border-radius:12px] [font-size:15px]"
                  onClick={() => go("dashboard")}
                >
                  Join as a Creator <Icon name="arrow" />
                </button>
                <button
                  className="button button-white button-large [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:white] [border-color:var(--border)] [min-height:52px] [padding:0_24px] [border-radius:12px] [font-size:15px]"
                  onClick={() => go("discover")}
                >
                  Discover Creators
                </button>
              </div>
              <div className="hero-proof [display:flex] [align-items:center] [gap:13px] [margin-top:34px] [&_strong]:[display:block] [&_span]:[display:block] [&_strong]:[font-size:13px] [&_span]:[font-size:12px] [&_span]:[color:var(--muted)] [&_span]:[margin-top:2px]">
                <div className="avatar-stack [display:flex] [&_img]:[width:38px] [&_img]:[height:38px] [&_img]:[object-fit:cover] [&_img]:[border-radius:50%] [&_img]:[border:3px_solid_white] [&_img]:[margin-left:-9px] [&_img:first-child]:[margin:0]">
                  {[photos.amina, photos.kamau, photos.njeri].map((photo) => (
                    <img key={photo} src={photo} alt="" />
                  ))}
                </div>
                <div>
                  <strong>2,400+ creators</strong>
                  <span>building on PostYangu</span>
                </div>
              </div>
            </div>
            <div className="hero-visual [position:relative] [height:540px] [@media(max-width:760px)]:[height:465px] [@media(max-width:430px)]:[height:420px]">
              <div className="hero-card-main [position:absolute] [inset:0_50px_0_65px] [background:white] [padding:10px] [border-radius:26px] [box-shadow:0_30px_80px_rgba(23,_37,_84,_.18)] [transform:rotate(2deg)] [&_>_img]:[height:100%] [&_>_img]:[width:100%] [&_>_img]:[object-fit:cover] [&_>_img]:[border-radius:19px] [@media(max-width:1000px)]:[inset-inline:35px] [@media(max-width:760px)]:[inset:0_15px] [@media(max-width:430px)]:[inset-inline:7px]">
                <img src={photos.wanjiku} alt="Kenyan travel creator Wanjiku" />
                <div className="profile-overlay [position:absolute] [left:28px] [right:28px] [bottom:26px] [background:rgba(255,255,255,.94)] [backdrop-filter:blur(10px)] [border-radius:14px] [padding:15px_16px] [display:flex] [align-items:center] [justify-content:space-between] [box-shadow:0_12px_30px_rgba(15,29,69,.14)] [&_>_div]:[display:grid] [&_>_div]:[grid-template-columns:10px_auto] [&_strong]:[font-size:14px] [&_small]:[grid-column:2] [&_small]:[color:var(--muted)] [&_small]:[margin-top:2px]">
                  <div>
                    <span className="online-dot [width:7px] [height:7px] [border-radius:50%] [background:#22c55e] [margin-top:5px]" />
                    <strong>Wanjiku M.</strong>
                    <small>Travel creator · Nairobi</small>
                  </div>
                  <span className="verified large [display:inline-grid] [place-items:center] [width:17px] [height:17px] [border-radius:50%] [background:var(--blue)] [color:white] [vertical-align:middle] [margin-left:3px] [width:22px] [height:22px]">
                    <Icon name="check" size={12} />
                  </span>
                </div>
              </div>
              <div className="float-card earnings-card [position:absolute] [display:flex] [align-items:center] [gap:12px] [border:1px_solid_rgba(226,232,240,.8)] [border-radius:15px] [background:rgba(255,255,255,.96)] [box-shadow:var(--shadow)] [z-index:2] [&_>_div]:[display:flex] [&_>_div]:[flex-direction:column] [&_span]:[font-size:10px] [&_span]:[color:var(--muted)] [&_small]:[font-size:10px] [&_small]:[color:var(--muted)] [&_strong]:[font-size:15px] [&_strong]:[margin:2px_0] [&_small]:[color:#16a34a] [&_small]:[font-weight:700] [left:0] [top:68px] [padding:15px] [@media(max-width:760px)]:[left:-4px] [@media(max-width:760px)]:[top:36px] [@media(max-width:430px)]:[transform:scale(.88)] [@media(max-width:430px)]:[transform-origin:left]">
                <span className="mini-icon blue [width:35px] [height:35px] [border-radius:10px] [display:grid] [place-items:center] [background:var(--blue-light)] [color:var(--blue)]">
                  <Icon name="chart" size={18} />
                </span>
                <div>
                  <span>This month</span>
                  <strong>KSh 86,400</strong>
                  <small>↑ 18.2% from last month</small>
                </div>
              </div>
              <div className="float-card collab-card [position:absolute] [display:flex] [align-items:center] [gap:12px] [border:1px_solid_rgba(226,232,240,.8)] [border-radius:15px] [background:rgba(255,255,255,.96)] [box-shadow:var(--shadow)] [z-index:2] [&_>_div]:[display:flex] [&_>_div]:[flex-direction:column] [&_span]:[font-size:10px] [&_span]:[color:var(--muted)] [&_small]:[font-size:10px] [&_small]:[color:var(--muted)] [&_strong]:[font-size:15px] [&_strong]:[margin:2px_0] [&_small]:[color:#16a34a] [&_small]:[font-weight:700] [right:-24px] [bottom:63px] [padding:14px] [min-width:275px] [@media(max-width:760px)]:[right:-6px] [@media(max-width:760px)]:[bottom:45px] [@media(max-width:760px)]:[transform:scale(.9)] [@media(max-width:760px)]:[transform-origin:right] [@media(max-width:430px)]:[bottom:30px] [@media(max-width:430px)]:[max-width:260px]">
                <div className="brand-icon [width:37px] [height:37px] [border-radius:10px] [background:var(--navy)] [color:white] ![display:grid] [place-items:center] [font:700_11px_var(--font-display)]">
                  SA
                </div>
                <div>
                  <span>New brand inquiry</span>
                  <strong>Safari Air Kenya</strong>
                  <small>Campaign budget · KSh 75,000</small>
                </div>
                <span className="status status-new [border-radius:99px] [padding:5px_9px] [font-style:normal] [font:700_10px_var(--font-body)] [display:inline-flex] [width:fit-content] [background:var(--pink-light)] [color:#be185d]">
                  New
                </span>
              </div>
              <div className="tip-bubble [position:absolute] [display:flex] [align-items:center] [gap:12px] [border:1px_solid_rgba(226,232,240,.8)] [border-radius:15px] [background:rgba(255,255,255,.96)] [box-shadow:var(--shadow)] [z-index:2] [left:14px] [bottom:24px] [padding:10px_15px] [&_>_span]:[width:31px] [&_>_span]:[height:31px] [&_>_span]:[display:grid] [&_>_span]:[place-items:center] [&_>_span]:[border-radius:50%] [&_>_span]:[background:var(--pink-light)] [&_>_span]:[color:var(--pink)] [&_div]:[display:flex] [&_div]:[flex-direction:column] [&_strong]:[font-size:11px] [&_small]:[color:var(--pink)] [&_small]:[font-weight:700] [@media(max-width:760px)]:[left:2px] [@media(max-width:760px)]:[bottom:5px]">
                <span>
                  <Icon name="heart" size={18} />
                </span>
                <div>
                  <strong>Jane sent a cookie!</strong>
                  <small>+ KSh 500</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip [border-block:1px_solid_var(--border)] [background:white]">
          <div className="section-shell trust-grid [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)] [display:grid] [grid-template-columns:repeat(3,_1fr)] [padding-block:30px] [&_article]:[display:flex] [&_article]:[gap:15px] [&_article]:[align-items:center] [&_article]:[padding:3px_40px] [&_article]:[border-right:1px_solid_var(--border)] [&_article:first-child]:[padding-left:0] [&_article:last-child]:[border:0] [&_article:nth-child(2)_.feature-icon]:[background:var(--pink-light)] [&_article:nth-child(2)_.feature-icon]:[color:var(--pink)] [&_h3]:[font-size:14px] [&_h3]:[margin:0_0_4px] [&_p]:[font-size:12px] [&_p]:[color:var(--muted)] [&_p]:[line-height:1.5] [&_p]:[margin:0] [@media(max-width:760px)]:[grid-template-columns:1fr] [@media(max-width:760px)]:[padding-block:12px] [@media(max-width:760px)]:[&_article]:[padding:17px_5px] [@media(max-width:760px)]:[&_article]:[border-right:0] [@media(max-width:760px)]:[&_article]:[border-bottom:1px_solid_var(--border)] [@media(max-width:760px)]:[&_article:first-child]:[padding:17px_5px] [@media(max-width:760px)]:[&_article:first-child]:[border-right:0] [@media(max-width:760px)]:[&_article:first-child]:[border-bottom:1px_solid_var(--border)] [@media(max-width:760px)]:[&_article:last-child]:[border-bottom:0]">
            {[
              [
                "users",
                "Get discovered",
                "Meet brands looking for your exact voice and audience.",
              ],
              [
                "heart",
                "Earn from fans",
                "Tips, products and memberships, all in one place.",
              ],
              [
                "shop",
                "Build your business",
                "Professional tools to package, sell and grow your work.",
              ],
            ].map(([icon, title, text]) => (
              <article key={title}>
                <span className="feature-icon [flex:0_0_auto] [width:43px] [height:43px] [display:grid] [place-items:center] [border-radius:12px] [background:var(--blue-light)] [color:var(--blue)]">
                  <Icon name={icon} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section featured [padding:100px_0] [@media(max-width:760px)]:[padding:70px_0]">
          <div className="section-shell [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)]">
            <div className="section-heading [display:flex] [justify-content:space-between] [align-items:end] [margin-bottom:38px] [gap:30px] [&_h2]:[font-size:clamp(30px,_4vw,_43px)] [&_h2]:[letter-spacing:-.04em] [&_h2]:[margin:9px_0_8px] [&_p]:[color:var(--muted)] [&_p]:[margin:0] [&_p]:[font-size:16px] [@media(max-width:760px)]:[align-items:start] [@media(max-width:760px)]:[flex-direction:column]">
              <div>
                <span className="kicker [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]">
                  Creators to watch
                </span>
                <h2>Meet Kenya’s creative force</h2>
                <p>
                  Discover distinctive voices creating culture and moving
                  communities.
                </p>
              </div>
              <button
                className="button button-outline [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:white] [border-color:var(--border)]"
                onClick={() => go("discover")}
              >
                Explore all creators <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="creator-grid [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:22px] [@media(max-width:1000px)]:[grid-template-columns:repeat(2,_1fr)] [@media(max-width:760px)]:[grid-template-columns:1fr]">
              {creators.slice(0, 3).map((creator) => (
                <CreatorCard
                  key={creator.handle}
                  creator={creator}
                  onView={() => go("profile")}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          className="section how-section [padding:100px_0] [@media(max-width:760px)]:[padding:70px_0] [background:var(--surface)] [border-block:1px_solid_var(--border)]"
          id="how"
        >
          <div className="section-shell [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)]">
            <div className="center-heading [&_h2]:[font-size:clamp(30px,_4vw,_43px)] [&_h2]:[letter-spacing:-.04em] [&_h2]:[margin:9px_0_8px] [&_p]:[color:var(--muted)] [&_p]:[margin:0] [&_p]:[font-size:16px] [text-align:center] [max-width:680px] [margin:0_auto_55px]">
              <span className="kicker [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]">
                Simple by design
              </span>
              <h2>From creator to creator business</h2>
              <p>
                You bring the talent. We make the business side feel effortless.
              </p>
            </div>
            <div className="steps [display:grid] [grid-template-columns:repeat(3,_1fr)] [&_article]:[padding:0_40px] [&_article:first-child]:[padding-left:0] [&_article:last-child]:[padding-right:0] [&_article:nth-child(2)_.step-top_span]:[background:var(--blue)] [&_article:nth-child(3)_.step-top_span]:[background:var(--pink)] [&_h3]:[margin:21px_0_8px] [&_h3]:[font-size:18px] [&_p]:[color:var(--muted)] [&_p]:[line-height:1.7] [&_p]:[font-size:14px] [@media(max-width:760px)]:[grid-template-columns:1fr] [@media(max-width:760px)]:[gap:30px] [@media(max-width:760px)]:[&_article]:[padding:0] [@media(max-width:760px)]:[&_article:first-child]:[padding:0] [@media(max-width:760px)]:[&_article:last-child]:[padding:0]">
              {[
                [
                  "01",
                  "Create your profile",
                  "Bring your best work, bio and connected social channels together.",
                ],
                [
                  "02",
                  "Package what you offer",
                  "Set your services, rate card, products and fan experiences.",
                ],
                [
                  "03",
                  "Get discovered & earn",
                  "Receive inquiries, sell directly and grow recurring support.",
                ],
              ].map(([n, title, text], index) => (
                <article key={n}>
                  <div className="step-top [display:flex] [align-items:center] [gap:18px] [&_span]:[width:48px] [&_span]:[height:48px] [&_span]:[display:grid] [&_span]:[place-items:center] [&_span]:[border-radius:50%] [&_span]:[background:var(--navy)] [&_span]:[color:white] [&_span]:[font:800_13px_var(--font-display)] [&_div]:[height:1px] [&_div]:[flex:1] [&_div]:[background:var(--border)] [@media(max-width:760px)]:[&_div]:[display:none]">
                    <span>{n}</span>
                    {index < 2 && <div />}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section monetise-section [padding:100px_0] [@media(max-width:760px)]:[padding:70px_0]">
          <div className="section-shell [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)]">
            <div className="center-heading [&_h2]:[font-size:clamp(30px,_4vw,_43px)] [&_h2]:[letter-spacing:-.04em] [&_h2]:[margin:9px_0_8px] [&_p]:[color:var(--muted)] [&_p]:[margin:0] [&_p]:[font-size:16px] [text-align:center] [max-width:680px] [margin:0_auto_55px]">
              <span className="kicker pink [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase] [color:var(--pink)]">
                More ways to earn
              </span>
              <h2>One audience. Seven revenue streams.</h2>
            </div>
            <div className="feature-grid [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:18px] [@media(max-width:1000px)]:[grid-template-columns:repeat(2,_1fr)] [@media(max-width:760px)]:[grid-template-columns:1fr]">
              {[
                [
                  "inbox",
                  "Brand partnerships",
                  "Show your impact, share rates and manage inquiries.",
                  "sky",
                ],
                [
                  "shop",
                  "Creator storefront",
                  "Sell digital products, merch and creative services.",
                  "pink",
                ],
                [
                  "heart",
                  "Fan tips",
                  "Let your biggest supporters drop you a cookie.",
                  "peach",
                ],
                [
                  "play",
                  "Paid shoutouts",
                  "Turn personalised video requests into income.",
                  "lilac",
                ],
                [
                  "chart",
                  "Fundraisers",
                  "Bring your community together around a goal.",
                  "mint",
                ],
                [
                  "spark",
                  "Superfan memberships",
                  "Build recurring revenue with exclusive content.",
                  "sun",
                ],
              ].map(([icon, title, text, color]) => (
                <article
                  className={`feature-card ${color} ${color === "sky" ? "[background:#eef8ff] [border-color:#d7efff]" : color === "pink" ? "[background:#fff1f7] [border-color:#ffe0ed]" : color === "peach" ? "[background:#fff6ee] [border-color:#fde8d3]" : color === "lilac" ? "[background:#f6f2ff] [border-color:#e9ddff]" : color === "mint" ? "[background:#effbf5] [border-color:#d7f5e5]" : "[background:#fffae9] [border-color:#f8efc5]"}`}
                  key={title}
                >
                  <span>
                    <Icon name={icon} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <button onClick={() => go("profile")}>
                    Learn more <Icon name="arrow" size={15} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta [padding:100px_0] [@media(max-width:760px)]:[padding:70px_0] [padding-top:20px]">
          <div className="section-shell cta-inner [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)] [min-height:380px] [border-radius:24px] [overflow:hidden] [padding:60px_70px] [color:white] [background:var(--navy)] [position:relative] [display:flex] [align-items:center] [&_>_div:first-child]:[max-width:650px] [&_>_div:first-child]:[position:relative] [&_>_div:first-child]:[z-index:2] [&_h2]:[font-size:clamp(32px,_4vw,_48px)] [&_h2]:[letter-spacing:-.045em] [&_h2]:[margin:20px_0_13px] [&_h2]:[line-height:1.16] [&_p]:[color:#cbd5e1] [&_p]:[font-size:16px] [&_p]:[margin-bottom:26px] [@media(max-width:760px)]:[padding:45px_28px_180px] [@media(max-width:760px)]:[min-height:550px]">
            <div>
              <span className="eyebrow light [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase] [background:var(--blue-light)] [border:1px_solid_#c3e7fc] [padding:8px_12px] [border-radius:99px] [letter-spacing:.03em] [text-transform:none] [font-size:13px] [background:rgba(255,255,255,.1)] [color:#bddfff] [border-color:rgba(255,255,255,.1)]">
                Your next chapter starts here
              </span>
              <h2>Build a business around what you already love.</h2>
              <p>
                Join thousands of Kenyan creators turning influence into
                sustainable income.
              </p>
              <button
                className="button button-pink button-large [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--pink)] [color:white] [box-shadow:0_7px_18px_rgba(236,_72,_153,_.2)] hover:[background:var(--pink-dark)] [min-height:52px] [padding:0_24px] [border-radius:12px] [font-size:15px]"
                onClick={() => go("dashboard")}
              >
                Create your free profile <Icon name="arrow" />
              </button>
            </div>
            <div className="cta-pattern [position:absolute] [inset:0_0_0_auto] [width:45%] [background:radial-gradient(circle_at_center,_rgba(96,165,250,.4),_transparent_60%)] [&_span]:[position:absolute] [&_span]:[border-radius:50%] [&_span]:[display:grid] [&_span]:[place-items:center] [&_span]:[font:800_30px_var(--font-display)] [&_span:nth-child(1)]:[width:150px] [&_span:nth-child(1)]:[height:150px] [&_span:nth-child(1)]:[right:100px] [&_span:nth-child(1)]:[top:56px] [&_span:nth-child(1)]:[background:var(--blue-mid)] [&_span:nth-child(1)]:[transform:rotate(8deg)] [&_span:nth-child(2)]:[width:80px] [&_span:nth-child(2)]:[height:80px] [&_span:nth-child(2)]:[right:45px] [&_span:nth-child(2)]:[bottom:42px] [&_span:nth-child(2)]:[background:var(--pink)] [&_span:nth-child(3)]:[width:72px] [&_span:nth-child(3)]:[height:72px] [&_span:nth-child(3)]:[right:250px] [&_span:nth-child(3)]:[bottom:35px] [&_span:nth-child(3)]:[background:white] [&_span:nth-child(3)]:[color:var(--pink)] [@media(max-width:760px)]:[inset:auto_0_0] [@media(max-width:760px)]:[width:100%] [@media(max-width:760px)]:[height:200px] [@media(max-width:760px)]:[&_span:nth-child(1)]:[width:110px] [@media(max-width:760px)]:[&_span:nth-child(1)]:[height:110px] [@media(max-width:760px)]:[&_span:nth-child(1)]:[right:50%] [@media(max-width:760px)]:[&_span:nth-child(1)]:[top:30px] [@media(max-width:760px)]:[&_span:nth-child(2)]:[right:18%] [@media(max-width:760px)]:[&_span:nth-child(2)]:[bottom:20px] [@media(max-width:760px)]:[&_span:nth-child(3)]:[right:auto] [@media(max-width:760px)]:[&_span:nth-child(3)]:[left:14%] [@media(max-width:760px)]:[&_span:nth-child(3)]:[bottom:20px]">
              <span>KSh</span>
              <span>+</span>
              <span>
                <Icon name="heart" size={32} />
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer go={go} />
    </>
  );
}
export default Home;
