import "./Header.scss";
import Logo from "../../Assets/Images/logo-2.png";
import NavIcon from "../../Assets/Images/Navicon.svg";
import React, { useContext } from "react";
import { NavigationStatusStroe } from "../../Store/Store";


export default function Header() {
  const [navigationStatus, setNavigationStatus] = useContext(NavigationStatusStroe);

  const NavigationStsChange = () => {
    setNavigationStatus(!navigationStatus)
  }
  const handleClickNavigation = () => {
    NavigationStsChange();
  };

  return (
    <div className="header">
      <div className="navigation" onClick={handleClickNavigation}>
       <img className="nav-icon" src={NavIcon} alt="NavIcon"></img>
      </div>
      <div>
        <img className="logo" src={Logo} alt="Logo"></img>
      </div>
      </div>
  );
}
