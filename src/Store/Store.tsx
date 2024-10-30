import { createContext, useState } from "react";

export const InfoStore = createContext([] as any[]);
export const StatsStore = createContext([] as any[]);
export const ShareStroe = createContext([] as any[]);
export const GuessStatusStroe = createContext([] as any[]);
export const NavigationStatusStroe = createContext([] as any[]);

export default function Store({ children }: { children: any }) {
  const [infoStatus, setInfoStatus] = useState(false);
  const [stastStatus, setStatsStatus] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);
  const [guessStatusStroe, setGuessStatusStroe] = useState(false);
  const [navigationStatusStroe, setNavigationStatusStroe] = useState(false);

  return (
    <InfoStore.Provider value={[infoStatus, setInfoStatus]}>
      <StatsStore.Provider value={[stastStatus, setStatsStatus]}>
        <ShareStroe.Provider value={[shareStatus, setShareStatus]}>
        <GuessStatusStroe.Provider value={[guessStatusStroe, setGuessStatusStroe]}>
          <NavigationStatusStroe.Provider value={[navigationStatusStroe, setNavigationStatusStroe]}>
          {children}
         </NavigationStatusStroe.Provider>
        </GuessStatusStroe.Provider>
        </ShareStroe.Provider>
      </StatsStore.Provider>
    </InfoStore.Provider>
  );
}
