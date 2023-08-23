import "./Navigation.css";
import { useContext } from "react";
import Logo from "../../Assets/Images/logo-temp.png";
import Info from "../../Assets/Images/info-icon.png";
import Stats from "../../Assets/Images/stats-icon.png";
import SnapFinger from "../../Assets/Images/snap-fingerclick-icon.png";
import { InfoStore, StatsStore } from "../../Store/Store";

export default function Navigation() {
  const [InfoStatus, setInfoStatus] = useContext(InfoStore);
  const [stastStatus, setStatsStatus] = useContext(StatsStore);

  const InfoStsChange = () => {
    setInfoStatus(!InfoStatus);
  };

  const StatsStsChange = () => {
    setStatsStatus(!stastStatus);
  };
  return (
    <div className="header">
      <div className="div-left">
        <img className="logo" src={Logo} alt="Logo"></img>
      </div>

      <div className="div-right">
        <div className="div-info" onClick={InfoStsChange}>
          <img className="logo" src={Info} alt="Logo"></img>
        </div>
        <div className="div-stats" onClick={StatsStsChange}>
          <img className="logo" src={Stats} alt="Logo"></img>
        </div>
        <div className="div-snapfingerclick">
          <a
            href="https://snapfingerclick.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="logo" src={SnapFinger} alt="Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
