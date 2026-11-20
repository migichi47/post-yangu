import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { getCurrentUser, logout as endSession, postAuth } from "./api/auth";
import { RateCardVisibilityProvider } from "./contexts/RateCardVisibilityProvider";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import CreatorDetails from "./pages/CreatorDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const creatorAccountTypes = ["creator"];
const authenticatedAccountTypes = ["creator", "fan"];

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section");
    if (section) {
      window.requestAnimationFrame(() =>
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: "smooth" }),
      );
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
  return null;
}

function RequireAuth({
  children,
  allowedAccountTypes = creatorAccountTypes,
}) {
  const location = useLocation();
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((currentUser) => {
        if (active) {
          setStatus(
            currentUser && allowedAccountTypes.includes(currentUser.accountType)
              ? "authenticated"
              : "unauthenticated",
          );
        }
      })
      .catch((authError) => {
        if (active) {
          setError(
            authError instanceof Error
              ? authError.message
              : "Unable to verify your session.",
          );
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [allowedAccountTypes]);

  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center text-slate-600">
        Checking your session...
      </main>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (status === "error") {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-5 text-center text-red-600"
        role="alert"
      >
        {error}
      </main>
    );
  }

  return children;
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const go = (page) => navigate(`/${page === "home" ? "" : page}`);
  const continueAfterAuth = (accountType) => {
    const requestedPath = location.state?.from?.pathname;
    if (accountType === "fan") {
      navigate(
        requestedPath?.startsWith("/creators/")
          ? requestedPath
          : "/discover",
        { replace: true },
      );
      return;
    }

    navigate(
      requestedPath === "/profile" || requestedPath?.startsWith("/dashboard")
        ? requestedPath
        : "/dashboard",
      { replace: true },
    );
  };
  const login = async (data, accountType) => {
    await postAuth(accountType === "fan" ? "fan/login" : "login", data);
    continueAfterAuth(accountType);
  };
  const signup = async (data, accountType) => {
    await postAuth(accountType === "fan" ? "fan/signup" : "signup", data);
    continueAfterAuth(accountType);
  };
  const logout = async () => {
    await endSession();
    navigate("/", { replace: true });
  };

  return (
    <>
      <RouteEffects />
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={
            <div className="app">
              <Header go={go} />
              <Home go={go} />
            </div>
          }
        />
        <Route
          path="/discover"
          element={
            <RequireAuth allowedAccountTypes={authenticatedAccountTypes}>
              <div className="app">
                <Header go={go} />
                <Discover go={go} />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/creators/:handle"
          element={
            <RequireAuth allowedAccountTypes={authenticatedAccountTypes}>
              <div className="app">
                <Header go={go} />
                <CreatorDetails />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <div className="app">
                <Header go={go} />
                <Profile />
              </div>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login onSubmit={login} />} />
        <Route path="/signup" element={<Signup onSubmit={signup} />} />
        <Route
          path="/dashboard/:section?"
          element={
            <RequireAuth>
              <Dashboard go={go} onLogout={logout} />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <RateCardVisibilityProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RateCardVisibilityProvider>
  );
}
