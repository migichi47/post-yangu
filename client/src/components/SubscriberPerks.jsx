import { useState } from "react";
import {
  CalendarDays,
  Camera,
  Clock3,
  LockKeyhole,
  MessageCircle,
  Play,
  Radio,
  Sparkles,
} from "lucide-react";
import SubscriberDirectMessages from "./SubscriberDirectMessages";

function SubscriberPerks({ creator, onJoinMembership }) {
  const [reminderPreviewed, setReminderPreviewed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const previewImage = creator.coverImage || creator.profileImage;

  return (
    <section
      className="mt-10"
      aria-labelledby="subscriber-experiences-title"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-pink-700">
            <Sparkles size={15} />
            Member experiences
          </p>
          <h3
            id="subscriber-experiences-title"
            className="mt-2 text-xl font-extrabold text-slate-950 sm:text-2xl"
          >
            More for the inner circle
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Early access, bonus episodes, behind-the-scenes posts, livestreams,
            and community chats.
          </p>
        </div>
        {creator.canFollow && (
          <button
            type="button"
            onClick={onJoinMembership}
            className="min-h-10 shrink-0 rounded-lg bg-pink-600 px-4 text-sm font-bold text-white transition hover:bg-pink-700"
          >
            Explore membership
          </button>
        )}
      </div>

      <p className="mb-4 rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 text-xs leading-5 text-pink-950">
        Preview only. Active-subscriber checks, livestreams, and real direct or
        group messaging are not connected yet.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-800">
              <Clock3 size={21} />
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
              <LockKeyhole size={12} />
              Members
            </span>
          </div>
          <h4 className="mt-5 text-lg font-extrabold text-slate-950">
            Early access
          </h4>
          <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
            Get a first look at selected work and new episodes before they
            appear on the public feed.
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-amber-800">
            Sample perk · 48 hours early
          </p>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-36 overflow-hidden bg-slate-900">
            <img
              src={previewImage}
              alt={`${creator.displayName} bonus episode preview`}
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800">
              <Play size={12} fill="currentColor" />
              Bonus episode
            </span>
            <span className="absolute bottom-3 right-3 rounded bg-slate-950/70 px-2 py-1 text-xs font-semibold text-white">
              08:42
            </span>
            <p className="absolute bottom-3 left-3 right-16 text-sm font-bold text-white">
              The extended cut
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-700">
              <LockKeyhole size={12} />
              Subscriber episode
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Extra footage and stories that didn’t make the main release.
            </p>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-36 overflow-hidden bg-slate-900">
            <img
              src={creator.profileImage}
              alt={`Behind-the-scenes preview with ${creator.displayName}`}
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800">
              <Camera size={13} />
              Behind the scenes
            </span>
            <p className="absolute bottom-3 left-3 right-3 text-sm font-bold text-white">
              Between the big moments
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-700">
              <LockKeyhole size={12} />
              Members-only posts
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Set notes, work-in-progress photos, and a peek at the process.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-950 to-blue-900 p-5 text-white shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
              <Radio size={21} />
            </span>
            <span className="rounded-full bg-rose-400/20 px-2.5 py-1 text-[11px] font-bold text-rose-100">
              Upcoming · sample
            </span>
          </div>
          <h4 className="mt-5 text-lg font-extrabold">Members livestream</h4>
          <p className="mt-2 text-sm leading-6 text-white/75">
            A live catch-up and Q&amp;A with {creator.displayName}.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-sky-100">
            <CalendarDays size={15} />
            Saturday · 6:00 PM EAT
          </div>
          <button
            type="button"
            onClick={() => setReminderPreviewed((current) => !current)}
            className="mt-5 min-h-10 w-full rounded-lg bg-white px-3 text-sm font-bold text-indigo-950 transition hover:bg-sky-100"
          >
            {reminderPreviewed ? "Reminder preview set" : "Preview reminder"}
          </button>
          {reminderPreviewed && (
            <p className="mt-2 text-center text-xs text-white/70">
              Demo only · no reminder was saved
            </p>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-blue-800">
                <MessageCircle size={14} />
                Community group chat
              </p>
              <h4 className="mt-2 text-lg font-extrabold text-slate-950">
                Talk with the inner circle
              </h4>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
              <LockKeyhole size={12} />
              Members
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            A private place for fans to share reactions, ask questions, and
            connect around {creator.displayName}’s work.
          </p>
          <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-600">
              <strong className="text-slate-800">A fan:</strong> That last
              behind-the-scenes post made my day!
            </p>
            <p className="text-xs text-slate-600">
              <strong className="text-slate-800">{creator.displayName}:</strong>{" "}
              So glad you enjoyed it!
            </p>
            {chatOpen && (
              <>
                <p className="border-t border-slate-200 pt-2 text-xs text-slate-600">
                  <strong className="text-slate-800">A fan:</strong> What are
                  you working on next?
                </p>
                <p className="text-xs text-slate-500">
                  Illustrative chat preview · no messages are sent
                </p>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setChatOpen((current) => !current)}
            className="mt-4 min-h-10 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            {chatOpen ? "Hide chat preview" : "Preview group chat"}
          </button>
        </article>

        <SubscriberDirectMessages creator={creator} />
      </div>
    </section>
  );
}

export default SubscriberPerks;
