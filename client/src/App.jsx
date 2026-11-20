import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { getCurrentUser, postAuth } from "./api/auth";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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

function RequireAuth({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((creator) => {
        if (active) {
          setStatus(creator ? "authenticated" : "unauthenticated");
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
  }, []);

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
  const continueAfterAuth = () => {
    const requestedPath = location.state?.from?.pathname;
    navigate(
      requestedPath === "/profile" ? "/profile" : "/dashboard",
      { replace: true },
    );
  };
  const login = async (data) => {
    await postAuth("login", data);
    continueAfterAuth();
  };
  const signup = async (data) => {
    await postAuth("signup", data);
    continueAfterAuth();
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
            <div className="app">
              <Header go={go} />
              <Discover go={go} />
            </div>
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
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard go={go} />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
