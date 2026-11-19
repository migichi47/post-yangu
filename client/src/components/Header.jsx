import { useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";

function Header({ page, go }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header [height:76px] [position:sticky] [top:0] [z-index:50] [background:rgba(255,_255,_255,_.92)] [border-bottom:1px_solid_rgba(226,_232,_240,_.82)] [backdrop-filter:blur(16px)] [@media(max-width:760px)]:[height:66px]">
      <div className="nav-shell [height:100%] [width:min(1240px,_calc(100%_-_40px))] [margin:auto] [display:flex] [align-items:center] [justify-content:space-between] [gap:30px] [@media(max-width:760px)]:[width:min(100%_-_28px,_1180px)]">
        <Logo onClick={() => go("home")} />
        <nav
          className={
            open
              ? "nav-links open [display:flex] [&_a]:[border:0] [&_a]:[background:none] [&_a]:[padding:8px_0] [&_a]:[font-size:14px] [&_a]:[font-weight:600] [&_a]:[color:#475569] [&_a]:[text-decoration:none] [&_a]:[cursor:pointer] [&_a.active]:[color:var(--navy)]"
              : "nav-links [&_a]:[border:0] [&_a]:[background:none] [&_a]:[padding:8px_0] [&_a]:[font-size:14px] [&_a]:[font-weight:600] [&_a]:[color:#475569] [&_a]:[text-decoration:none] [&_a]:[cursor:pointer] [&_a.active]:[color:var(--navy)]"
          }
          aria-label="Main navigation"
        >
          <a
            href="#/discover"
            className={page === "discover" ? "active" : ""}
            onClick={() => {
              setOpen(false);
            }}
          >
            Discover Creators
          </a>
          <a
            href="#/discover"
            onClick={() => {
              setOpen(false);
            }}
          >
            For Brands
          </a>
          <a
            href="#/dashboard"
            onClick={() => {
              setOpen(false);
            }}
          >
            For Creators
          </a>
          <a
            href="#/#how"
            onClick={() => {
              setOpen(false);
              setTimeout(
                () =>
                  document
                    .getElementById("how")
                    ?.scrollIntoView({ behavior: "smooth" }),
                30,
              );
            }}
          >
            How It Works
          </a>
        </nav>
        <div className="nav-actions [display:flex] [align-items:center] [gap:18px] [@media(max-width:760px)]:[display:none]">
          <a
            href="#/dashboard"
            className="text-button [border:0] [background:none] [padding:8px_0] [font-size:14px] [font-weight:600] [color:#475569] [cursor:pointer] [text-decoration:none]"
          >
            Log in
          </a>
          <a
            href="#/dashboard"
            className="button button-primary [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] [text-decoration:none] hover:[transform:translateY(-1px)] [background:var(--navy)] [color:white] [box-shadow:0_7px_18px_rgba(23,_37,_84,_.17)] hover:[background:#24366d]"
          >
            Join PostYangu <Icon name="arrow" size={17} />
          </a>
        </div>
        <button
          className="menu-button [border:0] [background:none] [padding:8px] [display:none] [@media(max-width:760px)]:[display:grid] [@media(max-width:760px)]:[place-items:center]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

export default Header;
