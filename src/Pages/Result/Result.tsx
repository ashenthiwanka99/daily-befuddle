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
import React from "react";

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
        <ModalShare showModal={showModal} setShowModal={setShowModal} />
        <ModalInfo showModal={infoStatus} setShowModal={setInfoStatus} />
        <ModalStats showModal={statsStatus} setShowModal={setStatsStatus} />
        <div className="navigation-options">
          <Navigation />
        </div>
        <div className="anim-girl">
          <SideImage
            showModal={infoStatus ? true : statsStatus ? true : false}
          />
        </div>
      </section>

      <div className="container">
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
          </div>
        </div>
      </div>
    </>
  );
}
