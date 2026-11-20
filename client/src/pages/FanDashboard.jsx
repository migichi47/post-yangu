import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import {
  followCreator,
  getCreators,
  getFollowing,
  unfollowCreator,
} from "../api/creators";
import CreatorCard from "../components/CreatorCard";

const sections = [
  ["home", "Home"],
  ["following", "Following"],
  ["memberships", "Memberships"],
  ["purchases", "Purchases"],
  ["profile", "Fan profile"],
  ["notifications", "Notifications"],
];

function FanDashboard({ onLogout }) {
  const { section } = useParams();
  const navigate = useNavigate();
  const activeSection = sections.some(([id]) => id === section)
    ? section || "home"
    : "home";
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingUsername, setPendingUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([getCurrentUser(), getFollowing(), getCreators({ limit: 6 })])
      .then(([currentUser, followingResult, creatorResult]) => {
        if (!currentUser) {
          throw new Error("Your session has expired. Please sign in again.");
        }

        if (active) {
          setUser(currentUser.user);
          setFollowing(followingResult.creators);
          const followingNames = new Set(
            followingResult.creators.map((creator) => creator.username),
          );
          setRecommendations(
            creatorResult.creators.filter(
              (creator) => !followingNames.has(creator.username),
            ),
          );
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load your fan dashboard.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const toggleFollow = async (creator) => {
    setPendingUsername(creator.username);
    setError("");
    try {
      if (creator.isFollowing) {
        await unfollowCreator(creator.username);
        setFollowing((current) =>
          current.filter((item) => item.username !== creator.username),
        );
        setRecommendations((current) =>
          current.some((item) => item.username === creator.username)
            ? current.map((item) =>
                item.username === creator.username
                  ? { ...item, isFollowing: false }
                  : item,
              )
            : current,
        );
      } else {
        const result = await followCreator(creator.username);
        const followedCreator = {
          ...creator,
          isFollowing: result.isFollowing,
          followerCount: result.followerCount,
        };
        setFollowing((current) => [
          followedCreator,
          ...current.filter((item) => item.username !== creator.username),
        ]);
        setRecommendations((current) =>
          current.filter((item) => item.username !== creator.username),
        );
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update your following list.",
      );
    } finally {
      setPendingUsername("");
    }
  };

  const goTo = (destination) => {
    navigate(
      destination === "home"
        ? "/fan/dashboard"
        : `/fan/dashboard/${destination}`,
    );
  };

  const emptyState = (title, description) => (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[var(--surface)] pb-16">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-[min(100%-32px,1120px)] items-center justify-between gap-4 py-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Fan space
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              {user ? `Welcome, ${user.fullName}` : "Your fan dashboard"}
            </h1>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto w-[min(100%-32px,1120px)] py-6">
        <nav
          className="mb-7 flex gap-2 overflow-x-auto border-b border-slate-200"
          aria-label="Fan dashboard sections"
        >
          {sections.map(([id, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => goTo(id)}
              aria-current={activeSection === id ? "page" : undefined}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold ${
                activeSection === id
                  ? "border-pink-600 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {error && (
          <p
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {loading ? (
          <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
        ) : (
          <>
            {activeSection === "home" && (
              <div className="space-y-8">
                <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
                    Your community
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Follow creators to build your feed
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    You’re following {following.length}{" "}
                    {following.length === 1 ? "creator" : "creators"}. New
                    creator posts and subscriber updates will appear here when
                    publishing is available.
                  </p>
                  <Link
                    to="/discover"
                    className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white no-underline hover:bg-blue-900"
                  >
                    Discover creators
                  </Link>
                </section>
                <section>
                  <div className="mb-4 flex items-end justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Creators you may like
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Recommendations from the creator directory
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goTo("following")}
                      className="text-sm font-semibold text-blue-800 hover:text-blue-950"
                    >
                      View following
                    </button>
                  </div>
                  {recommendations.length ? (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {recommendations.map((creator) => (
                        <CreatorCard
                          key={creator._id}
                          creator={creator}
                          onView={() =>
                            navigate(`/creators/${creator.username}`)
                          }
                          onFollow={() => toggleFollow(creator)}
                          followPending={
                            pendingUsername === creator.username
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    emptyState(
                      "No recommendations yet",
                      "New creators will appear here as they join PostYangu.",
                    )
                  )}
                </section>
              </div>
            )}

            {activeSection === "following" &&
              (following.length ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {following.map((creator) => (
                    <CreatorCard
                      key={creator._id}
                      creator={creator}
                      onView={() =>
                        navigate(`/creators/${creator.username}`)
                      }
                      onFollow={() => toggleFollow(creator)}
                      followPending={pendingUsername === creator.username}
                    />
                  ))}
                </div>
              ) : (
                emptyState(
                  "You’re not following any creators yet",
                  "Explore the directory and follow creators to keep their profiles close.",
                )
              ))}

            {activeSection === "memberships" &&
              emptyState(
                "No memberships yet",
                "Your active and past creator memberships will appear here when subscription billing is connected.",
              )}
            {activeSection === "purchases" &&
              emptyState(
                "No purchases yet",
                "Your receipts and purchase history will appear here after verified payment processing is connected.",
              )}
            {activeSection === "profile" && (
              <section className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Fan profile</h2>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-slate-900">
                      {user?.fullName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-slate-900">
                      {user?.email}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm text-slate-500">
                  Profile editing and notification preferences will be added
                  with the fan profile API.
                </p>
              </section>
            )}
            {activeSection === "notifications" &&
              emptyState(
                "You’re all caught up",
                "Creator post and membership notifications will appear here when publishing and notification services are connected.",
              )}
          </>
        )}
      </div>
    </main>
  );
}

export default FanDashboard;
