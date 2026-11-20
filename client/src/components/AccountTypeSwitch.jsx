function AccountTypeSwitch({ value, onChange, disabled = false }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-center text-sm font-semibold text-slate-700">
        Continue as
      </p>
      <div
        className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1"
        role="group"
        aria-label="Account type"
      >
        {[
          ["creator", "Creator"],
          ["fan", "Fan"],
        ].map(([type, label]) => (
          <button
            type="button"
            aria-pressed={value === type}
            className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
              value === type
                ? "bg-(--navy) text-white shadow-sm"
                : "text-(--muted) hover:bg-(--blue-light) hover:text-(--navy)"
            } disabled:cursor-not-allowed disabled:opacity-60`}
            disabled={disabled}
            key={type}
            onClick={() => onChange(type)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AccountTypeSwitch;
