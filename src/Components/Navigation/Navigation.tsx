import React from "react";
import "./Navigation.scss";
import { useContext } from "react";
import Info from "../../Assets/Images/information.png";
import Stats from "../../Assets/Images/stats.png";
import SnapFinger from "../../Assets/Images/snap-link.png";
import Guesses from "../../Assets/Images/Guesses.svg";
import Close from "../../Assets/Images/Close.svg";

import { InfoStore, StatsStore, GuessStatusStroe, NavigationStatusStroe } from "../../Store/Store";
import { useCookies } from "react-cookie";

export default function Navigation() {
  const [InfoStatus, setInfoStatus] = useContext(InfoStore);
  const [stastStatus, setStatsStatus] = useContext(StatsStore);
  const [guessStatus, setGuessStatus] = useContext(GuessStatusStroe);
  const [navigationStatus, setNavigationStatus] = useContext(NavigationStatusStroe);
  const [cookiesGameStatus, setCookieGameStatus, removeCookieGameStatus] = useCookies(["GameStatus"]);

  const InfoStsChange = () => {
    setInfoStatus(!InfoStatus);
    setNavigationStatus(!navigationStatus)
  };

  const StatsStsChange = () => {
    setStatsStatus(!stastStatus);
    setNavigationStatus(!navigationStatus)
  };

  const GuessStsChange = () => {
    setGuessStatus(!guessStatus);
    setNavigationStatus(!navigationStatus)
  };

  const NavigationStsChange = () => {
    setNavigationStatus(!navigationStatus)
  }
 
  const handleSnapFinger = () => {
    window.open("https://snapfingerclick.com/", "_blank");
  };

  const handleClickInfo = () => {
    InfoStsChange();
  };

  const handleClickStats = () => {
    StatsStsChange();
  };

  const handleClickGuesses = () => {
    GuessStsChange();
  };

  const handleClickNavigation = () => {
    NavigationStsChange();
  };

  return (
    <>
      <div className="btn-area desktop-btn">
        <div className="div-info div-btn Info" onClick={handleClickInfo}>
          <div className="lable">Info</div>
          <img className="icon info" src={Info} alt="Logo"></img>
        </div>
        <div className="div-stats div-btn stats" onClick={handleClickStats}>
          <div className="lable">Stats</div>
          <img className="icon stats" src={Stats} alt="Logo"></img>
        </div>
      </div>
      <div className={`side-canvas btn-area mobile-btn ${navigationStatus ? "mobile-btn-active" : ""}`}>
        <div className="side-canvas-header">
          <img src={Close} alt="CLose" className="img-close-nav" onClick={handleClickNavigation}></img>
        </div>
        <div className="side-canvas-container">
          <div className="opt-btns-area">
            <div className="div-info div-btn Info" onClick={handleClickInfo}>
              <div className="lable">Info</div>
              <img className="icon info" src={Info} alt="Logo"></img>
            </div>
            <div className="div-stats div-btn stats" onClick={handleClickStats}>
              <div className="lable">Stats</div>
              <img className="icon stats" src={Stats} alt="Logo"></img>
            </div>
            {cookiesGameStatus.GameStatus === "Ended"? <></> : 
              <div className="div-stats div-btn stats" onClick={handleClickGuesses}>
               <div className="lable">Guesses</div>
               <img className="icon stats" src={Guesses} alt="Logo"></img>
              </div>
            }  
          </div>
        </div>
      </div> 
    </>
  );
}

