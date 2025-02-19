"use client";

import { Series, Subset } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

interface PocketBinderContextType {
  selectedSeries: Series | null;
  setSelectedSeries: (series: Series | null) => void;
  selectedSubset: Subset | null;
  setSelectedSubset: (subset: Subset) => void;
}

const PocketBinderContext = createContext<PocketBinderContextType | undefined>(
  undefined
);

export function PocketBinderProvider({ children }: { children: ReactNode }) {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedSubset, setSelectedSubset] = useState<Subset | null>(null);

  return (
    <PocketBinderContext.Provider
      value={{
        selectedSeries,
        setSelectedSeries,
        selectedSubset,
        setSelectedSubset,
      }}
    >
      {children}
    </PocketBinderContext.Provider>
  );
}

export function usePocketBinderContext() {
  const context = useContext(PocketBinderContext);
  if (!context) {
    throw new Error(
      "usePocketBinder must be used within a PocketBinderProvider"
    );
  }
  return context;
}
