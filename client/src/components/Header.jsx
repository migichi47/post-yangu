import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon";
import Logo from "./Logo";

function Header({ page, go }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 h-19 border-b border-slate-200/80 bg-white/90 backdrop-blur-md max-[760px]:h-[66px]">
      <div className="mx-auto flex h-full w-[calc(100%-40px)] max-w-[1240px] items-center justify-between gap-[30px] max-[760px]:w-[calc(100%-28px)]">
        <Logo onClick={() => go("home")} />
        <nav
          className={`flex items-center gap-7 ${
            open
              ? "max-[760px]:absolute max-[760px]:left-3.5 max-[760px]:right-3.5 max-[760px]:top-[66px] max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2 max-[760px]:rounded-xl max-[760px]:border max-[760px]:border-slate-200 max-[760px]:bg-white max-[760px]:p-4 max-[760px]:shadow-lg"
              : "max-[760px]:hidden"
          }`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `py-2 text-sm font-semibold no-underline ${
                isActive || page === "discover"
                  ? "text-blue-950"
                  : "text-slate-600 hover:text-blue-950"
              }`
            }
            onClick={() => {
              setOpen(false);
            }}
          >
            Discover Creators
          </NavLink>
          <Link
            to="/discover"
            className="py-2 text-sm font-semibold text-slate-600 no-underline hover:text-blue-950"
            onClick={() => {
              setOpen(false);
            }}
          >
            For Brands
          </Link>
          <Link
            to="/dashboard"
            className="py-2 text-sm font-semibold text-slate-600 no-underline hover:text-blue-950"
            onClick={() => {
              setOpen(false);
            }}
          >
            For Creators
          </Link>
          <Link
            to="/?section=how"
            className="py-2 text-sm font-semibold text-slate-600 no-underline hover:text-blue-950"
            onClick={() => {
              setOpen(false);
            }}
          >
            How It Works
          </Link>
        </nav>
        <div className="flex items-center gap-[18px] max-[760px]:hidden">
          <Link
            to="/dashboard"
            className="py-2 text-sm font-semibold text-slate-600 no-underline hover:text-blue-950"
          >
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex min-h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-blue-950 px-[18px] text-sm font-bold text-white no-underline shadow-md transition hover:-translate-y-px hover:bg-blue-900"
          >
            Join PostYangu <Icon name="arrow" size={17} />
          </Link>
        </div>
        <button
          className="hidden border-0 bg-transparent p-2 max-[760px]:grid max-[760px]:place-items-center"
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
