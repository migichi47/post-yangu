import { createContext, useContext } from "react";

export const RateCardVisibilityContext = createContext(null);

export function useRateCardVisibility() {
  const context = useContext(RateCardVisibilityContext);
  if (!context) {
    throw new Error(
      "useRateCardVisibility must be used within RateCardVisibilityProvider.",
    );
  }
  return context;
}
