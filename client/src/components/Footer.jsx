import Logo from "./Logo";

function Footer({ go }) {
  return (
    <footer>
      <div className="section-shell footer-grid w-[min(1180px,calc(100%-40px))] mx-auto [@media(max-width:760px)]:w-[min(100%-28px,1180px)]
      grid grid-cols-[2.2fr_repeat(3,1fr)] gap-15 [&_>_div]:flex [&_>_div]:items-start [&_>_div]:flex-col [&_>_div]:gap-3
      [&_>_div:first-child_p]:max-w-87.5 [&_>_div:first-child_p]:text-(--muted) [&_>_div:first-child_p]:leading-[1.7]
      [&_>_div:first-child_p]:text-[14px] [&_>_div:first-child_p]:m-[10px_0_2px] [&_small]:text-(--muted) [&_strong]:text-[13px]
      [&_strong]:mb-1.5 [&_>_div_>_button:not(.logo)]:[border:0] [&_>_div_>_button:not(.logo)]:[background:none] 
      [&_>_div_>_button:not(.logo)]:p-0 [&_>_div_>_button:not(.logo)]:text-(--muted) [&_>_div_>_button:not(.logo)]:cursor-pointer 
      [&_>_div_>_button:not(.logo)]:text-[13px] [@media(max-width:760px)]:grid-cols-[1fr_1fr] 
      [@media(max-width:760px)]:gap-8.75 [@media(max-width:760px)]:[&_>_div:first-child]:col-span-full 
      [@media(max-width:430px)]:grid-cols-[1fr] [@media(max-width:430px)]:[&_>_div:first-child]:col-auto">
        <div>
          <Logo onClick={() => go("home")} />
          <p>
            Helping Kenyan creators build sustainable businesses around the
            audiences they already have.
          </p>
          <small>Made with purpose in Nairobi, Kenya.</small>
        </div>
        <div>
          <strong>Explore</strong>
          <button onClick={() => go("discover")}>Discover creators</button>
          <button>For brands</button>
          <button onClick={() => go("login")}>For creators</button>
        </div>
        <div>
          <strong>Company</strong>
          <button>About us</button>
          <button>Help centre</button>
          <button>Contact</button>
        </div>
        <div>
          <strong>Legal</strong>
          <button>Terms of service</button>
          <button>Privacy policy</button>
          <button>Community standards</button>
        </div>
      </div>
      <div className="section-shell footer-bottom w-[min(1180px,calc(100%-40px))] mx-auto [@media(max-width:760px)]:w-[min(100%-28px,1180px)]
      [border-top:1px_solid_var(--border)] mt-12.5 pt-5.5 flex justify-between
      text-(--muted) text-[11px] [@media(max-width:760px)]:flex-col [@media(max-width:760px)]:gap-2.5">
        <span>© 2025 PostYangu. All rights reserved.</span>
        <span>Instagram · TikTok · X</span>
      </div>
    </footer>
  );
}

export default Footer;
