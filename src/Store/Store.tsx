import { createContext, useState } from "react";

export const InfoStore = createContext([] as any[]);
export const StatsStore = createContext([] as any[]);

export default function Store({ children }: { children: any }) {
  const [infoStatus, setInfoStatus] = useState(false);
  const [stastStatus, setStatsStatus] = useState(false);

  return (
    <InfoStore.Provider value={[infoStatus, setInfoStatus]}>
      <StatsStore.Provider value={[stastStatus, setStatsStatus]}>
        {children}
      </StatsStore.Provider>
    </InfoStore.Provider>
  );
}
