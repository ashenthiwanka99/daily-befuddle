import React from "react";
import "./Navigation.scss";
import { useContext } from "react";
import Info from "../../Assets/Images/information.png";
import Stats from "../../Assets/Images/stats.png";
import SnapFinger from "../../Assets/Images/snap-link.png";
import Guesses from "../../Assets/Images/Guesses.svg";
import { InfoStore, StatsStore, GuessStatusStroe } from "../../Store/Store";

export default function Navigation() {
  const [InfoStatus, setInfoStatus] = useContext(InfoStore);
  const [stastStatus, setStatsStatus] = useContext(StatsStore);
  const [guessStatus, setGuessStatus] = useContext(GuessStatusStroe);

  const InfoStsChange = () => {
    setInfoStatus(!InfoStatus);
  };

  const StatsStsChange = () => {
    setStatsStatus(!stastStatus);
  };

  const GuessStsChange = () => {
    setGuessStatus(!guessStatus);
  };


  const handleSnapFinger = () => {
    window.open("https://snapfingerclick.com/", "_blank");
  };

  const handleClickInfo = () => {
    InfoStsChange()   
  };
  
  const handleClickStats = () => {
    StatsStsChange()
  };

  const handleClickGuesses = () => {
    GuessStsChange()
  };
  
  return (
    <>
    <div className="btn-area left-area">
      <div className="div-info div-btn Info" onClick={handleClickInfo}>
        <div className="lable">Info</div>
        <img className="icon info" src={Info} alt="Logo"></img>
      </div>
      <div className="div-stats div-btn stats" onClick={handleClickStats}>
        <div className="lable">Stats</div>
        <img className="icon stats" src={Stats} alt="Logo"></img>
      </div>
      {/* <div className="div-stats div-btn stats" onClick={handleClickGuesses}>
        <div className="lable">Gueses</div>
        <img className="icon stats" src={Guesses} alt="Logo"></img>
      </div> */}
      {/* <div className="div-snapfingerclick div-btn snap" onClick={handleSnapFinger}>
        <div className="lable">Snap Finger Click</div>
        <img className="icon snap" src={SnapFinger} alt="Logo" />
      </div> */}
    </div>
    <div className="btn-area right-area">
    <div className="div-stats div-btn stats" onClick={handleClickGuesses}>
      <div className="lable">Gueses</div>
      <img className="icon stats" src={Guesses} alt="Logo"></img>
    </div>
    {/* <div className="div-snapfingerclick div-btn snap" onClick={handleSnapFinger}>
      <div className="lable">Snap Finger Click</div>
      <img className="icon snap" src={SnapFinger} alt="Logo" />
    </div> */}
  </div>
  </>
  );
}
