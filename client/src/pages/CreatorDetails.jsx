import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { followCreator, getCreator, unfollowCreator } from "../api/creators";
import CreatorShop from "../components/CreatorShop";
import ExclusiveChannel from "../components/ExclusiveChannel";
import Icon from "../components/Icon";
import TransactionModal from "../components/TransactionModal";

function CreatorDetails() {
  const { handle } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [profile, setProfile] = useState({
    handle: null,
    creator: null,
    error: "",
  });
  const [followPending, setFollowPending] = useState(false);
  const [followError, setFollowError] = useState("");
  const loading = profile.handle !== handle;
  const creator = loading ? null : profile.creator;
  const loadError = loading ? "" : profile.error;

  useEffect(() => {
    let active = true;
    getCreator(handle)
      .then((result) => {
        if (active) {
          setProfile({ handle, creator: result.creator, error: "" });
        }
      })
      .catch((requestError) => {
        if (active) {
          setProfile({
            handle,
            creator: null,
            error:
              requestError instanceof Error
                ? requestError.message
                : "Unable to load this creator.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [handle]);

  const toggleFollow = async () => {
    if (!creator?.canFollow) return;

    setFollowPending(true);
    setFollowError("");
    try {
      const result = creator.isFollowing
        ? await unfollowCreator(creator.username)
        : await followCreator(creator.username);
      setProfile((current) =>
        current.handle === handle && current.creator
          ? {
              ...current,
              creator: {
                ...current.creator,
                isFollowing: result.isFollowing,
                followerCount: result.followerCount,
              },
            }
          : current,
      );
    } catch (requestError) {
      setFollowError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update your following list.",
      );
    } finally {
      setFollowPending(false);
    }
  };

  if (loading) {
    return (
      <main
        className="mx-auto min-h-[70vh] w-[min(100%-40px,1000px)] animate-pulse py-12"
        role="status"
      >
        Loading creator profile...
      </main>
    );
  }

  if (!creator) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          {loadError || "Creator not found"}
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

  const niches = creator.niches || [];
  const stats = [
    ["Followers", creator.followerCount.toLocaleString()],
    ["Niches", niches.length ? niches.join(", ") : "Not listed"],
    ...(creator.location ? [["Location", creator.location]] : []),
  ];
  const gifts = [
    { name: "Tea", amount: 100 },
    { name: "Coffee", amount: 150 },
    { name: "Cappuccino", amount: 250 },
  ];
  const membership = {
    title: `Join ${creator.displayName}'s membership`,
    description:
      "Support this creator monthly and get access to their member community.",
    amount: 350,
    frequency: "monthly",
  };
  const eventSupport = {
    title: `Support ${creator.displayName}'s event`,
    description:
      "Choose a contribution to help this creator bring a community event to life.",
    amount: 500,
    amountOptions: [100, 250, 500, 1000, 2500],
    showMessage: true,
  };
  const shoutout = {
    title: `Request a shoutout from ${creator.displayName}`,
    description:
      "Send a one-time request and include an optional note for the creator.",
    amount: 500,
    showMessage: true,
  };

  return (
    <main className="min-h-screen bg-[var(--surface)] pb-16">
      <section className="relative isolate overflow-hidden bg-[var(--navy)] text-white">
        <img
          src={creator.profileImage}
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
              src={creator.profileImage}
              alt={`${creator.displayName}, creator profile`}
              className="h-32 w-32 rounded-2xl border-4 border-white/80 object-cover shadow-xl sm:h-40 sm:w-40"
            />
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-sky-200">
                Creator profile
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                {creator.displayName}
                {creator.isVerified && (
                  <span
                    className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 align-middle"
                    title="Verified creator"
                  >
                    <Icon name="check" size={15} />
                  </span>
                )}
              </h1>
              <p className="mt-2 text-white/75">@{creator.username}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {niches.map((niche) => (
                  <span
                    className="rounded-full bg-white/15 px-3 py-1"
                    key={niche}
                  >
                    {niche}
                  </span>
                ))}
                {creator.location && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1">
                    <Icon name="location" size={14} />
                    {creator.location}
                  </span>
                )}
              </div>
            </div>
            {creator.canFollow && (
              <button
                type="button"
                onClick={toggleFollow}
                disabled={followPending}
                className="min-h-11 rounded-lg bg-white px-5 font-semibold text-slate-900 transition hover:bg-sky-50 disabled:opacity-60"
              >
                {followPending
                  ? "Saving..."
                  : creator.isFollowing
                    ? "Following"
                    : "Follow creator"}
              </button>
            )}
          </div>
        </div>
      </section>

      {followError && (
        <p
          className="mx-auto mt-5 w-[min(100%-40px,1000px)] text-sm text-red-600"
          role="alert"
        >
          {followError}
        </p>
      )}

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

      <ExclusiveChannel
        key={creator.username}
        creator={creator}
        onJoinMembership={() => setTransaction(membership)}
      />

      <CreatorShop key={creator.username} creator={creator} />

      <section className="mx-auto w-[min(100%-40px,1000px)]">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-pink-600">
            Support {creator.displayName}
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
              Support {creator.displayName} with a recurring monthly membership.
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
              Buy {creator.displayName} a drink
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
                      title: `Send ${creator.displayName} a ${gift.name.toLowerCase()}`,
                      description: `A one-time ${gift.name.toLowerCase()} gift for ${creator.displayName}.`,
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
              Call for an event
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Get the creator to attend your event, eg. wedding, birthday, live
              performance, etc.
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
          creatorPhoto={creator.profileImage}
        />
      )}
    </main>
  );
}

export default CreatorDetails;
