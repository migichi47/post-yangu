import { useState } from "react";
import Icon from "./Icon";
import { photos } from "../data/photos";

function TransactionModal({
  close,
  title,
  description,
  amount: initialAmount,
  amountOptions = [],
  frequency = "one-time",
  platformFeeRate = 0,
  showMessage = false,
  creatorPhoto = photos.wanjiku,
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [checkoutReady, setCheckoutReady] = useState(false);
  const platformFee =
    platformFeeRate > 0 ? Math.max(5, amount * platformFeeRate) : 0;
  const total = amount + platformFee;

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedNumber = mpesaNumber.replace(/[\s()-]/g, "");

    if (!/^(?:\+?254|0)?[17]\d{8}$/.test(normalizedNumber)) {
      setPhoneError("Enter a valid Kenyan M-PESA number, such as 0712 345 678.");
      return;
    }

    setPhoneError("");
    setMpesaNumber("");
    setCheckoutReady(true);
  };

  return (
    <div
      className="modal-backdrop [position:fixed] [inset:0] [z-index:100] [background:rgba(15,29,69,.62)] [backdrop-filter:blur(4px)] [display:grid] [place-items:center] [padding:20px] [animation:fade_.2s]"
      onMouseDown={(event) =>
        event.target === event.currentTarget && close()
      }
      onKeyDown={(event) => event.key === "Escape" && close()}
    >
      <div
        className="tip-modal [width:min(480px,_100%)] [max-height:calc(100vh_-_30px)] [overflow-y:auto] [background:white] [border-radius:19px] [box-shadow:0_30px_80px_rgba(0,0,0,.25)] [padding:28px] [position:relative] [animation:rise_.25s] [@media(max-width:760px)]:[padding:23px_18px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
      >
        <button
          type="button"
          className="modal-close [position:absolute] [right:17px] [top:17px] [border:0] [background:var(--surface)] [width:34px] [height:34px] [border-radius:50%] [display:grid] [place-items:center] [cursor:pointer]"
          onClick={close}
          aria-label="Close checkout"
        >
          <Icon name="close" />
        </button>
        {checkoutReady ? (
          <div
            className="success-state [text-align:center] [padding:35px_15px_20px] [&_>_span]:[width:65px] [&_>_span]:[height:65px] [&_>_span]:[display:grid] [&_>_span]:[place-items:center] [&_>_span]:[border-radius:50%] [&_>_span]:[background:var(--blue-light)] [&_>_span]:[color:var(--blue)] [&_>_span]:[margin:auto] [&_h2]:[margin:20px_0_8px] [&_p]:[color:var(--muted)] [&_p]:[line-height:1.6] [&_p]:[font-size:13px]"
            role="status"
          >
            <span>
              <Icon name="check" size={28} />
            </span>
            <h2 id="transaction-modal-title">Checkout preview ready</h2>
            <p>
              No payment was made and your number was not sent or saved. M-PESA
              checkout will be available when payment processing is connected.
            </p>
            <button
              type="button"
              className="button button-primary [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--navy)] [color:white] [box-shadow:0_7px_18px_rgba(23,_37,_84,_.17)] hover:[background:#24366d]"
              onClick={close}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="modal-creator [display:flex] [gap:14px] [padding-right:25px] [&_img]:[width:64px] [&_img]:[height:64px] [&_img]:[border-radius:14px] [&_img]:[object-fit:cover] [&_span]:[color:var(--pink)] [&_span]:[font-size:10px] [&_span]:[font-weight:800] [&_span]:[text-transform:uppercase] [&_span]:[letter-spacing:.08em] [&_h2]:[font-size:21px] [&_h2]:[margin:3px_0_4px] [&_p]:[font-size:11px] [&_p]:[line-height:1.5] [&_p]:[color:var(--muted)]">
              <img src={creatorPhoto} alt="" />
              <div>
                <span>M-PESA checkout</span>
                <h2 id="transaction-modal-title">{title}</h2>
                <p>{description}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {amountOptions.length > 0 && (
                <>
                  <p className="field-label [font-weight:700] [font-size:12px] [margin:25px_0_9px]">
                    Choose an amount
                  </p>
                  <div className="amount-grid [display:grid] [grid-template-columns:repeat(5,_1fr)] [gap:7px] [&_button]:[border:1px_solid_var(--border)] [&_button]:[background:white] [&_button]:[border-radius:8px] [&_button]:[padding:10px_3px] [&_button]:[font-weight:700] [&_button]:[font-size:11px] [&_button]:[cursor:pointer] [&_button.active]:[background:var(--pink-light)] [&_button.active]:[color:#be185d] [&_button.active]:[border-color:var(--pink)] [@media(max-width:760px)]:[grid-template-columns:repeat(3,_1fr)]">
                    {amountOptions.map((option) => (
                      <button
                        type="button"
                        className={amount === option ? "active" : ""}
                        onClick={() => setAmount(option)}
                        key={option}
                      >
                        KSh {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <label className="field [display:flex] [flex-direction:column] [font-weight:700] [font-size:12px] [margin-top:20px]">
                M-PESA phone number
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={mpesaNumber}
                  onChange={(event) => {
                    setMpesaNumber(event.target.value);
                    setPhoneError("");
                  }}
                  placeholder="0712 345 678"
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={
                    phoneError ? "mpesa-number-error" : "mpesa-number-help"
                  }
                  className="mt-2 rounded-lg border border-[var(--border)] px-3 py-3 text-sm font-normal text-[var(--navy)] outline-none focus:border-[var(--blue)]"
                />
              </label>
              {phoneError ? (
                <p
                  className="mb-0 mt-2 text-xs font-semibold text-rose-600"
                  id="mpesa-number-error"
                  role="alert"
                >
                  {phoneError}
                </p>
              ) : (
                <p
                  className="mb-0 mt-2 text-xs text-[var(--muted)]"
                  id="mpesa-number-help"
                >
                  Use the Kenyan mobile number registered with M-PESA.
                </p>
              )}
              {showMessage && (
                <label className="field [display:flex] [flex-direction:column] [font-weight:700] [font-size:12px] [margin-top:18px] [&_textarea]:[resize:none] [&_textarea]:[min-height:72px] [&_textarea]:[border:1px_solid_var(--border)] [&_textarea]:[border-radius:9px] [&_textarea]:[padding:11px] [&_textarea]:[margin-top:8px] [&_textarea]:[font-size:11px]">
                  Add a message (optional)
                  <textarea placeholder="Your work makes my day. Keep creating!" />
                </label>
              )}
              <div className="checkout-summary [background:var(--surface)] [border-radius:10px] [margin:18px_0] [padding:14px] [display:grid] [grid-template-columns:1fr_auto] [gap:8px] [font-size:11px] [color:var(--muted)] [&_div]:[border-top:1px_solid_var(--border)] [&_strong]:[text-align:right] [&_strong]:[color:var(--navy)]">
                <span>
                  {frequency === "monthly" ? "Membership" : "Your support"}
                </span>
                <strong>
                  KSh {amount.toLocaleString()}
                  {frequency === "monthly" ? " / month" : ""}
                </strong>
                {platformFeeRate > 0 && (
                  <>
                    <span>Platform fee</span>
                    <strong>KSh {platformFee.toLocaleString()}</strong>
                  </>
                )}
                <div />
                <div />
                <span>Total today</span>
                <strong>KSh {total.toLocaleString()}</strong>
              </div>
              <button
                type="submit"
                className="button button-pink button-full [border:1px_solid_transparent] [border-radius:10px] [min-height:42px] [padding:0_18px] [display:inline-flex] [justify-content:center] [align-items:center] [gap:8px] [font-weight:700] [font-size:14px] [cursor:pointer] [transition:transform_.2s,_box-shadow_.2s,_background_.2s] [white-space:nowrap] hover:[transform:translateY(-1px)] [background:var(--pink)] [color:white] [box-shadow:0_7px_18px_rgba(236,_72,_153,_.2)] hover:[background:var(--pink-dark)] [width:100%] [min-height:50px]"
              >
                Review checkout <Icon name="arrow" />
              </button>
            </form>
            <small className="secure-note [display:flex] [align-items:center] [justify-content:center] [gap:5px] [color:var(--muted)] [margin-top:10px]">
              <Icon name="lock" size={13} /> Demo only · No payment is sent
            </small>
          </>
        )}
      </div>
    </div>
  );
}

export default TransactionModal;
