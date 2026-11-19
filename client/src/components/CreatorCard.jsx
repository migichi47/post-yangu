import Icon from "./Icon";

function CreatorCard({ creator, onView }) {
  return (
    <article className="creator-card [border:1px_solid_var(--border)] rounded-[17px]foverflow-hiddenground:white] [box-shadow:0_5px_18px_rgba(23,37,84,.04)] [transition:transform_.25s,box-shadow_.25s]]over:[transform:translateY(-4px)] hover:[box-shadow:var(--shadow)] [&:hover_.creator-photo]:transform-[scale(1.03)]">
      <div className="creator-photo-wrap h-61.25 relative overflow-hidden [@media(max-width:760px)]:h-75 [@media(max-width:430px)]:h-63.75">
        <img
          className="creator-photo w-full h-full object-cover [transition:transform_.5s]"
          src={creator.photo}
          alt={`${creator.name}, ${creator.niche} creator`}
        />
        <button
          className="save-button absolute right-3.25 top-3.25 w-9 h-9 [border:0] [background:rgba(255,255,255,.93)] grid place-items-center rounded-[50%] cursor-pointer"
          aria-label={`Save ${creator.name}`}
        >
          <Icon name="heart" size={18} />
        </button>
        <span className="niche-pill absolute left-3.25 bottom-3.25 [background:rgba(23,37,84,.88)] text-[white] p-[6px_10px] rounded-[99px] text-[11px] font-bold [backdrop-filter:blur(8px)]">
          {creator.niche}
        </span>
      </div>
      <div className="creator-body p-4.5">
        <div className="creator-title flex justify-between gap-2.5 [&_h3]:m-[0_0_3px] [&_h3]:text-[16px] [&_p]:m-0 [&_p]:text-(--muted) [&_p]:text-[12px]">
          <div>
            <h3>
              {creator.name}{" "}
              {creator.verified && (
                <span
                  className="verified inline-grid place-items-center w-4.25 h-4.25 rounded-[50%] [background:var(--blue)] text-[white] align-middle ml-0.75"
                  title="Verified creator"
                >
                  <Icon name="check" size={11} />
                </span>
              )}
            </h3>
            <p>{creator.handle}</p>
          </div>
          <span className="location flex items-center gap-0.75 text-(--muted) text-[11px] whitespace-nowrap">
            <Icon name="location" size={14} />
            {creator.location}
          </span>
        </div>
        <div className="creator-stats grid grid-cols-[1fr_1.35fr] gap-2.5[15px_0] m-[15px_0]der-block:1px_solid_var(--border)] [&_st[&_strong]:blockpan]:block]:[font-size:13px] [&_span]:text-(--muted) [&_span]:text-[10px]pan]:[margin-top:2px]">
          <div>
            <strong>{creator.followers}</strong>
            <span>Total following</span>
          </div>
          <div>
            <strong>{creator.views}</strong>
            <span>Recent performance</span>
          </div>
        </div>
        <div className="creator-footer flexcontent:space-between] items-centerpgap[&_>_div]:flex_>_div]:[flex-direction:column] [&_span]:text-[9px]p[&_span]:text-(--muted)tr[&_strong]:text-[13px]rong]:[margin-top:2px] [&_.button]:min-h-9n[&_.button]:px-3n]:[font-size:11px]">
          <div>
            <span>Collaborations from</span>
            <strong>{creator.rate}</strong>
          </div>
          <button
            className="button button-soft [border:1px_solid_transparent] rounded-[10px] min-h-10.5 p-[0_18px] inline-flex justify-center items-centerxgap-2eight:700] text-[14px] cursor-pointer [transition:transform_.2s,box-shadow_.2s,background_.2s] whitespace-nowrap hover:transform-[translateY(-1px)] [background:var(--blue-light)] text-(--navy)"
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
