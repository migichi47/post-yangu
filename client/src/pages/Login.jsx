import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

const Login = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await onSubmit({
        username: formData.identifier.trim(),
        password: formData.password,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
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

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-sky-100 flex items-center justify-center">
            <span className="text-2xl">👋</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>

          <p className="mt-2 text-slate-500">
            Sign in to continue building your creator business.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Username or email
            </label>

            <input
              id="identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              placeholder="Enter your username or email"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Create an account
          </Link>
        </p>

        <p className="mt-10 text-center text-xs text-slate-400">
          Your audience. Your value. Your income.
        </p>
      </div>
    </main>
  );
};

export default Login;
