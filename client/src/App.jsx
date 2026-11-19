import { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";

export default function App() {
  const routeFromHash = () => {
    const route = window.location.hash.replace(/^#\/?/, "").split("#")[0];
    return ["discover", "profile", "dashboard"].includes(route) ? route : "home";
  };

  const [page, setPage] = useState(routeFromHash);

  useEffect(() => {
    const handleRouteChange = () => {
      setPage(routeFromHash());
      const section = window.location.hash.split("#")[2];
      if (section) {
        window.requestAnimationFrame(() =>
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: "smooth" }),
        );
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleRouteChange);
    handleRouteChange();
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  const go = (next) => {
    const hash = next === "home" ? "#/" : `#/${next}`;
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setPage(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setPage(next);
  };
  return (
    <div className="app min-h-screen">
      {page !== "dashboard" && <Header page={page} go={go} />}
      {page === "home" && <Home go={go} />}
      {page === "discover" && <Discover go={go} />}
      {page === "profile" && <Profile />}
      {page === "dashboard" && <Dashboard go={go} />}
    </div>
  );
}
