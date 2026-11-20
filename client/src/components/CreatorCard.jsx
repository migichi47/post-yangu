import Icon from "./Icon";

function CreatorCard({ creator, onView, onFollow, followPending = false }) {
  const name = creator.displayName || creator.name;
  const handle = creator.username
    ? `@${creator.username}`
    : creator.handle;
  const niche = creator.niches?.join(", ") || creator.niche || "Creator";
  const photo = creator.profileImage || creator.photo;
  const verified = creator.isVerified ?? creator.verified;
  const followers = creator.followerCount ?? creator.followers;

  return (
    <article className="creator-card [border:1px_solid_var(--border)] rounded-[17px]foverflow-hiddenground:white] [box-shadow:0_5px_18px_rgba(23,37,84,.04)] [transition:transform_.25s,box-shadow_.25s]]over:[transform:translateY(-4px)] hover:[box-shadow:var(--shadow)] [&:hover_.creator-photo]:transform-[scale(1.03)]">
      <div className="creator-photo-wrap h-61.25 relative overflow-hidden [@media(max-width:760px)]:h-75 [@media(max-width:430px)]:h-63.75">
        <img
          className="creator-photo w-full h-full object-cover [transition:transform_.5s]"
          src={photo}
          alt={`${name}, ${niche} creator`}
        />
        {onFollow && (
          <button
            type="button"
            className="absolute right-3 top-3 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-900 shadow-sm disabled:opacity-60"
            aria-label={
              creator.isFollowing ? `Unfollow ${name}` : `Follow ${name}`
            }
            disabled={followPending}
            onClick={() => onFollow(creator)}
          >
            {followPending
              ? "Saving..."
              : creator.isFollowing
                ? "Following"
                : "Follow"}
          </button>
        )}
        <span className="niche-pill absolute left-3.25 bottom-3.25 [background:rgba(23,37,84,.88)] text-[white] p-[6px_10px] rounded-[99px] text-[11px] font-bold [backdrop-filter:blur(8px)]">
          {niche}
        </span>
      </div>
      <div className="creator-body p-4.5 space-y-4">
        <div className="creator-title flex justify-between gap-2.5 [&_h3]:m-[0_0_3px] [&_h3]:text-[16px] [&_p]:m-0 [&_p]:text-(--muted) [&_p]:text-[12px]">
          <div>
            <h3>
              {name}{" "}
              {verified && (
                <span
                  className="verified inline-grid place-items-center w-4.25 h-4.25 rounded-[50%] [background:var(--blue)] text-[white] align-middle ml-0.75"
                  title="Verified creator"
                >
                  <Icon name="check" size={11} />
                </span>
              )}
            </h3>
            <p>{handle}</p>
          </div>
          {creator.location && (
            <span className="location flex items-center gap-0.75 text-(--muted) text-[11px] whitespace-nowrap">
              <Icon name="location" size={14} />
              {creator.location}
            </span>
          )}
        </div>
        {followers !== undefined && (
          <div className="creator-stat flex items-center gap-2.5 m-[15px_0]der-block:1px_solid_var(--border)] [&_st[&_strong]:blockpan]:block]:[font-size:13px] [&_span]:text-(--muted) [&_span]:text-[10px]pan]:[margin-top:2px]">
            <div className="flex items-center gap-2">
              <strong>
                {typeof followers === "number"
                  ? followers.toLocaleString()
                  : followers}
              </strong>
              <span className="text-sm">Followers</span>
            </div>
          </div>
        )}
        <div>
          {creator.rate && (
            <div>
              <span>Collaborations from</span>
              <strong className="ml-2">{creator.rate}</strong>
            </div>
          )}
          <button
            type="button"
            className="flex items-center gap-2 text-blue-800 hover:text-blue-900 cursor-pointer"
            onClick={onView}
          >
            View profile <Icon name="arrow" size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CreatorCard;
