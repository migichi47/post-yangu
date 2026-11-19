function Logo({ onClick }) {
  return (
    <button
      className="inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-0 bg-transparent p-0 font-[var(--font-display)] text-[21px] font-extrabold"
      onClick={onClick}
      aria-label="PostYangu home"
    >
      <span className="relative grid size-8 place-items-center rounded-[10px] bg-blue-950 rotate-[-4deg] before:absolute before:size-[13px] before:translate-x-[-4px] before:translate-y-[-3px] before:rounded-full before:bg-pink-200 before:content-['']">
        <span className="absolute size-[7px] translate-x-[6px] translate-y-[5px] rounded-full bg-blue-400" />
      </span>
      <span>PostYangu</span>
    </button>
  );
}

export default Logo;
