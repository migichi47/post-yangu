import { useState } from "react";
import { RateCardVisibilityContext } from "./RateCardVisibilityContext";

const STORAGE_KEY = "postyangu.rateCardVisibility";

function getInitialVisibility() {
  try {
    return {
      isPublic: window.localStorage.getItem(STORAGE_KEY) !== "private",
      error: "",
    };
  } catch {
    return {
      isPublic: false,
      error:
        "Browser storage is unavailable. The rate card is private until this setting can be saved.",
    };
  }
}

export function RateCardVisibilityProvider({ children }) {
  const [visibility, setVisibility] = useState(getInitialVisibility);

  const updateVisibility = (isPublic) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        isPublic ? "public" : "private",
      );
      setVisibility({ isPublic, error: "" });
    } catch {
      setVisibility({
        isPublic,
        error:
          "This change could not be saved in browser storage and will only last until you leave the app.",
      });
    }
  };

  return (
    <RateCardVisibilityContext.Provider
      value={{
        isRateCardPublic: visibility.isPublic,
        updateRateCardVisibility: updateVisibility,
        visibilityError: visibility.error,
      }}
    >
      {children}
    </RateCardVisibilityContext.Provider>
  );
}
