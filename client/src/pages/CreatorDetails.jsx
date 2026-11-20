import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import TransactionModal from "../components/TransactionModal";
import { creators } from "../data/creators";

function CreatorDetails() {
  const { handle } = useParams();
  const [transaction, setTransaction] = useState(null);
  const creator = creators.find(
    (item) => item.handle.slice(1) === handle,
  );

  if (!creator) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Creator not found
        </h1>
        <Link
          to="/discover"
          className="font-semibold text-blue-800 hover:text-blue-950"
        >
          Back to discover
        </Link>
      </main>
    );
  }

  const stats = [
    ["Audience", creator.followers],
    ["Performance", creator.views],
    ["Starting rate", creator.rate],
  ];
  const gifts = [
    { name: "Tea", amount: 100 },
    { name: "Coffee", amount: 150 },
    { name: "Cappuccino", amount: 250 },
  ];
  const membership = {
    title: `Join ${creator.name}'s membership`,
    description:
      "Support this creator monthly and get access to their member community.",
    amount: 350,
    frequency: "monthly",
  };
  const eventSupport = {
    title: `Support ${creator.name}'s event`,
    description:
      "Choose a contribution to help this creator bring a community event to life.",
    amount: 500,
    amountOptions: [100, 250, 500, 1000, 2500],
    showMessage: true,
  };
  const shoutout = {
    title: `Request a shoutout from ${creator.name}`,
    description:
      "Send a one-time request and include an optional note for the creator.",
    amount: 500,
    showMessage: true,
  };

  return (
    <main className="min-h-screen bg-[var(--surface)] pb-16">
      <section className="relative isolate overflow-hidden bg-[var(--navy)] text-white">
        <img
          src={creator.photo}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 blur-sm"
        />
        <div className="mx-auto w-[min(100%-40px,1000px)] py-12 sm:py-16">
          <Link
            to="/discover"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/80 no-underline hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to creators
          </Link>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
            <img
              src={creator.photo}
              alt={`${creator.name}, creator profile`}
              className="h-32 w-32 rounded-2xl border-4 border-white/80 object-cover shadow-xl sm:h-40 sm:w-40"
            />
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-sky-200">
                Creator profile
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                {creator.name}
                {creator.verified && (
                  <span
                    className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 align-middle"
                    title="Verified creator"
                  >
                    <Icon name="check" size={15} />
                  </span>
                )}
              </h1>
              <p className="mt-2 text-white/75">{creator.handle}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-white/15 px-3 py-1">
                  {creator.niche}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1">
                  <Icon name="location" size={14} />
                  {creator.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(100%-40px,1000px)] gap-5 py-8 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-[min(100%-40px,1000px)]">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-pink-600">
            Support {creator.name}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Choose how you’d like to support
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Checkout previews only—no payment is sent or saved.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
              Monthly
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Become a member
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Support {creator.name} with a recurring monthly membership.
            </p>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              KSh 350 <span className="text-sm font-medium">/ month</span>
            </p>
            <button
              type="button"
              onClick={() => setTransaction(membership)}
              className="mt-5 min-h-11 w-full rounded-lg bg-pink-600 px-4 font-semibold text-white transition hover:bg-pink-700"
            >
              Join membership
            </button>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-amber-700">
              Send a gift
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Buy {creator.name} a drink
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Pick a one-time gift to show your appreciation.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {gifts.map((gift) => (
                <button
                  type="button"
                  key={gift.name}
                  onClick={() =>
                    setTransaction({
                      title: `Send ${creator.name} a ${gift.name.toLowerCase()}`,
                      description: `A one-time ${gift.name.toLowerCase()} gift for ${creator.name}.`,
                      amount: gift.amount,
                      showMessage: true,
                    })
                  }
                  className="rounded-lg border border-slate-200 px-2 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-pink-400 hover:bg-pink-50"
                >
                  <span className="block">{gift.name}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    KSh {gift.amount}
                  </span>
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
              Events
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Support an event
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Make a contribution toward a creator event and add an optional
              message.
            </p>
            <button
              type="button"
              onClick={() => setTransaction(eventSupport)}
              className="mt-5 min-h-11 rounded-lg border border-slate-300 px-4 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Contribute to an event
            </button>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
              Fan requests
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Request a shoutout
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Send a one-time shoutout request with a note for the creator.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-700">
              KSh 500 · one-time
            </p>
            <button
              type="button"
              onClick={() => setTransaction(shoutout)}
              className="mt-4 min-h-11 rounded-lg border border-slate-300 px-4 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Request shoutout
            </button>
          </article>
        </div>
      </section>

      {transaction && (
        <TransactionModal
          {...transaction}
          close={() => setTransaction(null)}
          creatorPhoto={creator.photo}
        />
      )}
    </main>
  );
}

export default CreatorDetails;
