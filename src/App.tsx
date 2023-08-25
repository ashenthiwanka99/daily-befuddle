import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Result from "./Pages/Result/Result";
import Navigation from "./Components/Navigation/Navigation";
import "./App.scss";
import Header from "./Components/Header/Header";

function App() {
  const handelSteamPage = () => {
    window.open(
      "https://store.steampowered.com/app/1756140/Befuddle_The_Bewitching_Puzzle_Party_Game/",
      "_blank"
    );
  };
  return (
    <div className="body">
      <div>
        <Header />
      </div>
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="footer">
        <div className="wishlist-text" onClick={handelSteamPage}>
          <div className="label">Wish list our Befuddle game on Steam</div>
          <i
            className="fab fa-steam"
            style={{ color: "white", marginLeft: "10px", fontSize: "20px" }}
          ></i>
        </div>
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
        </div>
      </div>
    </div>
  );
}
export default App;
