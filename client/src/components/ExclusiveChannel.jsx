import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  LockKeyhole,
  Play,
  Plus,
  Send,
  Sparkles,
  Video,
  X,
} from "lucide-react";

const filters = [
  { id: "all", label: "All posts" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
  { id: "text", label: "Notes" },
];

function createPreviewPosts(creator) {
  const creatorName = creator.displayName;
  const coverImage = creator.coverImage || creator.profileImage;

  return [
    {
      id: "preview-photo",
      type: "photo",
      title: "A little moment from today",
      body: `A quiet behind-the-scenes moment I wanted to share with the ${creatorName} community. More photos are waiting inside.`,
      coverImage,
      time: "2 hours ago",
    },
    {
      id: "preview-video",
      type: "video",
      title: "Come behind the scenes with me",
      body: "A short preview from the latest shoot, with the full story for members.",
      coverImage: creator.profileImage,
      duration: "03:24",
      time: "Yesterday",
    },
    {
      id: "preview-note",
      type: "text",
      title: "A note for the community",
      body: `Thank you for being part of this space. I’m sharing more of the process, little wins, and things that don’t make it into the main feed here.`,
      time: "3 days ago",
    },
  ];
}

function PostTypeIcon({ type, size = 14 }) {
  if (type === "photo") return <ImageIcon size={size} />;
  if (type === "video") return <Video size={size} />;
  return <FileText size={size} />;
}

function ExclusivePostCard({ creator, post, onJoinMembership }) {
  const isTextPost = post.type === "text";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      {isTextPost ? (
        <div className="relative flex min-h-48 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-fuchsia-800 p-5 text-white">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-white/15" />
          <div className="absolute -right-3 -top-5 h-28 w-28 rounded-full border border-white/15" />
          <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
            <FileText size={14} />
            Private note
          </span>
          <p className="relative mt-8 line-clamp-3 text-lg font-semibold leading-7">
            “{post.body}”
          </p>
        </div>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          {post.type === "video" && post.mediaUrl ? (
            <video
              className="h-full w-full object-cover"
              src={post.mediaUrl}
              muted
              playsInline
              preload="metadata"
              aria-label={`Video preview: ${post.title}`}
            />
          ) : (
            <img
              className="h-full w-full object-cover"
              src={post.mediaUrl || post.coverImage || creator.profileImage}
              alt={`${post.type === "video" ? "Video" : "Photo"} preview: ${post.title}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/5 to-slate-950/20" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <PostTypeIcon type={post.type} />
            {post.type === "video" ? "Video" : "Photo"}
          </span>
          {post.type === "video" && (
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg">
              <Play size={19} fill="currentColor" />
            </span>
          )}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
            <h3 className="line-clamp-2 text-lg font-bold leading-6">
              {post.title}
            </h3>
            {post.duration && (
              <span className="shrink-0 rounded bg-slate-950/70 px-2 py-1 text-xs font-semibold">
                {post.duration}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-5">
        {isTextPost && (
          <h3 className="text-lg font-bold text-slate-900">{post.title}</h3>
        )}
        {!isTextPost && (
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
            {post.body}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={creator.profileImage}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-800">
                {creator.displayName}
              </p>
              <p className="text-xs text-slate-500">{post.time}</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-pink-50 px-2.5 py-1.5 text-[11px] font-bold text-pink-700">
            <LockKeyhole size={12} />
            Members
          </span>
        </div>
        {creator.canFollow && (
          <button
            type="button"
            onClick={onJoinMembership}
            className="mt-4 min-h-10 w-full rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-800 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700"
          >
            Preview membership options
          </button>
        )}
      </div>
    </article>
  );
}

function ExclusiveChannel({ creator, onJoinMembership }) {
  const [posts, setPosts] = useState(() => createPreviewPosts(creator));
  const [activeFilter, setActiveFilter] = useState("all");
  const [composerOpen, setComposerOpen] = useState(false);
  const [postType, setPostType] = useState("photo");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [draftMedia, setDraftMedia] = useState(null);
  const objectUrls = useRef(new Set());

  useEffect(
    () => () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const visiblePosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.type === activeFilter);

  const handleMediaChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const type = file.type.startsWith("video/") ? "video" : "photo";
    const url = URL.createObjectURL(file);
    objectUrls.current.add(url);
    setPostType(type);
    setDraftMedia({ type, url, name: file.name });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPosts((current) => [
      {
        id: `local-${Date.now()}`,
        type: postType,
        title: title.trim(),
        body: body.trim(),
        coverImage: creator.coverImage || creator.profileImage,
        mediaUrl: draftMedia?.url,
        time: "Just now",
      },
      ...current,
    ]);
    setActiveFilter("all");
    setTitle("");
    setBody("");
    setDraftMedia(null);
    setComposerOpen(false);
  };

  return (
    <section
      className="mx-auto w-[min(100%-40px,1000px)] py-5 sm:py-8"
      aria-labelledby="exclusive-channel-title"
    >
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-pink-50 p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-pink-700">
              <Sparkles size={15} />
              The private channel
            </p>
            <h2
              id="exclusive-channel-title"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
            >
              A little closer to {creator.displayName}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Exclusive photos, video moments, and personal notes shared with
              the community.
            </p>
          </div>
          {!creator.canFollow && (
            <button
              type="button"
              onClick={() => setComposerOpen(true)}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 font-bold text-white transition hover:bg-slate-700"
            >
              <Plus size={17} />
              Create a post
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/75 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-pink-100 text-pink-700">
              <LockKeyhole size={17} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                A preview of the members’ feed
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Sample posts only. Publishing, subscriptions, and content access
                are not connected yet.
              </p>
            </div>
          </div>
          {creator.canFollow ? (
            <button
              type="button"
              onClick={onJoinMembership}
              className="min-h-10 shrink-0 rounded-lg bg-pink-600 px-4 text-sm font-bold text-white transition hover:bg-pink-700"
            >
              Explore membership
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <LockKeyhole size={13} />
              Subscriber-only previews
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filter channel posts">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`min-h-10 rounded-full px-4 text-sm font-bold transition ${
                activeFilter === filter.id
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          {posts.length} {posts.length === 1 ? "preview" : "previews"}
        </p>
      </div>

      {visiblePosts.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <ExclusivePostCard
              key={post.id}
              creator={creator}
              post={post}
              onJoinMembership={onJoinMembership}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-bold text-slate-800">No posts in this category yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Try another filter to see more channel previews.
          </p>
        </div>
      )}

      {composerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="channel-composer-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-pink-700">
                  Creator studio · preview
                </p>
                <h3
                  id="channel-composer-title"
                  className="mt-1 text-xl font-extrabold text-slate-950"
                >
                  Create a channel post
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                aria-label="Close post composer"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
              This creates a temporary local preview only. It will not upload or
              save content.
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold text-slate-700">
                Post type
                <select
                  value={postType}
                  onChange={(event) => {
                    setPostType(event.target.value);
                    if (event.target.value === "text") setDraftMedia(null);
                  }}
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
                >
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                  <option value="text">Text note</option>
                </select>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Title
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={100}
                  required
                  placeholder="Give your post a title"
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Message
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  maxLength={500}
                  required
                  rows={4}
                  placeholder="Write a note for your subscribers..."
                  className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 p-3 text-sm"
                />
              </label>

              {postType !== "text" && (
                <label className="block text-sm font-semibold text-slate-700">
                  Add a {postType === "video" ? "video" : "photo"} preview
                  <input
                    type="file"
                    accept={postType === "video" ? "video/*" : "image/*"}
                    onChange={handleMediaChange}
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold"
                  />
                </label>
              )}

              {draftMedia && (
                <p className="truncate rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  Preview selected: {draftMedia.name}
                </p>
              )}

              <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 text-sm font-bold text-white hover:bg-pink-700"
                >
                  <Send size={15} />
                  Add preview
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}

export default ExclusiveChannel;
