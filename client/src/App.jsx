import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";

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

function AppRoutes() {
  const navigate = useNavigate();
  const go = (page) => navigate(`/${page === "home" ? "" : page}`);

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
            <div className="app">
              <Header go={go} />
              <Profile />
            </div>
          }
        />
        <Route path="/dashboard" element={<Dashboard go={go} />} />
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
