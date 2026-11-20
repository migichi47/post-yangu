import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import AccountTypeSwitch from "../components/AccountTypeSwitch";

const creatorNiches = [
  "Travel & Adventure",
  "Lifestyle",
  "Fashion & Style",
  "Beauty & Skincare",
  "Food & Cooking",
  "Technology",
  "Gaming & Esports",
  "Comedy & Entertainment",
  "Education",
  "Fitness & Health",
  "Sports",
  "Music",
  "Dance",
  "Photography",
  "Film & Videography",
  "Business & Entrepreneurship",
  "Finance",
  "Motivation & Personal Development",
  "Parenting & Family",
  "Automotive",
  "Art & Design",
  "DIY & Crafts",
  "Culture & History",
  "News & Commentary",
  "Agriculture",
  "Real Estate",
  "Religion & Spirituality",
  "Other",
];

const Signup = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const accountType = searchParams.get("role") === "fan" ? "fan" : "creator";
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    displayName: "",
    profileImage: "",
    coverImage: "",
    niches: [],
    location: "",
    email: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectAccountType = (type) => {
    setSearchParams(type === "fan" ? { role: type } : {}, { replace: true });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNicheChange = (niche) => {
    setFormData((prev) => ({
      ...prev,
      niches: prev.niches.includes(niche)
        ? prev.niches.filter((item) => item !== niche)
        : [...prev.niches, niche],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await onSubmit(
        accountType === "fan"
          ? {
              fullName: formData.fullName.trim(),
              email: formData.email.trim(),
              password: formData.password,
            }
          : formData,
        accountType,
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>

        {/* Logo */}
        <Link to="/" className="flex justify-center mb-10">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            Post<span className="text-sky-500">Yangu</span>
          </span>
        </Link>

        <AccountTypeSwitch
          value={accountType}
          onChange={selectAccountType}
          disabled={loading}
        />

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-pink-100 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            {accountType === "fan" ? "Join as a fan" : "Become a creator"}
          </h1>

          <p className="mt-2 text-slate-500">
            {accountType === "fan"
              ? "Create an account to follow creators and support their work."
              : "Create your profile and start turning your audience into income."}
          </p>
        </div>

        {accountType === "fan" && (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <section>
              <h2 className="text-lg font-bold text-slate-900">
                Fan account details
              </h2>
              <p className="mb-5 mt-1 text-sm text-slate-500">
                All you need is your name, email and a password.
              </p>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="fan-full-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>
                  <input
                    id="fan-full-name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fan-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    id="fan-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fan-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="fan-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Use at least 8 characters.
                  </p>
                </div>
              </div>
            </section>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create fan account"}
              {!loading && <ArrowRight size={18} />}
            </button>

            <p className="text-center text-sm text-slate-500">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="font-semibold text-sky-600">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-semibold text-sky-600">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        )}

        {accountType === "creator" && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-7"
        >
          {/* Basic information */}
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              Basic information
            </h2>
            <p className="mt-1 mb-5 text-sm text-slate-500">
              Tell us how people will identify you on PostYangu.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Display name
                </label>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="e.g. Migichi vlogs"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. migichiii"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
                <p className="mt-1 text-xs text-slate-400">
                  This will be your unique PostYangu handle.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone number
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. 0712345678"
                  autoComplete="tel"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label
                  htmlFor="creator-location"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Location
                </label>
                <input
                  id="creator-location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City or region"
                  autoComplete="address-level2"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-slate-100" />

          {/* Password */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Secure your account
            </h2>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Use at least 8 characters.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          {/* Images */}
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              Profile appearance
            </h2>
            <p className="mt-1 mb-5 text-sm text-slate-500">
              A profile image is required to create your account. You can change
              it later; a cover image is optional.
            </p>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Profile image URL
                </label>
                <input
                  name="profileImage"
                  type="url"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Cover image URL{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  name="coverImage"
                  type="url"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-slate-100" />

          {/* Niches */}
          <section>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  What do you create?
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select all categories that describe your content.
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {formData.niches.length} selected
              </span>
            </div>

            <div className="relative mt-5">
              <details className="group">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                  <span>
                    {formData.niches.length
                      ? `${formData.niches.length} categories selected`
                      : "Select categories"}
                  </span>
                  <ChevronDown
                    size={18}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  {creatorNiches.map((niche) => (
                    <label
                      key={niche}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-sky-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.niches.includes(niche)}
                        onChange={() => handleNicheChange(niche)}
                        className="size-4 accent-sky-600"
                      />
                      <span>{niche}</span>
                    </label>
                  ))}
                </div>
              </details>
            </div>
          </section>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create creator account"}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-sm text-slate-500">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="font-semibold text-sky-600">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-semibold text-sky-600">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
        )}

        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to={`/login${accountType === "fan" ? "?role=fan" : ""}`}
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
