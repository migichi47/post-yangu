function Logo({ onClick }) {
  return (
    <button
      className="logo [border:0] [background:none] [padding:0] [display:inline-flex] [align-items:center] [gap:10px] [font:800_21px_var(--font-display)] [cursor:pointer] [white-space:nowrap]"
      onClick={onClick}
      aria-label="PostYangu home"
    >
      <span className="logo-mark [width:32px] [height:32px] [border-radius:10px] [display:grid] [place-items:center] [background:var(--navy)] [transform:rotate(-4deg)] [&::before]:[content:''] [&::before]:[display:block] [&::before]:[position:absolute] [&::before]:[border-radius:50%] [&_span]:[content:''] [&_span]:[display:block] [&_span]:[position:absolute] [&_span]:[border-radius:50%] [&::before]:[width:13px] [&::before]:[height:13px] [&::before]:[background:var(--pink-light)] [&::before]:[transform:translate(-4px,_-3px)] [&_span]:[width:7px] [&_span]:[height:7px] [&_span]:[background:var(--blue-mid)] [&_span]:[transform:translate(6px,_5px)]">
        <span />
      </span>
      <span>PostYangu</span>
    </button>
  );
}

export default Logo;
