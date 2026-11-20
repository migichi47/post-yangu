import { useState } from "react";
import Icon from "../components/Icon";
import TipModal from "../components/TipModal";
import { photos } from "../data/photos";
import { useRateCardVisibility } from "../contexts/RateCardVisibilityContext";

function Profile() {
  const [tipOpen, setTipOpen] = useState(false);
  const { isRateCardPublic } = useRateCardVisibility();
  const rates = [
    [
      "TikTok video",
      "Concepted, filmed and edited native video",
      "KSh 28,000",
      "7–10 days",
    ],
    [
      "Instagram Reel",
      "30–60 sec branded reel with one revision",
      "KSh 22,000",
      "5–7 days",
    ],
    [
      "Story package",
      "3-frame story with link and CTA",
      "KSh 8,500",
      "3–5 days",
    ],
    [
      "Cross-platform bundle",
      "TikTok video + Reel + 3 stories",
      "KSh 48,000",
      "10–14 days",
    ],
  ];
  return (
    <main className="profile-page [background:var(--surface)] 
    
    
    
    
    
    
    
    
    
    
    ">
      <section className="profile-cover [background:white]">
        <div className="cover-image [height:210px] [background:linear-gradient(100deg,_rgba(23,37,84,.28),_rgba(236,72,153,.08)),_url('https://images.unsplash.com/photo-1741183602264-49208457557d?auto=format&fit=crop&w=1800&q=80')_center_44%/cover] [@media(max-width:760px)]:[height:150px]" />
        <div className="section-shell profile-intro [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)] [display:grid] [grid-template-columns:150px_1fr] [gap:28px] [padding-bottom:25px] [@media(max-width:760px)]:[grid-template-columns:90px_1fr] [@media(max-width:760px)]:[gap:14px] [@media(max-width:430px)]:[display:flex] [@media(max-width:430px)]:[flex-direction:column]">
          <img
            className="profile-avatar [width:150px] [height:150px] [border-radius:22px] [object-fit:cover] [border:6px_solid_white] [margin-top:-54px] [position:relative] [@media(max-width:760px)]:[width:90px] [@media(max-width:760px)]:[height:90px] [@media(max-width:760px)]:[border-radius:16px] [@media(max-width:760px)]:[margin-top:-30px] [@media(max-width:430px)]:[margin-bottom:-10px]"
            src={photos.wanjiku}
            alt="Wanjiku Muriithi"
          />
          <div className="profile-main-info [padding-top:22px] [@media(max-width:760px)]:[padding-top:12px] [@media(max-width:430px)]:[padding-top:0]">
            <div className="profile-name-row [display:flex] [justify-content:space-between] [gap:20px] [&_h1]:[font-size:27px] [&_h1]:[margin:0_0_3px] [&_h1]:[display:flex] [&_h1]:[align-items:center] [&_h1]:[gap:3px] [&_p]:[color:var(--muted)] [&_p]:[font-size:13px] [@media(max-width:760px)]:[display:block] [@media(max-width:760px)]:[&_h1]:[font-size:21px]">
              <div>
                <h1>
                  Wanjiku Muriithi{" "}
                  <span className="verified large [display:inline-grid] [place-items:center] [width:17px] [height:17px] [border-radius:50%] [background:var(--blue)] [color:white] [vertical-align:middle] [margin-left:3px] [width:22px] [height:22px]">
                    <Icon name="check" size={12} />
                  </span>
                </h1>
                <p>@wanjiku.wanders</p>
              </div>
              <div className="profile-actions [display:flex] [gap:9px] [@media(max-width:760px)]:[grid-column:1/-1] [@media(max-width:760px)]:[position:fixed] [@media(max-width:760px)]:[z-index:40] [@media(max-width:760px)]:[left:0] [@media(max-width:760px)]:[right:0] [@media(max-width:760px)]:[bottom:0] [@media(max-width:760px)]:[padding:10px_14px] [@media(max-width:760px)]:[background:white] [@media(max-width:760px)]:[border-top:1px_solid_var(--border)] [@media(max-width:760px)]:[&_.button]:[flex:1]">
                <button className="button button-outline [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:white] [border-color:var(--border)]">
                  Contact creator
                </button>
                <button
                  className="button button-pink [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--pink)] [color:white] [box-shadow:0_7px_18px_rgba(236,_72,_153,_.2)] hover:[background:var(--pink-dark)]"
                  onClick={() => setTipOpen(true)}
                >
                  <Icon name="heart" size={17} /> Support Wanjiku
                </button>
              </div>
            </div>
            <p className="profile-bio [color:#475569] [max-width:720px] [line-height:1.65] [font-size:14px] [margin:12px_0] [@media(max-width:760px)]:[grid-column:1/-1]">
              Travel storyteller finding beautiful corners of Kenya and sharing
              thoughtful guides for curious people. Good food, slow journeys and
              honest stories.
            </p>
            <div className="profile-meta [display:flex] [align-items:center] [gap:8px] [&_span]:[display:inline-flex] [&_span]:[align-items:center] [&_span]:[gap:4px] [&_span]:[padding:5px_9px] [&_span]:[background:var(--surface)] [&_span]:[border-radius:6px] [&_span]:[color:var(--muted)] [&_span]:[font-size:11px] [@media(max-width:760px)]:[grid-column:1/-1] [@media(max-width:760px)]:[flex-wrap:wrap]">
              <span>
                <Icon name="location" size={16} /> Nairobi, Kenya
              </span>
              <span>Travel</span>
              <span>Lifestyle</span>
              <span>Food</span>
            </div>
          </div>
        </div>
      </section>
      <nav className="profile-tabs [height:58px] [background:white] [border-block:1px_solid_var(--border)] [position:sticky] [top:76px] [z-index:20] [&_.section-shell]:[display:flex] [&_.section-shell]:[height:100%] [&_.section-shell]:[gap:28px] [&_.section-shell]:[overflow-x:auto] [&_button]:[border:0] [&_button]:[background:none] [&_button]:[border-bottom:2px_solid_transparent] [&_button]:[padding:0] [&_button]:[font-weight:700] [&_button]:[font-size:12px] [&_button]:[color:var(--muted)] [&_button]:[cursor:pointer] [&_button]:[white-space:nowrap] [&_button.active]:[color:var(--navy)] [&_button.active]:[border-color:var(--pink)] [@media(max-width:760px)]:[top:66px] [@media(max-width:760px)]:[&_.section-shell]:[gap:22px]">
        <div className="section-shell [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)]">
          <button className="active">Overview</button>
          <button>Analytics</button>
          <button>Rate card</button>
          <button>Portfolio</button>
          <button>Shop</button>
          <button>Superfans</button>
        </div>
      </nav>
      <div className="section-shell profile-layout [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)] [display:grid] [grid-template-columns:minmax(0,_1fr)_300px] [gap:24px] [padding-block:30px_90px] [align-items:start] [@media(max-width:1000px)]:[grid-template-columns:1fr] [@media(max-width:760px)]:[padding-top:16px]">
        <div className="profile-content [display:flex] [flex-direction:column] [gap:20px] [min-width:0]">
          <section className="content-card [background:white] [border:1px_solid_var(--border)] [border-radius:16px] [padding:25px] [@media(max-width:760px)]:[padding:18px]">
            <div className="content-heading [display:flex] [justify-content:space-between] [align-items:start] [gap:15px] [margin-bottom:22px] [&_h2]:[font-size:21px] [&_h2]:[letter-spacing:-.02em] [&_h2]:[margin:7px_0_0] [@media(max-width:760px)]:[flex-direction:column]">
              <div>
                <span className="kicker [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]">
                  Connected platforms
                </span>
                <h2>An engaged community across platforms</h2>
              </div>
              <span className="data-badge [background:#ecfdf5] [color:#15803d] [border-radius:99px] [padding:6px_9px] [display:flex] [align-items:center] [gap:4px] [font-size:9px] [font-weight:800]">
                <Icon name="check" size={12} /> Connected data
              </span>
            </div>
            <div className="platform-stats [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:11px] [&_article]:[border:1px_solid_var(--border)] [&_article]:[border-radius:12px] [&_article]:[padding:16px] [&_article]:[display:grid] [&_article]:[grid-template-columns:34px_1fr] [&_strong]:[font-size:17px] [&_small]:[color:var(--muted)] [&_small]:[font-size:9px] [&_em]:[grid-column:1/-1] [&_em]:[font-style:normal] [&_em]:[color:var(--blue)] [&_em]:[font-size:10px] [&_em]:[font-weight:700] [&_em]:[margin-top:13px] [@media(max-width:760px)]:[grid-template-columns:1fr]">
              <article>
                <span className="platform-icon [width:28px] [height:28px] [display:grid] [place-items:center] [border-radius:8px] [background:#111827] [color:white] [font:700_9px_var(--font-display)] [grid-row:span_2]">
                  TT
                </span>
                <strong>186.4K</strong>
                <small>TikTok followers</small>
                <em>92K avg. views</em>
              </article>
              <article>
                <span className="platform-icon instagram [width:28px] [height:28px] [display:grid] [place-items:center] [border-radius:8px] [background:#111827] [color:white] [font:700_9px_var(--font-display)] [grid-row:span_2] [background:var(--pink)]">
                  IG
                </span>
                <strong>84.2K</strong>
                <small>Instagram followers</small>
                <em>6.8% engagement</em>
              </article>
              <article>
                <span className="platform-icon youtube [width:28px] [height:28px] [display:grid] [place-items:center] [border-radius:8px] [background:#111827] [color:white] [font:700_9px_var(--font-display)] [grid-row:span_2] [background:#dc2626]">
                  YT
                </span>
                <strong>13.8K</strong>
                <small>YouTube subscribers</small>
                <em>28K avg. views</em>
              </article>
            </div>
            <div className="analytics-note [display:flex] [gap:12px] [padding:14px] [border-radius:10px] [background:var(--blue-light)] [margin-top:14px] [color:var(--blue)] [&_p]:[margin:0] [&_p]:[font-size:11px] [&_p]:[color:var(--navy)] [&_p]:[line-height:1.5] [&_span]:[display:block] [&_span]:[color:var(--muted)] [&_span]:[margin-top:3px]">
              <Icon name="chart" />
              <p>
                <strong>Recent content is outperforming.</strong> Median views
                are up 18% in the last 30 days.
                <span>
                  {" "}
                  Engagement rate = interactions ÷ reach. Updated 12 Mar 2025
                  via connected platforms.
                </span>
              </p>
            </div>
          </section>
          {isRateCardPublic && (
          <section className="content-card [background:white] [border:1px_solid_var(--border)] [border-radius:16px] [padding:25px] [@media(max-width:760px)]:[padding:18px]">
            <div className="content-heading [display:flex] [justify-content:space-between] [align-items:start] [gap:15px] [margin-bottom:22px] [&_h2]:[font-size:21px] [&_h2]:[letter-spacing:-.02em] [&_h2]:[margin:7px_0_0] [@media(max-width:760px)]:[flex-direction:column]">
              <div>
                <span className="kicker pink [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase] [color:var(--pink)]">
                  Work together
                </span>
                <h2>Collaboration rate card</h2>
              </div>
              <button className="text-link [border:0] [background:none] [color:var(--blue)] [font-size:11px] [font-weight:800] [cursor:pointer]">
                Download media kit
              </button>
            </div>
            <div className="rate-list [border:1px_solid_var(--border)] [border-radius:12px] [overflow:hidden] [&_article]:[display:flex] [&_article]:[justify-content:space-between] [&_article]:[gap:20px] [&_article]:[padding:17px] [&_article]:[border-bottom:1px_solid_var(--border)] [&_article:last-child]:[border:0] [&_h3]:[font-size:14px] [&_h3]:[margin:0_0_4px] [&_p]:[font-size:11px] [&_p]:[color:var(--muted)] [&_p]:[margin:0_0_6px] [&_article_>_div:first-child_span]:[color:var(--blue)] [&_article_>_div:first-child_span]:[background:var(--blue-light)] [&_article_>_div:first-child_span]:[border-radius:5px] [&_article_>_div:first-child_span]:[padding:4px_6px] [&_article_>_div:first-child_span]:[font-size:8px] [&_article_>_div:first-child_span]:[font-weight:700] [&_article_>_div:last-child]:[display:grid] [&_article_>_div:last-child]:[text-align:right] [&_article_>_div:last-child]:[grid-template-columns:1fr_auto] [&_article_>_div:last-child]:[align-items:center] [&_article_>_div:last-child]:[min-width:190px] [&_article_>_div:last-child_small]:[grid-column:1/-1] [&_article_>_div:last-child_small]:[color:var(--muted)] [&_article_>_div:last-child_small]:[font-size:8px] [&_article_>_div:last-child_strong]:[font-size:14px] [&_.button]:[min-height:32px] [&_.button]:[font-size:10px] [&_.button]:[padding-inline:10px] [@media(max-width:760px)]:[&_article]:[flex-direction:column] [@media(max-width:760px)]:[&_article_>_div:last-child]:[min-width:0] [@media(max-width:760px)]:[&_article_>_div:last-child]:[text-align:left] [@media(max-width:760px)]:[&_article_>_div:last-child]:[grid-template-columns:1fr_auto]">
              {rates.map(([name, desc, price, time]) => (
                <article key={name}>
                  <div>
                    <h3>{name}</h3>
                    <p>{desc}</p>
                    <span>{time} turnaround</span>
                  </div>
                  <div>
                    <small>Starting at</small>
                    <strong>{price}</strong>
                    <button className="button button-soft [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--blue-light)] [color:var(--navy)]">
                      Request
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="package-banner [background:var(--navy)] [color:white] [padding:18px] [border-radius:12px] [margin-top:13px] [display:flex] [justify-content:space-between] [align-items:center] [gap:15px] [&_>_div]:[display:flex] [&_>_div]:[gap:12px] [&_>_div]:[align-items:center] [&_>_div_>_span]:[width:35px] [&_>_div_>_span]:[height:35px] [&_>_div_>_span]:[display:grid] [&_>_div_>_span]:[place-items:center] [&_>_div_>_span]:[border-radius:9px] [&_>_div_>_span]:[background:rgba(255,255,255,.1)] [&_h3]:[font-size:13px] [&_h3]:[margin:0_0_3px] [&_p]:[font-size:10px] [&_p]:[color:#bdc8e0] [&_p]:[margin:0] [&_.button]:[background:white] [&_.button]:[color:var(--navy)] [&_.button]:[min-height:38px] [&_.button]:[font-size:10px] [@media(max-width:760px)]:[flex-direction:column] [@media(max-width:760px)]:[align-items:stretch]">
              <div>
                <span>
                  <Icon name="spark" />
                </span>
                <div>
                  <h3>Need something custom?</h3>
                  <p>
                    Ask about usage rights, exclusivity, content-only production
                    and campaign bundles.
                  </p>
                </div>
              </div>
              <button className="button button-primary [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--navy)] [color:white] [box-shadow:0_7px_18px_rgba(23,_37,_84,_.17)] hover:[background:#24366d]">
                Request a collaboration
              </button>
            </div>
          </section>
          )}
          <section className="content-card [background:white] [border:1px_solid_var(--border)] [border-radius:16px] [padding:25px] [@media(max-width:760px)]:[padding:18px]">
            <div className="content-heading [display:flex] [justify-content:space-between] [align-items:start] [gap:15px] [margin-bottom:22px] [&_h2]:[font-size:21px] [&_h2]:[letter-spacing:-.02em] [&_h2]:[margin:7px_0_0] [@media(max-width:760px)]:[flex-direction:column]">
              <div>
                <span className="kicker [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]">
                  Recent work
                </span>
                <h2>Stories made with intention</h2>
              </div>
              <button className="text-link [border:0] [background:none] [color:var(--blue)] [font-size:11px] [font-weight:800] [cursor:pointer]">
                View full portfolio
              </button>
            </div>
            <div className="portfolio-grid [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:10px] [&_article]:[height:210px] [&_article]:[border-radius:10px] [&_article]:[overflow:hidden] [&_article]:[position:relative] [&_img]:[width:100%] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&_article::after]:[content:''] [&_article::after]:[position:absolute] [&_article::after]:[inset:35%_0_0] [&_article::after]:[background:linear-gradient(transparent,_rgba(15,29,69,.9))] [&_article_div]:[position:absolute] [&_article_div]:[z-index:2] [&_article_div]:[left:13px] [&_article_div]:[bottom:12px] [&_article_div]:[color:white] [&_article_div]:[display:flex] [&_article_div]:[flex-direction:column] [&_span]:[font-size:9px] [&_span]:[opacity:.8] [&_strong]:[font-size:12px] [&_strong]:[margin-top:3px] [@media(max-width:760px)]:[overflow-x:auto] [@media(max-width:760px)]:[grid-template-columns:repeat(3,_220px)]">
              {[photos.amina, photos.otieno, photos.njeri].map((photo, i) => (
                <article key={photo}>
                  <img src={photo} alt="" />
                  <div>
                    <span>
                      {
                        [
                          "Kenya Airways",
                          "Nairobi Design Week",
                          "Tembea Kenya",
                        ][i]
                      }
                    </span>
                    <strong>
                      {
                        [
                          "Coast without a checklist",
                          "Meet the makers",
                          "48 hours in Nanyuki",
                        ][i]
                      }
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="content-card membership-card [background:white] [border:1px_solid_var(--border)] [border-radius:16px] [padding:25px] [@media(max-width:760px)]:[padding:18px] [display:grid] [grid-template-columns:1.3fr_.8fr] [gap:25px] [background:linear-gradient(135deg,_white,_#fff4f8)] [&_h2]:[font-size:25px] [&_h2]:[margin:9px_0] [&_p]:[color:var(--muted)] [&_p]:[line-height:1.6] [&_p]:[font-size:12px] [@media(max-width:760px)]:[grid-template-columns:1fr]">
            <div>
              <span className="kicker pink [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase] [color:var(--pink)]">
                Wanjiku’s Inner Circle
              </span>
              <h2>Come behind the scenes</h2>
              <p>
                Monthly travel notes, editing breakdowns, early access and the
                stories that don’t make the feed.
              </p>
              <div className="benefit-list [display:flex] [flex-wrap:wrap] [gap:7px_14px] [margin-bottom:18px] [&_span]:[display:flex] [&_span]:[align-items:center] [&_span]:[gap:4px] [&_span]:[font-size:9px] [&_span]:[font-weight:700] [&_svg]:[color:var(--pink)]">
                <span>
                  <Icon name="check" size={14} /> 4 exclusive drops monthly
                </span>
                <span>
                  <Icon name="check" size={14} /> Members-only Q&A
                </span>
                <span>
                  <Icon name="check" size={14} /> Early guide access
                </span>
              </div>
              <button className="button button-pink [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--pink)] [color:white] [box-shadow:0_7px_18px_rgba(236,_72,_153,_.2)] hover:[background:var(--pink-dark)]">
                Join for KSh 350 / month
              </button>
            </div>
            <div className="locked-grid [display:grid] [grid-template-columns:1fr_1fr] [gap:8px] [&_div]:[position:relative] [&_div]:[border-radius:12px] [&_div]:[overflow:hidden] [&_div]:[min-height:185px] [&_img]:[width:100%] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&_img]:[filter:blur(4px)] [&_img]:[transform:scale(1.05)] [&_span]:[position:absolute] [&_span]:[inset:0] [&_span]:[margin:auto] [&_span]:[width:38px] [&_span]:[height:38px] [&_span]:[border-radius:50%] [&_span]:[display:grid] [&_span]:[place-items:center] [&_span]:[background:rgba(255,255,255,.9)] [&_span]:[color:var(--pink)]">
              {[photos.zuri, photos.kamau].map((p) => (
                <div key={p}>
                  <img src={p} alt="" />
                  <span>
                    <Icon name="lock" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="profile-aside [position:sticky] [top:155px] [display:flex] [flex-direction:column] [gap:16px] [@media(max-width:1000px)]:[position:static] [@media(max-width:1000px)]:[display:grid] [@media(max-width:1000px)]:[grid-template-columns:1fr_1fr] [@media(max-width:760px)]:[grid-template-columns:1fr]">
          <div className="support-card [background:white] [border:1px_solid_var(--border)] [border-radius:16px] [padding:25px] [text-align:center] [background:linear-gradient(145deg,_#fff,_#fff2f7)] [&_h2]:[font-size:18px] [&_h2]:[margin-bottom:8px] [&_p]:[color:var(--muted)] [&_p]:[font-size:11px] [&_p]:[line-height:1.6] [&_small]:[display:block] [&_small]:[color:var(--muted)] [&_small]:[font-size:9px] [&_small]:[margin-top:10px]">
            <span className="support-art [width:62px] [height:62px] [display:grid] [place-items:center] [background:var(--pink-light)] [color:var(--pink)] [border-radius:50%] [margin:0_auto_15px]">
              <Icon name="heart" size={28} />
            </span>
            <h2>Enjoy Wanjiku’s work?</h2>
            <p>
              Drop a cookie and leave a little note. Every bit helps create the
              next story.
            </p>
            <button
              className="button button-pink button-full [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--pink)] [color:white] [box-shadow:0_7px_18px_rgba(236,_72,_153,_.2)] hover:[background:var(--pink-dark)] [width:100%] [min-height:50px]"
              onClick={() => setTipOpen(true)}
            >
              Drop a cookie
            </button>
            <small>From KSh 20 · Pay with M-PESA</small>
          </div>
          <div className="side-card [background:white] [border:1px_solid_var(--border)] [border-radius:16px] [padding:25px] [&_h3]:[font-size:13px] [&_h3]:[margin-bottom:14px] [&_dl]:[margin:0] [&_dl_div]:[display:flex] [&_dl_div]:[justify-content:space-between] [&_dl_div]:[padding:10px_0] [&_dl_div]:[border-top:1px_solid_var(--border)] [&_dl_div]:[font-size:10px] [&_dt]:[color:var(--muted)] [&_dd]:[margin:0] [&_dd]:[font-weight:700]">
            <h3>Quick details</h3>
            <dl>
              <div>
                <dt>Response time</dt>
                <dd>Within 2 days</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>English, Kiswahili</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>
                  <span className="available-dot [width:6px] [height:6px] [display:inline-block] [background:#22c55e] [border-radius:50%]" />{" "}
                  April slots open
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
      {tipOpen && <TipModal close={() => setTipOpen(false)} />}
    </main>
  );
}

export default Profile