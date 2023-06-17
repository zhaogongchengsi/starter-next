import React, { useEffect, useState } from "react";
import { ModeContext } from "../contexts/mode";

export interface ModeProps {
  children: React.ReactNode;
}

const AppMode: React.FC<ModeProps> = ({ children }) => {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    "use client";
    if (!document.body.classList.contains("dark")) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [mode]);
  return (
    <>
      <ModeContext.Provider value={[mode, setMode]}>{children}</ModeContext.Provider>
    </>
  );
};

export default AppMode;
