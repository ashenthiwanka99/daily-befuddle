import "./Header.scss";
import Logo from "../../Assets/Images/logo-1.png";

export default function Header() {
  return (
    <div className="header">
      <div className="div-left">
        <img className="logo" src={Logo} alt="Logo"></img>
      </div>
    </div>
  );
}
