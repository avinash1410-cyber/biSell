// ResContext.js
import { createContext, useContext, useState } from "react";

const ResContext = createContext();

export function ResProvider({ children }) {
  const [res, setRes] = useState("");

  return (
    <ResContext.Provider value={{ res, setRes }}>
      {children}
    </ResContext.Provider>
  );
}

export function useRes() {
  return useContext(ResContext);
}