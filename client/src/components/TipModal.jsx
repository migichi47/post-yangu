import { useState } from "react";
import Icon from "./Icon";
import { photos } from "../data/photos";

function TipModal({ close }) {
  const [amount, setAmount] = useState(250);
  const [sent, setSent] = useState(false);
  return (
    <div
      className="modal-backdrop [position:fixed] [inset:0] [z-index:100] [background:rgba(15,29,69,.62)] [backdrop-filter:blur(4px)] [display:grid] [place-items:center] [padding:20px] [animation:fade_.2s]"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="tip-modal [width:min(480px,_100%)] [max-height:calc(100vh_-_30px)] [overflow-y:auto] [background:white] [border-radius:19px] [box-shadow:0_30px_80px_rgba(0,0,0,.25)] [padding:28px] [position:relative] [animation:rise_.25s] [@media(max-width:760px)]:[padding:23px_18px]">
        <button
          className="modal-close [position:absolute] [right:17px] [top:17px] [border:0] [background:var(--surface)] [width:34px] [height:34px] [border-radius:50%] [display:grid] [place-items:center] [cursor:pointer]"
          onClick={close}
          aria-label="Close"
        >
          <Icon name="close" />
        </button>
        {sent ? (
          <div className="success-state [text-align:center] [padding:35px_15px_20px] [&_>_span]:[width:65px] [&_>_span]:[height:65px] [&_>_span]:[display:grid] [&_>_span]:[place-items:center] [&_>_span]:[border-radius:50%] [&_>_span]:[background:#dcfce7] [&_>_span]:[color:#16a34a] [&_>_span]:[margin:auto] [&_h2]:[margin:20px_0_8px] [&_p]:[color:var(--muted)] [&_p]:[line-height:1.6] [&_p]:[font-size:13px]">
            <span>
              <Icon name="check" size={28} />
            </span>
            <h2>Cookie delivered!</h2>
            <p>
              Wanjiku will receive KSh {amount.toLocaleString()} and your
              message. Asante for supporting local creativity.
            </p>
            <button
              className="button button-primary [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--navy)] [color:white] [box-shadow:0_7px_18px_rgba(23,_37,_84,_.17)] hover:[background:#24366d]"
              onClick={close}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="modal-creator [display:flex] [gap:14px] [padding-right:25px] [&_img]:[width:64px] [&_img]:[height:64px] [&_img]:[border-radius:14px] [&_img]:[object-fit:cover] [&_span]:[color:var(--pink)] [&_span]:[font-size:10px] [&_span]:[font-weight:800] [&_span]:[text-transform:uppercase] [&_span]:[letter-spacing:.08em] [&_h2]:[font-size:21px] [&_h2]:[margin:3px_0_4px] [&_p]:[font-size:11px] [&_p]:[line-height:1.5] [&_p]:[color:var(--muted)]">
              <img src={photos.wanjiku} alt="" />
              <div>
                <span>Support</span>
                <h2>Drop Wanjiku a cookie</h2>
                <p>
                  100% good vibes. Almost all of your support goes directly to
                  the creator.
                </p>
              </div>
            </div>
            <p className="field-label [font-weight:700] [font-size:12px] [margin:25px_0_9px]">
              Choose an amount
            </p>
            <div className="amount-grid [display:grid] [grid-template-columns:repeat(5,_1fr)] [gap:7px] [&_button]:[border:1px_solid_var(--border)] [&_button]:[background:white] [&_button]:[border-radius:8px] [&_button]:[padding:10px_3px] [&_button]:[font-weight:700] [&_button]:[font-size:11px] [&_button]:[cursor:pointer] [&_button.active]:[background:var(--pink-light)] [&_button.active]:[color:#be185d] [&_button.active]:[border-color:var(--pink)] [@media(max-width:760px)]:[grid-template-columns:repeat(3,_1fr)]">
              {[20, 50, 100, 250, 500].map((n) => (
                <button
                  className={amount === n ? "active" : ""}
                  onClick={() => setAmount(n)}
                  key={n}
                >
                  KSh {n}
                </button>
              ))}
            </div>
            <label className="field [display:flex] [flex-direction:column] [font-weight:700] [font-size:12px] [margin-top:20px] [&_textarea]:[resize:none] [&_textarea]:[min-height:72px] [&_textarea]:[border:1px_solid_var(--border)] [&_textarea]:[border-radius:9px] [&_textarea]:[padding:11px] [&_textarea]:[margin-top:8px] [&_textarea]:[outline:0] [&_textarea]:[font-size:11px]">
              Add a message (optional)
              <textarea placeholder="Your work makes my day. Keep creating!" />
            </label>
            <div className="checkout-summary [background:var(--surface)] [border-radius:10px] [margin:18px_0] [padding:14px] [display:grid] [grid-template-columns:1fr_auto] [gap:8px] [font-size:11px] [color:var(--muted)] [&_div]:[border-top:1px_solid_var(--border)] [&_strong]:[text-align:right] [&_strong]:[color:var(--navy)]">
              <span>Your support</span>
              <strong>KSh {amount.toLocaleString()}</strong>
              <span>Platform fee</span>
              <strong>KSh {Math.max(5, amount * 0.05).toLocaleString()}</strong>
              <div />
              <div />
              <span>Total</span>
              <strong>
                KSh {(amount + Math.max(5, amount * 0.05)).toLocaleString()}
              </strong>
            </div>
            <button
              className="button button-pink button-full [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--pink)] [color:white] [box-shadow:0_7px_18px_rgba(236,_72,_153,_.2)] hover:[background:var(--pink-dark)] [width:100%] [min-height:50px]"
              onClick={() => setSent(true)}
            >
              Continue to M-PESA <Icon name="arrow" />
            </button>
            <small className="secure-note [display:flex] [align-items:center] [justify-content:center] [gap:5px] [color:var(--muted)] [margin-top:10px]">
              <Icon name="lock" size={13} /> Secure checkout · You’ll confirm on
              your phone
            </small>
          </>
        )}
      </div>
    </div>
  );
}

export default TipModal;
