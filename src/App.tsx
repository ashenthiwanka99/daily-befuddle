import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Result from "./Pages/Result/Result";
import Navigation from "./Components/Navigation/Navigation";
import "./App.scss";
import Header from "./Components/Header/Header";
import { useCookies } from "react-cookie";
import { Fragment } from "react";
import { UTCNoExpireTime } from "./HelperMethods/HelperMethods";
import SnapLogo from "../src/Assets/Images/snapfinger-logo.png";


function App() {
  const [cookiesDailyWin, setCookieDailyWin ,removeCookieDailyWin] = useCookies(["DailyWin"]);
  const [cookiesAgreed, setCookieAgreed ,removeCookieAgreed] = useCookies(["CookiesAgreed"]);

  const handelSteamPage = () => {
    window.open(
      "https://store.steampowered.com/app/1756140/Befuddle_The_Bewitching_Puzzle_Party_Game/",
      "_blank"
    );
  };

  const handleCookieAgree = () =>{
    setCookieAgreed("CookiesAgreed" , false , { path: '/',  expires : UTCNoExpireTime()});  
  }

  return (
    <div className="body">
      {cookiesDailyWin.DailyWin?
        <div className="confettis">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div> 
        :  
        <Fragment />}
     
      <>
        <Header />
      </>
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </div>
      
      <div className="footer">
        {cookiesAgreed.CookiesAgreed === undefined ?
          <section className="cookie">
          <div className="txt">
            <p className="">
              By using Daily Befuddle,<br />
              you agree to our <a href="https://snapfingerclick.com/policies.html" target="_blank" rel="noreferrer">Cookie Policy</a>.
            </p>
            <button className="button primary-btn" onClick={handleCookieAgree}>Accept!</button>
          </div>
          </section>
          :
          <Fragment />}
     
        {/* <div className="wishlist-text" onClick={handelSteamPage}>
          <div className="label">Wish list our Befuddle game on Steam</div>
          <i
            className="fab fa-steam"
            style={{ color: "white", marginLeft: "10px", fontSize: "20px" }}
          ></i>
        </div> */}
        <div className="div-social">
              <a className="link-social twitch" href="https://www.twitch.tv/snapfingerclick" target="_blank" rel="noreferrer">
                <i className="fab fa-twitch"></i>
              </a>

              <a className="link-social twitter" href="https://www.twitter.com/snapfingerclick" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </a>

              <a className="link-social linkedin" href="https://www.linkedin.com/company/snap-finger-click/" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin" aria-hidden="true"></i>
              </a>

              <a className="link-social discord" href="https://www.discord.gg/snapfingerclick" target="_blank" rel="noreferrer">
                <i className='fab fa-discord'></i>
              </a>

              <a className="link-social instagram" href="https://www.instagram.com/snapfingerclick" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>

              <a className="link-social facebook" href="https://www.facebook.com/snapfingerclick" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="SnapLogo" href="https://www.snapfingerclick.com/" target="_blank" rel="noreferrer">
              <img className="SnapLogo" src={SnapLogo} alt="SnapLogo"></img>

              </a>
        </div>
      </div>
    </div>
  );
}
export default App;
