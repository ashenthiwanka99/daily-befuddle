import "./Result.scss";
import { useCookies } from "react-cookie";
import { useState, useEffect, Fragment, useContext } from "react";
import {
  DecryptOT,
  UTCExpireTime,
  UTCNoExpireTime,
} from "../../HelperMethods/HelperMethods";
import Navigation from "../../Components/Navigation/Navigation";
import SideImage from "../../Components/GirlImage/Image";
import { InfoStore, StatsStore } from "../../Store/Store";
import { ModalShare } from "../../Components/Share/Share";
import { ModalInfo } from "../../Components/Info/Info";
import { ModalStats } from "../../Components/Stats/Stats";
import { useNavigate } from "react-router-dom";
import Banner from "../../Assets/Images/upsellBanner.gif";

export default function Result() {
  let dataIndex = 0;
  const structure = [2, 2, 1];
  const navigate = useNavigate();
  const [decryptOT, setDecryptOT] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [infoStatus, setInfoStatus] = useContext(InfoStore);
  const [statsStatus, setStatsStatus] = useContext(StatsStore);
  const [cookiesOT, setCookieOT, removeCookieOT] = useCookies([
    "OriginalTitle",
  ]);
  const [cookiesGuessArray, setCookieGuessArray, removeCookieGuessArray] =
    useCookies(["GuessArray"]);
  const [cookiesDailyWin, setCookieDailyWin, removeCookieDailyWin] = useCookies(
    ["DailyWin"]
  );
  const [cookiesTotalGames, setCookieTotalGames, removeCookieTotalGames] =
    useCookies(["TotalGames"]);
  const [cookiesMaxStreak, setCookieMaxStreak, removeCookieMaxStreak] =
    useCookies(["MaxStreak"]);
  const [
    cookiesCurrentStreak,
    setCookieCurrentStreak,
    removeCookieCurrentStreak,
  ] = useCookies(["CurrentStreak"]);
  const [cookiesGameStatus, setCookieGameStatus, removeCookieGameStatus] =
    useCookies(["GameStatus"]);

  const handelSteamPage = () => {
    window.open(
      "https://store.steampowered.com/app/1756140/Befuddle_The_Bewitching_Puzzle_Party_Game/",
      "_blank"
    );
  };
  const openModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (
      cookiesGameStatus.GameStatus === undefined ||
      cookiesDailyWin.DailyWin === undefined
    ) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (cookiesGuessArray.GuessArray === undefined) {
      navigate("/");
    }
    if (
      cookiesOT.OriginalTitle !== undefined &&
      cookiesGuessArray !== undefined
    ) {
      setDecryptOT(DecryptOT(cookiesOT.OriginalTitle));
    }

    if (!cookiesDailyWin.DailyWin) {
      setCookieCurrentStreak(
        "CurrentStreak",
        cookiesCurrentStreak.CurrentStreak === undefined ? 0 : 0,
        { path: "/", expires: UTCNoExpireTime() }
      );
    }
    if (cookiesMaxStreak.MaxStreak < cookiesCurrentStreak.CurrentStreak) {
      setCookieMaxStreak("MaxStreak", cookiesCurrentStreak.CurrentStreak, {
        path: "/",
        expires: UTCNoExpireTime(),
      });
    }

    if (
      cookiesGuessArray.GuessArray.length < 5 &&
      cookiesGuessArray.GuessArray.length !== 0
    ) {
      while (cookiesGuessArray.GuessArray.length < 5) {
        // console.log(
        //   cookiesGuessArray.GuessArray,
        //   "cookiesGuessArray.GuessArray"
        // );
        let _array = cookiesGuessArray.GuessArray;
        _array.push(null);
        setCookieGuessArray("GuessArray", _array, {
          path: "/",
          expires: UTCExpireTime(),
        });
      }
    }
  }, []);

  useEffect(() => {
    //console.log(cookiesGuessArray.GuessArray, "GuessArray");
  }, [cookiesGuessArray]);

  return (
    <>
       <section className="global-cover">
      <ModalInfo showModal={infoStatus} setShowModal={setInfoStatus} />
      <ModalStats showModal={statsStatus} setShowModal={setStatsStatus} />
      <div className="navigation-options">
        <Navigation />
      </div>
      <div className="anim-girl">
        <SideImage showModal={infoStatus ? true : statsStatus ? true : false} />
      </div>
      {/* <div className={`gusses-sec ${guessStatus ? 'gusses-sec-active' : ''}`}>
        <div className="gusses-header">
        <img src={Close} alt="CLose" className="img-close" onClick={GuessStsChange}></img>
        </div>
        <div className="gusses-contain">
        <div className="guess-header-text">YOUR GUESSES:</div>
        <div className="guesses-box-list">
          <div className="inner-box">
            <label className="guess-word-text">
              {guess1.Guess1 !== undefined ? guess1.Guess1 : ""}
            </label>
            {guess1.Guess1 !== undefined ? (
              <div
                className={
                  guess1Res["Guess1-Res"] !== undefined &&
                  guess1Res["Guess1-Res"]
                  ? "img-box correct"
                    : "img-box wrong"
                }
              ></div>
            ) : (
              <Fragment />
            )}
          </div>
          <div className="inner-box">
            <label className="guess-word-text">
              {guess2.Guess2 !== undefined ? guess2.Guess2 : ""}
            </label>
            {guess2.Guess2 !== undefined ? (
              <div
                className={
                  guess2Res["Guess2-Res"] !== undefined &&
                  guess2Res["Guess2-Res"]
                    ? "img-box correct"
                    : "img-box wrong"
                }
              ></div>
            ) : (
              <Fragment />
            )}
          </div>

          <div className="inner-box">
            <label className="guess-word-text">
              {guess3.Guess3 !== "" ? guess3.Guess3 : ""}
            </label>
            {guess3.Guess3 !== undefined ? (
              <div
                className={
                  guess3Res["Guess3-Res"] !== undefined &&
                  guess3Res["Guess3-Res"]
                    ? "img-box correct"
                    : "img-box wrong"
                }
              ></div>
            ) : (
              <Fragment />
            )}
          </div>
          <div className="inner-box">
            <label className="guess-word-text">
              {guess4.Guess4 !== "" ? guess4.Guess4 : ""}
            </label>
            {guess4.Guess4 !== undefined ? (
              <div
                className={
                  guess4Res["Guess4-Res"] !== undefined &&
                  guess4Res["Guess4-Res"]
                    ? "img-box correct"
                    : "img-box wrong"
                }
              ></div>
            ) : (
              <Fragment />
            )}
          </div>

          <div className="inner-box">
            <label className="guess-word-text">
              {guess5.Guess5 !== "" ? guess5.Guess5 : ""}
            </label>
            {guess5.Guess5 !== undefined ? (
              <div
                className={
                  guess5Res["Guess5-Res"] !== undefined &&
                  guess5Res["Guess5-Res"]
                    ? "img-box correct"
                    : "img-box wrong"
                }
              ></div>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
        </div>     
      </div> */}
    </section>


      <div className="container">
        {/* <ModalShare showModal={showModal} setShowModal={setShowModal}/>
      <ModalInfo showModal={infoStatus} setShowModal={setInfoStatus}/>
      <ModalStats showModal={statsStatus} setShowModal={setStatsStatus}/>

      <div className="left-container side-col">
        <div>
          <Navigation />
        </div>

        <div className="inner-side-col">
         <SideImage showModal={infoStatus ? true : statsStatus ? true : false}/>             
        </div>
      </div> */}

        <div className="center-box">
          <div className="center-container-result inner-container">
            <div className="header-text">
              <h2 className="h2">
                {cookiesDailyWin.DailyWin
                  ? "Congratulations! You guessed today's Befuddle."
                  : "Bad luck! Today's Befuddle is:"}
              </h2>
            </div>

            <div className="guess-word-result inner-container">
              <div className="box">
                <label className="guess-word-text">{decryptOT}</label>
              </div>
            </div>

            <div className="color-box">
              {cookiesGuessArray.GuessArray.map((index) => {
                return (
                  <div
                    key={Math.random()}
                    className={
                      index === null
                        ? "box"
                        : index.Guess === "SKIPPED"
                        ? "box skip"
                        : index.Result
                        ? "box correct"
                        : "box wrong"
                    }
                  ></div>
                );
              })}
            </div>

            <div
              className="button-raw inner-container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                className="button skip"
                value={"Share"}
                onClick={openModal}
              >
                SHARE
                <i
                  className="fa fa-share-alt"
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    fontSize: "24px",
                  }}
                ></i>
              </button>
            </div>
            {/*         
        <div className="guesses-box">
          <div className="guesses-box-list">
            <label className="box-list-text">Your Guesses: </label>
            {structure.map((rowSize, rowIndex) => (
              <div key={Math.random()} className="guesses-box-row">
                {Array.from({ length: rowSize }).map((_, colIndex) => {
                  const element = cookiesGuessArray.GuessArray[dataIndex];
                  dataIndex++;
                  return element === null ? (
                    <div className="inner-box" key={Math.random()}></div>
                  ) : (
                    <div className="inner-box" key={Math.random()}>
                      <h3 className="guess-word-text" key={Math.random()}>
                        {element?.Guess !== "" ? element?.Guess : ""}
                      </h3>
                      {element?.Guess !== "" ? (
                        <div
                          key={Math.random()}
                          className={
                            element?.Result
                              ? "img-box correct"
                              : "img-box wrong"
                          }
                        ></div>
                      ) : (
                        <Fragment />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div> */}
          </div>
          {/* <div className="div-banner" style={{margin:"10px"}} onClick={handelSteamPage}>
        <img className="banner" style={{height:"6vw"}} src={Banner} alt="Banner"></img>
      </div> */}
        </div>
        {/* <div className="right-container side-col">
          <div className="guesses-box">
            <div className="guesses-box-list">
              <label className="box-list-text">Your Guesses: </label>
              <div
                key={Math.random()}
                className="guesses-box-row"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {cookiesGuessArray.GuessArray.map((_, colIndex) => {
                  const element = cookiesGuessArray.GuessArray[dataIndex];
                  dataIndex++;
                  return element === null ? (
                    <div className="inner-box" key={Math.random()}></div>
                  ) : (
                    <div className="inner-box" key={Math.random()}>
                      <h3 className="guess-word-text" key={Math.random()}>
                        {element?.Guess !== "" ? element?.Guess : ""}
                      </h3>
                      {element?.Guess !== "" ? (
                        <div
                          key={Math.random()}
                          className={
                            element?.Result
                              ? "img-box correct"
                              : "img-box wrong"
                          }
                        ></div>
                      ) : (
                        <Fragment />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
