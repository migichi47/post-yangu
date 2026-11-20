import { useState } from "react";
import { LockKeyhole, MessageCircle, Send, X } from "lucide-react";

const initialMessages = [
  {
    id: "creator-welcome",
    sender: "creator",
    text: "Thanks for being part of the channel! What would you like to see next?",
    time: "Yesterday",
  },
  {
    id: "fan-reply",
    sender: "fan",
    text: "I would love to see more behind-the-scenes moments.",
    time: "9:42 AM",
  },
];

function SubscriberDirectMessages({ creator }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const currentSender = creator.canFollow ? "fan" : "creator";

  const handleSend = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        sender: currentSender,
        text,
        time: "Just now",
      },
    ]);
    setDraft("");
  };

  return (
    <>
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-violet-800">
            <MessageCircle size={21} />
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
            <LockKeyhole size={12} />
            Members
          </span>
        </div>
        <h4 className="mt-5 text-lg font-extrabold text-slate-950">
          Direct messages
        </h4>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          A private one-to-one conversation between {creator.displayName} and
          subscribed fans.
        </p>
        <div className="mt-4 rounded-xl bg-violet-50 p-3">
          <p className="text-xs leading-5 text-violet-950">
            <strong>{creator.displayName}:</strong> Thanks for being part of the
            channel!
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="mt-4 min-h-10 w-full rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-800 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
        >
          {creator.canFollow ? "Preview member messages" : "Preview creator inbox"}
        </button>
      </article>

      {dialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscriber-dm-title"
            className="my-auto flex max-h-[min(700px,90vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between gap-3 border-b border-slate-200 p-4 sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={creator.profileImage}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3
                    id="subscriber-dm-title"
                    className="truncate font-extrabold text-slate-950"
                  >
                    {creator.displayName}
                  </h3>
                  <p className="text-xs font-semibold text-violet-700">
                    Subscriber direct messages · preview
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                aria-label="Close direct messages"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </header>

            <p className="border-b border-violet-100 bg-violet-50 px-4 py-2.5 text-xs leading-5 text-violet-950 sm:px-5">
              Demo conversation only. Subscriber verification and message
              delivery are not connected.
            </p>

            <div
              className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 sm:p-5"
              aria-live="polite"
              aria-label="Conversation preview"
            >
              {messages.map((message) => {
                const isCurrentUser = message.sender === currentSender;
                const senderName =
                  message.sender === "creator"
                    ? creator.displayName
                    : creator.canFollow
                      ? "You"
                      : "Member";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        isCurrentUser
                          ? "rounded-br-sm bg-violet-700 text-white"
                          : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                      }`}
                    >
                      <p
                        className={`mb-1 text-[11px] font-bold ${
                          isCurrentUser ? "text-violet-100" : "text-violet-700"
                        }`}
                      >
                        {senderName}
                      </p>
                      <p className="text-sm leading-5">{message.text}</p>
                      <p
                        className={`mt-1 text-right text-[10px] ${
                          isCurrentUser ? "text-violet-200" : "text-slate-400"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              className="border-t border-slate-200 bg-white p-4 sm:p-5"
              onSubmit={handleSend}
            >
              <label className="sr-only" htmlFor="subscriber-dm-message">
                Write a message
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="subscriber-dm-message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  maxLength={500}
                  placeholder="Write a preview message..."
                  className="min-h-11 min-w-0 flex-1 rounded-full border border-slate-300 px-4 text-sm"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-violet-700 text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Add message to preview"
                >
                  <Send size={17} />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-500">
                Messages stay in this temporary preview and are not sent.
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default SubscriberDirectMessages;
