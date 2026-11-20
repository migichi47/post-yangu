import { useMemo, useState } from "react";
import CreatorCard from "../components/CreatorCard";
import Icon from "../components/Icon";
import { creators } from "../data/creators";

function Discover({ go }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All creators");
  const filtered = useMemo(
    () =>
      creators.filter(
        (c) =>
          `${c.name} ${c.handle} ${c.niche} ${c.location}`
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          (category === "All creators" || c.niche.includes(category)),
      ),
    [search, category],
  );
  const cats = [
    "All creators",
    "Travel",
    "Food",
    "Comedy",
    "Fashion",
    "Education",
  ];
  return (
    <main className="discover-page [background:var(--surface)] [min-height:100vh] [padding-bottom:100px]">
      <section className="discover-hero [background:var(--navy)] [color:white] [padding:75px_0_62px] [text-align:center] [position:relative] [overflow:hidden] [&::after]:[content:''] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background-image:radial-gradient(rgba(255,255,255,.16)_1px,_transparent_1px)] [&::after]:[background-size:24px_24px] [&::after]:[mask-image:radial-gradient(circle,_black,_transparent_70%)] [&_.section-shell]:[position:relative] [&_.section-shell]:[z-index:1] [&_h1]:[font-size:clamp(36px,_5vw,_54px)] [&_h1]:[letter-spacing:-.05em] [&_h1]:[margin:15px_0_12px] [&_p]:[color:#bfc9df] [&_p]:[font-size:16px] [@media(max-width:760px)]:[padding:55px_0_45px]">
        <div className="section-shell [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)]">
          <span className="kicker [display:inline-flex] [align-items:center] [gap:7px] [color:var(--blue)] [font-size:12px] [font-weight:800] [letter-spacing:.08em] [text-transform:uppercase]">
            Creator marketplace
          </span>
          <h1>Find the right voice for your next idea.</h1>
          <p>
            Discover credible Kenyan creators by category, audience and real
            performance—not follower count alone.
          </p>
          <label className="search-box [max-width:740px] [margin:30px_auto_0] [height:60px] [background:white] [border-radius:13px] [display:flex] [align-items:center] [padding:7px_7px_7px_20px] [color:var(--muted)] [text-align:left] [box-shadow:0_14px_40px_rgba(0,0,0,.2)] [&_input]:[border:0] [&_input]:[outline:0] [&_input]:[flex:1] [&_input]:[min-width:0] [&_input]:[padding:0_13px] [&_input]:[color:var(--navy)] [&_button]:[align-self:stretch] [&_button]:[min-width:100px] [&_button]:[border:0] [&_button]:[border-radius:9px] [&_button]:[background:var(--pink)] [&_button]:[color:white] [&_button]:[font-weight:700] [&_button]:[cursor:pointer] [@media(max-width:760px)]:[height:56px] [@media(max-width:760px)]:[&_button]:[min-width:75px]">
            <Icon name="search" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creators, handles, niches or locations"
            />
            <button>Search</button>
          </label>
        </div>
      </section>
      <section className="section-shell discovery-content [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)] [padding-top:30px]">
        <div className="filter-row [display:flex] [justify-content:space-between] [align-items:center] [gap:15px] [border-bottom:1px_solid_var(--border)] [padding-bottom:20px] [@media(max-width:760px)]:[align-items:flex-start] [@media(max-width:760px)]:[&_>_.button]:[padding-inline:11px]">
          <div className="category-tabs [display:flex] [gap:6px] [overflow-x:auto] [&_button]:[border:0] [&_button]:[background:transparent] [&_button]:[padding:10px_14px] [&_button]:[border-radius:8px] [&_button]:[white-space:nowrap] [&_button]:[color:var(--muted)] [&_button]:[font-weight:600] [&_button]:[font-size:13px] [&_button]:[cursor:pointer] [&_button.active]:[background:var(--blue-light)] [&_button.active]:[color:var(--navy)]">
            {cats.map((cat) => (
              <button
                className={category === cat ? "active" : ""}
                onClick={() => setCategory(cat)}
                key={cat}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="button button-outline [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:white] [border-color:var(--border)]">
            <Icon name="filter" size={17} /> All filters
          </button>
        </div>
        <div className="result-heading [display:flex] [justify-content:space-between] [align-items:end] [margin:34px_0_22px] [&_h2]:[font-size:21px] [&_h2]:[margin:0_0_4px] [&_p]:[margin:0] [&_p]:[color:var(--muted)] [&_p]:[font-size:12px] [&_label]:[color:var(--muted)] [&_label]:[font-size:12px] [&_select]:[border:1px_solid_var(--border)] [&_select]:[border-radius:8px] [&_select]:[background:white] [&_select]:[padding:9px] [&_select]:[margin-left:8px] [@media(max-width:760px)]:[align-items:start] [@media(max-width:760px)]:[flex-direction:column] [@media(max-width:760px)]:[gap:14px]">
          <div>
            <h2>{filtered.length} creators to explore</h2>
            <p>Profiles with complete data are shown first</p>
          </div>
          <label>
            Sort by{" "}
            <select>
              <option>Most relevant</option>
              <option>Recently joined</option>
              <option>Audience size</option>
            </select>
          </label>
        </div>
        {filtered.length ? (
          <div className="creator-grid discovery-grid [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:22px] [@media(max-width:1000px)]:[grid-template-columns:repeat(2,_1fr)] [@media(max-width:760px)]:[grid-template-columns:1fr] [row-gap:24px]">
            {filtered.map((creator) => (
              <CreatorCard
                key={creator.handle}
                creator={creator}
                onView={() => go(`creators/${creator.handle.slice(1)}`)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state [background:white] [border:1px_dashed_var(--border)] [border-radius:18px] [padding:70px_20px] [text-align:center] [color:var(--muted)] [&_svg]:[color:var(--blue)] [&_h3]:[color:var(--navy)] [&_h3]:[margin:14px_0_5px]">
            <Icon name="search" size={32} />
            <h3>No creators found</h3>
            <p>Try a broader niche, location or creator name.</p>
            <button
              className="button button-primary [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--navy)] [color:white] [box-shadow:0_7px_18px_rgba(23,_37,_84,_.17)] hover:[background:#24366d]"
              onClick={() => {
                setSearch("");
                setCategory("All creators");
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Discover;
