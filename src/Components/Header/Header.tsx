import "./Header.scss";
import Logo from "../../Assets/Images/logo-2.png";
import Banner from "../../Assets/Images/upsellBanner.gif";

export default function Header() {

  const handelSteamPage = () => {
    window.open(
      "https://store.steampowered.com/app/1756140/Befuddle_The_Bewitching_Puzzle_Party_Game/",
      "_blank"
    );
  };

  return (
    <div className="header">
      <div className="div-left">
        <img className="logo" src={Logo} alt="Logo"></img>
      </div>
      <div className="div-right" onClick={handelSteamPage}>
        <img className="banner" src={Banner} alt="Banner"></img>
      </div>
    </div>
  );
}
