import { useState } from "react";
import Icon from "../components/Icon";
import { photos } from "../data/photos";
import Logo from "../components/Logo";

function Dashboard({ go }) {
  const [active, setActive] = useState("Overview");
  const nav = [
    ["grid", "Overview"],
    ["users", "My Profile"],
    ["chart", "Analytics"],
    ["shop", "Rate Card"],
    ["inbox", "Brand Inquiries"],
    ["shop", "Products & Services"],
    ["wallet", "Tips & Earnings"],
    ["heart", "Superfan Memberships"],
  ];
  return (
    <main className="dashboard [min-height:100vh] [background:var(--surface)] [display:grid] [grid-template-columns:245px_1fr] [@media(max-width:1000px)]:[grid-template-columns:200px_1fr] [@media(max-width:760px)]:[display:block] [@media(max-width:760px)]:[padding-bottom:70px]">
      <aside className="dash-sidebar [position:fixed] [left:0] [top:0] [bottom:0] [width:245px] [background:white] [border-right:1px_solid_var(--border)] [padding:23px_16px] [display:flex] [flex-direction:column] [z-index:30] [&_>_.logo]:[padding-left:8px] [&_nav]:[display:flex] [&_nav]:[flex-direction:column] [&_nav]:[gap:3px] [&_nav_button]:[border:0] [&_nav_button]:[background:none] [&_nav_button]:[min-height:40px] [&_nav_button]:[border-radius:8px] [&_nav_button]:[display:flex] [&_nav_button]:[align-items:center] [&_nav_button]:[gap:11px] [&_nav_button]:[padding:0_11px] [&_nav_button]:[color:var(--muted)] [&_nav_button]:[font-size:11px] [&_nav_button]:[font-weight:700] [&_nav_button]:[cursor:pointer] [&_nav_button.active]:[color:var(--navy)] [&_nav_button.active]:[background:var(--blue-light)] [&_nav_button_em]:[margin-left:auto] [&_nav_button_em]:[font-style:normal] [&_nav_button_em]:[font-size:9px] [&_nav_button_em]:[background:var(--pink)] [&_nav_button_em]:[color:white] [&_nav_button_em]:[width:19px] [&_nav_button_em]:[height:19px] [&_nav_button_em]:[border-radius:50%] [&_nav_button_em]:[display:grid] [&_nav_button_em]:[place-items:center] [@media(max-width:1000px)]:[width:200px] [@media(max-width:760px)]:[display:none]">
        <Logo onClick={() => go("home")} />
        <div className="dash-user [display:flex] [align-items:center] [gap:10px] [padding:14px_10px] [margin:24px_0_10px] [border-radius:11px] [background:var(--surface)] [&_img]:[width:36px] [&_img]:[height:36px] [&_img]:[border-radius:10px] [&_img]:[object-fit:cover] [&_div]:[display:flex] [&_div]:[flex-direction:column] [&_strong]:[font-size:12px] [&_span]:[color:var(--muted)] [&_span]:[font-size:9px] [&_span]:[margin-top:2px]">
          <img src={photos.wanjiku} alt="" />
          <div>
            <strong>Wanjiku M.</strong>
            <span>Creator account</span>
          </div>
        </div>
        <nav>
          {nav.map(([icon, label]) => (
            <button
              className={active === label ? "active" : ""}
              onClick={() => setActive(label)}
              key={label}
            >
              <Icon name={icon} size={19} />
              {label}
              {label === "Brand Inquiries" && <em>3</em>}
            </button>
          ))}
        </nav>
        <div className="completion [margin-top:auto] [background:var(--navy)] [color:white] [border-radius:12px] [padding:14px] [&_>_div:first-child]:[display:flex] [&_>_div:first-child]:[justify-content:space-between] [&_>_div:first-child]:[font-size:10px] [&_p]:[color:#bdc8e0] [&_p]:[font-size:8px] [&_p]:[line-height:1.5] [&_p]:[margin:0]">
          <div>
            <span>Profile strength</span>
            <strong>84%</strong>
          </div>
          <div className="progress [height:5px] [background:rgba(255,255,255,.15)] [border-radius:10px] [margin:9px_0] [&_i]:[display:block] [&_i]:[width:84%] [&_i]:[height:100%] [&_i]:[background:var(--pink)] [&_i]:[border-radius:10px]">
            <i />
          </div>
          <p>Add audience demographics to stand out to brands.</p>
        </div>
      </aside>
      <div className="dash-main [grid-column:2] [min-width:0] [@media(max-width:760px)]:[width:100%]">
        <header className="dash-header [&_img]:[width:36px] [&_img]:[height:36px] [&_img]:[border-radius:10px] [&_img]:[object-fit:cover] [height:72px] [position:sticky] [top:0] [z-index:20] [background:rgba(255,255,255,.93)] [border-bottom:1px_solid_var(--border)] [backdrop-filter:blur(14px)] [padding:0_30px] [display:flex] [justify-content:space-between] [align-items:center] [&_>_div]:[display:flex] [&_>_div]:[align-items:center] [&_>_div]:[gap:12px] [&_>_div:first-child_span]:[color:var(--muted)] [&_>_div:first-child_span]:[font-size:11px] [@media(max-width:760px)]:[height:62px] [@media(max-width:760px)]:[padding:0_15px] [@media(max-width:760px)]:[&_.button]:[display:none]">
          <div>
            <button className="dash-menu [display:none] [border:0] [background:none] [@media(max-width:760px)]:[display:block]">
              <Icon name="menu" />
            </button>
            <span>Creator workspace</span>
          </div>
          <div>
            <button className="icon-button [width:37px] [height:37px] [border:1px_solid_var(--border)] [background:white] [border-radius:9px] [display:grid] [place-items:center] [cursor:pointer]">
              <Icon name="bell" />
            </button>
            <button
              className="button button-outline [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:white] [border-color:var(--border)]"
              onClick={() => go("profile")}
            >
              View public profile
            </button>
            <img src={photos.wanjiku} alt="" />
          </div>
        </header>
        <div className="dash-content [max-width:1260px] [margin:auto] [padding:32px] [@media(max-width:760px)]:[padding:22px_14px]">
          <div className="dash-welcome [display:flex] [justify-content:space-between] [align-items:end] [&_h1]:[font-size:28px] [&_h1]:[margin:7px_0_4px] [&_h1]:[letter-spacing:-.03em] [&_p]:[color:var(--muted)] [&_p]:[font-size:12px] [&_p]:[margin:0] [@media(max-width:760px)]:[align-items:start] [@media(max-width:760px)]:[&_h1]:[font-size:24px] [@media(max-width:760px)]:[&_>_.button]:[display:none]">
            <div>
              <span className="kicker [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]">
                Tuesday, 18 March
              </span>
              <h1>Good morning, Wanjiku.</h1>
              <p>Here’s what’s happening with your creator business.</p>
            </div>
            <button className="button button-primary [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--navy)] [color:white] [box-shadow:0_7px_18px_rgba(23,_37,_84,_.17)] hover:[background:#24366d]">
              + Add an offering
            </button>
          </div>
          <div className="demo-label [display:inline-block] [background:#fff7ed] [color:#c2410c] [border:1px_solid_#fed7aa] [padding:5px_8px] [border-radius:6px] [font-size:8px] [font-weight:800] [margin:20px_0_12px] [text-transform:uppercase] [letter-spacing:.05em]">
            Demo workspace · Sample data
          </div>
          <div className="metric-grid [display:grid] [grid-template-columns:repeat(4,_1fr)] [gap:14px] [&_article]:[border:1px_solid_var(--border)] [&_article]:[background:white] [&_article]:[border-radius:13px] [&_article]:[padding:17px] [&_article_>_div]:[display:flex] [&_article_>_div]:[align-items:center] [&_article_>_div]:[justify-content:space-between] [&_p]:[color:var(--muted)] [&_p]:[font-size:10px] [&_p]:[margin:14px_0_4px] [&_article_>_strong]:[font-size:21px] [@media(max-width:1000px)]:[grid-template-columns:repeat(2,_1fr)] [@media(max-width:760px)]:[grid-template-columns:1fr_1fr] [@media(max-width:760px)]:[gap:9px] [@media(max-width:760px)]:[&_article]:[padding:14px] [@media(max-width:430px)]:[&_article_>_strong]:[font-size:17px]">
            {[
              ["wallet", "Total earnings", "KSh 86,400", "↑ 18.2%", "blue"],
              ["inbox", "Brand inquiries", "12", "+3 this week", "pink"],
              ["users", "Profile views", "3,842", "↑ 24.8%", "purple"],
              ["heart", "Superfans", "126", "+14 this month", "peach"],
            ].map(([icon, label, value, change, color]) => (
              <article key={label}>
                <div>
                  <span
                    className={`metric-icon ${color} ${color === "blue" ? "[background:var(--blue-light)] [color:var(--blue)]" : color === "pink" ? "[background:var(--pink-light)] [color:var(--pink)]" : color === "purple" ? "[background:#ede9fe] [color:#7c3aed]" : "[background:#ffedd5] [color:#ea580c]"}`}
                  >
                    <Icon name={icon} />
                  </span>
                  <span className="trend [color:#16a34a] [font-size:9px] [font-weight:700]">
                    {change}
                  </span>
                </div>
                <p>{label}</p>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <div className="dash-grid [display:grid] [grid-template-columns:1.45fr_.75fr] [gap:14px] [margin-top:14px] [@media(max-width:760px)]:[grid-template-columns:1fr]">
            <section className="dash-card earnings-chart [border:1px_solid_var(--border)] [background:white] [border-radius:13px] [padding:20px] [min-width:0]">
              <div className="dash-card-head [display:flex] [align-items:start] [justify-content:space-between] [&_h2]:[font-size:14px] [&_h2]:[margin:0_0_3px] [&_p]:[font-size:9px] [&_p]:[color:var(--muted)] [&_p]:[margin:0] [&_select]:[border:1px_solid_var(--border)] [&_select]:[border-radius:7px] [&_select]:[background:white] [&_select]:[padding:7px] [&_select]:[font-size:9px] [&_button]:[border:0] [&_button]:[background:none] [&_button]:[padding:0] [&_button]:[color:var(--blue)] [&_button]:[font-weight:700] [&_button]:[font-size:9px] [&_button]:[cursor:pointer]">
                <div>
                  <h2>Earnings</h2>
                  <p>Last 6 months · KSh</p>
                </div>
                <select>
                  <option>Last 6 months</option>
                </select>
              </div>
              <div className="chart-total [display:flex] [align-items:center] [gap:10px] [margin-top:21px] [&_strong]:[font-size:20px] [&_span]:[color:#16a34a] [&_span]:[font-size:8px] [&_span]:[font-weight:700] [&_span]:[background:#ecfdf5] [&_span]:[padding:4px_6px] [&_span]:[border-radius:5px]">
                <strong>KSh 312,800</strong>
                <span>+22.4% vs previous period</span>
              </div>
              <MiniChart />
            </section>
            <section className="dash-card activity-card [border:1px_solid_var(--border)] [background:white] [border-radius:13px] [padding:20px] [min-width:0] [@media(max-width:760px)]:[grid-row:2]">
              <div className="dash-card-head [display:flex] [align-items:start] [justify-content:space-between] [&_h2]:[font-size:14px] [&_h2]:[margin:0_0_3px] [&_p]:[font-size:9px] [&_p]:[color:var(--muted)] [&_p]:[margin:0] [&_select]:[border:1px_solid_var(--border)] [&_select]:[border-radius:7px] [&_select]:[background:white] [&_select]:[padding:7px] [&_select]:[font-size:9px] [&_button]:[border:0] [&_button]:[background:none] [&_button]:[padding:0] [&_button]:[color:var(--blue)] [&_button]:[font-weight:700] [&_button]:[font-size:9px] [&_button]:[cursor:pointer]">
                <div>
                  <h2>Recent activity</h2>
                  <p>Your latest updates</p>
                </div>
                <button>View all</button>
              </div>
              <div className="activity-list [margin-top:16px] [&_article]:[display:flex] [&_article]:[align-items:center] [&_article]:[gap:10px] [&_article]:[padding:11px_0] [&_article]:[border-top:1px_solid_var(--border)] [&_article_>_div]:[display:flex] [&_article_>_div]:[flex-direction:column] [&_article_>_div]:[flex:1] [&_strong]:[font-size:10px] [&_small]:[color:var(--muted)] [&_small]:[font-size:8px] [&_small]:[margin-top:2px] [&_.metric-icon]:[width:30px] [&_.metric-icon]:[height:30px] [&_article_>_svg]:[color:var(--muted)]">
                {[
                  [
                    "inbox",
                    "New brand inquiry",
                    "Safari Air Kenya · 12 min ago",
                    "pink",
                  ],
                  [
                    "heart",
                    "New superfan joined",
                    "Faith N. · 2 hours ago",
                    "peach",
                  ],
                  [
                    "wallet",
                    "Payout completed",
                    "KSh 24,500 · Yesterday",
                    "blue",
                  ],
                  [
                    "shop",
                    "New guide order",
                    "Nairobi Weekend Guide · Yesterday",
                    "purple",
                  ],
                ].map(([icon, title, meta, color]) => (
                  <article key={title}>
                    <span
                      className={`metric-icon ${color} ${color === "blue" ? "[background:var(--blue-light)] [color:var(--blue)]" : color === "pink" ? "[background:var(--pink-light)] [color:var(--pink)]" : color === "purple" ? "[background:#ede9fe] [color:#7c3aed]" : "[background:#ffedd5] [color:#ea580c]"}`}
                    >
                      <Icon name={icon} size={17} />
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <small>{meta}</small>
                    </div>
                    <Icon name="arrow" size={15} />
                  </article>
                ))}
              </div>
            </section>
            <section className="dash-card inquiry-card [border:1px_solid_var(--border)] [background:white] [border-radius:13px] [padding:20px] [min-width:0] [grid-column:1_/_-1] [@media(max-width:760px)]:[grid-column:auto] [@media(max-width:760px)]:[overflow-x:auto]">
              <div className="dash-card-head [display:flex] [align-items:start] [justify-content:space-between] [&_h2]:[font-size:14px] [&_h2]:[margin:0_0_3px] [&_p]:[font-size:9px] [&_p]:[color:var(--muted)] [&_p]:[margin:0] [&_select]:[border:1px_solid_var(--border)] [&_select]:[border-radius:7px] [&_select]:[background:white] [&_select]:[padding:7px] [&_select]:[font-size:9px] [&_button]:[border:0] [&_button]:[background:none] [&_button]:[padding:0] [&_button]:[color:var(--blue)] [&_button]:[font-weight:700] [&_button]:[font-size:9px] [&_button]:[cursor:pointer]">
                <div>
                  <h2>Brand inquiries</h2>
                  <p>Opportunities needing your attention</p>
                </div>
                <button>View pipeline</button>
              </div>
              <div className="inquiry-table [margin-top:15px]">
                <div className="table-row head [min-width:690px] [display:grid] [grid-template-columns:1.3fr_1.4fr_.8fr_.8fr_.8fr] [align-items:center] [min-height:49px] [border-top:1px_solid_var(--border)] [font-size:9px] [&:not(.head)]:[padding-inline:8px] [&_button]:[border:0] [&_button]:[background:none] [&_button]:[display:flex] [&_button]:[align-items:center] [&_button]:[gap:5px] [&_button]:[color:var(--blue)] [&_button]:[font-size:9px] [&_button]:[font-weight:700] [&_button]:[cursor:pointer] [min-height:31px] [background:var(--surface)] [border:0] [color:var(--muted)] [font-weight:700] [padding-inline:8px]">
                  <span>Brand</span>
                  <span>Campaign</span>
                  <span>Budget</span>
                  <span>Status</span>
                  <span>Next action</span>
                </div>
                {[
                  [
                    "SA",
                    "Safari Air Kenya",
                    "Coastal routes launch",
                    "KSh 75,000",
                    "New",
                    "Review brief",
                  ],
                  [
                    "NK",
                    "Nia Kenya",
                    "New season lookbook",
                    "KSh 48,000",
                    "In discussion",
                    "Reply",
                  ],
                  [
                    "BK",
                    "Brew Kenya",
                    "Cold brew summer",
                    "KSh 32,500",
                    "Quoted",
                    "Await response",
                  ],
                ].map(([initial, brand, campaign, budget, status, action]) => (
                  <div
                    className="table-row [min-width:690px] [display:grid] [grid-template-columns:1.3fr_1.4fr_.8fr_.8fr_.8fr] [align-items:center] [min-height:49px] [border-top:1px_solid_var(--border)] [font-size:9px] [&:not(.head)]:[padding-inline:8px] [&_button]:[border:0] [&_button]:[background:none] [&_button]:[display:flex] [&_button]:[align-items:center] [&_button]:[gap:5px] [&_button]:[color:var(--blue)] [&_button]:[font-size:9px] [&_button]:[font-weight:700] [&_button]:[cursor:pointer]"
                    key={brand}
                  >
                    <span className="brand-cell [display:flex] [align-items:center] [gap:8px] [&_i]:[width:28px] [&_i]:[height:28px] [&_i]:[background:var(--navy)] [&_i]:[color:white] [&_i]:[border-radius:7px] [&_i]:[display:grid] [&_i]:[place-items:center] [&_i]:[font-style:normal] [&_i]:[font-weight:700]">
                      <i>{initial}</i>
                      <strong>{brand}</strong>
                    </span>
                    <span>{campaign}</span>
                    <strong>{budget}</strong>
                    <span>
                      <em
                        className={`status ${status.toLowerCase().replace(" ", "-")} ${status === "New" ? "[background:var(--pink-light)] [color:#be185d]" : status === "In Discussion" ? "[background:var(--blue-light)] [color:#1d4ed8]" : "[background:#ede9fe] [color:#6d28d9]"}`}
                      >
                        {status}
                      </em>
                    </span>
                    <span>
                      <button>
                        {action} <Icon name="arrow" size={14} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <nav className="mobile-bottom-nav [display:none] [@media(max-width:760px)]:[position:fixed] [@media(max-width:760px)]:[z-index:50] [@media(max-width:760px)]:[left:0] [@media(max-width:760px)]:[right:0] [@media(max-width:760px)]:[bottom:0] [@media(max-width:760px)]:[height:65px] [@media(max-width:760px)]:[display:grid] [@media(max-width:760px)]:[grid-template-columns:repeat(4,1fr)] [@media(max-width:760px)]:[background:white] [@media(max-width:760px)]:[border-top:1px_solid_var(--border)] [@media(max-width:760px)]:[&_button]:[border:0] [@media(max-width:760px)]:[&_button]:[background:none] [@media(max-width:760px)]:[&_button]:[display:flex] [@media(max-width:760px)]:[&_button]:[flex-direction:column] [@media(max-width:760px)]:[&_button]:[justify-content:center] [@media(max-width:760px)]:[&_button]:[align-items:center] [@media(max-width:760px)]:[&_button]:[gap:3px] [@media(max-width:760px)]:[&_button]:[color:var(--muted)] [@media(max-width:760px)]:[&_button]:[font-size:8px] [@media(max-width:760px)]:[&_button.active]:[color:var(--blue)]">
        {nav.slice(0, 4).map(([icon, label]) => (
          <button
            className={active === label ? "active" : ""}
            onClick={() => setActive(label)}
            key={label}
          >
            <Icon name={icon} />
            <span>{label.replace("My ", "")}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}

function MiniChart() {
  return (
    <div className="chart-wrap [height:180px] [margin-top:15px] [display:flex]">
      <div className="chart-y [display:flex] [flex-direction:column] [justify-content:space-between] [font-size:7px] [color:var(--muted)] [padding-bottom:17px] [width:27px]">
        <span>80K</span>
        <span>60K</span>
        <span>40K</span>
        <span>20K</span>
        <span>0</span>
      </div>
      <div className="chart-main [flex:1] [position:relative] [min-width:0] [&_svg]:[position:absolute] [&_svg]:[inset:0_0_17px] [&_svg]:[width:100%] [&_svg]:[height:calc(100%_-_17px)]">
        <div className="grid-lines [position:absolute] [inset:0_0_17px] [display:flex] [flex-direction:column] [justify-content:space-between] [&_i]:[border-top:1px_dashed_var(--border)]">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <svg viewBox="0 0 700 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#60A5FA" stopOpacity=".25" />
              <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 160 C80 150 80 125 145 130 S220 90 290 110 S380 70 430 82 S520 42 570 58 S650 20 700 28 L700 180 L0 180Z"
            fill="url(#fill)"
          />
          <path
            d="M0 160 C80 150 80 125 145 130 S220 90 290 110 S380 70 430 82 S520 42 570 58 S650 20 700 28"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <div
          className="chart-x [position:absolute] [bottom:0] [left:0] [right:0] [display:flex] [justify-content:space-between]
          [color:var(--muted)] [font-size:7px]"
        >
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
