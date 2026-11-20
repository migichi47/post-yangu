import { useEffect, useState } from "react";
import CreatorCard from "../components/CreatorCard";
import Icon from "../components/Icon";
import {
  followCreator,
  getCreators,
  unfollowCreator,
} from "../api/creators";

function Discover({ go }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All creators");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("recent");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [creators, setCreators] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pendingUsername, setPendingUsername] = useState("");
  const [loadError, setLoadError] = useState("");
  const [followError, setFollowError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const cats = [
    "All creators",
    "Travel",
    "Food",
    "Comedy",
    "Fashion",
    "Education",
  ];

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      setLoading(true);
      setLoadError("");
      getCreators({
        q: search.trim(),
        niche: category === "All creators" ? "" : category,
        location: location.trim(),
        verified: verifiedOnly ? "true" : "",
        sort,
        page,
        limit: 9,
      })
        .then((result) => {
          if (active) {
            setCreators(result.creators);
            setTotalPages(result.totalPages);
          }
        })
        .catch((requestError) => {
          if (active) {
            setLoadError(
              requestError instanceof Error
                ? requestError.message
                : "Unable to load creators.",
            );
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [search, category, location, sort, verifiedOnly, page, retryCount]);

  const toggleFollow = async (creator) => {
    setPendingUsername(creator.username);
    setFollowError("");
    try {
      const result = creator.isFollowing
        ? await unfollowCreator(creator.username)
        : await followCreator(creator.username);
      setCreators((current) =>
        current.map((item) =>
          item.username === creator.username
            ? {
                ...item,
                isFollowing: result.isFollowing,
                followerCount: result.followerCount,
              }
            : item,
        ),
      );
    } catch (requestError) {
      setFollowError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update your following list.",
      );
    } finally {
      setPendingUsername("");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("All creators");
    setVerifiedOnly(false);
    setPage(1);
  };

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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search creators, handles, niches or locations"
            />
            <button type="button">Search</button>
          </label>
        </div>
      </section>
      <section className="section-shell discovery-content [width:min(1180px,_calc(100%_-_40px))] [margin-inline:auto] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)] [padding-top:30px]">
        <div className="filter-row [display:flex] [justify-content:space-between] [align-items:center] [gap:15px] [border-bottom:1px_solid_var(--border)] [padding-bottom:20px] [@media(max-width:760px)]:[align-items:flex-start] [@media(max-width:760px)]:[&_>_.button]:[padding-inline:11px]">
          <div className="category-tabs [display:flex] [gap:6px] [overflow-x:auto] [&_button]:[border:0] [&_button]:[background:transparent] [&_button]:[padding:10px_14px] [&_button]:[border-radius:8px] [&_button]:[white-space:nowrap] [&_button]:[color:var(--muted)] [&_button]:[font-weight:600] [&_button]:[font-size:13px] [&_button]:[cursor:pointer] [&_button.active]:[background:var(--blue-light)] [&_button.active]:[color:var(--navy)]">
            {cats.map((cat) => (
              <button
                className={category === cat ? "active" : ""}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                key={cat}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                setPage(1);
              }}
              aria-label="Filter by location"
              placeholder="Location"
              className="min-h-10 w-36 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800"
            />
            <button
              type="button"
              aria-pressed={verifiedOnly}
              onClick={() => {
                setVerifiedOnly((current) => !current);
                setPage(1);
              }}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            >
              <Icon name="filter" size={17} />
              {verifiedOnly ? "Verified only" : "Verified"}
            </button>
          </div>
        </div>
        <div className="result-heading [display:flex] [justify-content:space-between] [align-items:end] [margin:34px_0_22px] [&_h2]:[font-size:21px] [&_h2]:[margin:0_0_4px] [&_p]:[margin:0] [&_p]:[color:var(--muted)] [&_p]:[font-size:12px] [&_label]:[color:var(--muted)] [&_label]:[font-size:12px] [&_select]:[border:1px_solid_var(--border)] [&_select]:[border-radius:8px] [&_select]:[background:white] [&_select]:[padding:9px] [&_select]:[margin-left:8px] [@media(max-width:760px)]:[align-items:start] [@media(max-width:760px)]:[flex-direction:column] [@media(max-width:760px)]:[gap:14px]">
          <div>
            <h2>{loading ? "Loading creators..." : "Creators to explore"}</h2>
            <p>Creator profiles from the PostYangu community</p>
          </div>
          <label>
            Sort by{" "}
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              <option value="recent">Recently joined</option>
              <option value="popular">Popularity</option>
            </select>
          </label>
        </div>
        {loadError && (
          <div
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            <p>{loadError}</p>
            <button
              type="button"
              onClick={() => setRetryCount((current) => current + 1)}
              className="mt-2 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}
        {followError && (
          <p className="mb-5 text-sm font-medium text-red-600" role="alert">
            {followError}
          </p>
        )}
        {loading ? (
          <div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading creators"
            role="status"
          >
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : loadError ? null : creators.length ? (
          <div className="creator-grid discovery-grid [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:22px] [@media(max-width:1000px)]:[grid-template-columns:repeat(2,_1fr)] [@media(max-width:760px)]:[grid-template-columns:1fr] [row-gap:24px]">
            {creators.map((creator) => (
              <CreatorCard
                key={creator._id}
                creator={creator}
                onView={() => go(`creators/${creator.username}`)}
                onFollow={creator.canFollow ? toggleFollow : undefined}
                followPending={pendingUsername === creator.username}
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
              onClick={clearFilters}
            >
              Clear search
            </button>
          </div>
        )}
        {!loading && totalPages > 1 && (
          <nav
            className="mt-8 flex items-center justify-center gap-4"
            aria-label="Creator results pages"
          >
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-50"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-50"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page === totalPages}
            >
              Next
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}

export default Discover;
