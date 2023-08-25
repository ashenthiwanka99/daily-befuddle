import "./Result.scss";
import { useCookies } from "react-cookie";
import { useState, useEffect, Fragment , useContext } from "react";
import { DecryptOT, UTCExpireTime } from "../../HelperMethods/HelperMethods";
import Navigation from "../../Components/Navigation/Navigation";
import SideImage from "../../Components/GirlImage/Image";
import { ShareStroe } from "../../Store/Store";
import {ModalShare} from "../../Components/Share/Share";

export default function Result() {
  const [shareStatus, setShareStatus] = useContext(ShareStroe);
  const [cookiesOT, setCookieOT, removeCookieOT] = useCookies(["OriginalTitle"]);
  const [cookiesGuessArray, setCookieGuessArray, removeCookieGuessArray] = useCookies(["GuessArray"]);
  const [decryptOT, setDecryptOT] = useState("");
  //const [cookiesArraysts, setcookiesArraysts, removecookiesArraysts] = useCookies(["Arraysts"]);
  const structure = [2, 2, 1];
  let dataIndex = 0;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };
 
  useEffect(() => {
    if (
      cookiesOT.OriginalTitle !== undefined &&
      cookiesGuessArray !== undefined
    ) {
      setDecryptOT(DecryptOT(cookiesOT.OriginalTitle));
    }
    console.log(cookiesGuessArray.GuessArray.length);
    if (
      cookiesGuessArray.GuessArray.length < 5 &&
      cookiesGuessArray.GuessArray.length !== 0
    ) {
      while (cookiesGuessArray.GuessArray.length < 5) {
        console.log(
          cookiesGuessArray.GuessArray,
          "cookiesGuessArray.GuessArray"
        );
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
    console.log(cookiesGuessArray.GuessArray, "GuessArray");
  }, [cookiesGuessArray]);

  return (
    <div className="container">
      <ModalShare showModal={showModal} setShowModal={setShowModal}/>
      <div className="left-container side-col">
        <Navigation />
      </div>
      <div className="center-container inner-container">
        <div className="header-text">
          <h2 className="h2">Congratulations! You guessed today's Befuddle.</h2>
        </div>

        <div className="guess-word inner-container">
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

        <div className="button-raw inner-container">
        <button className="button skip" value={"Share"} onClick={openModal}>
          Share
          <i className='fa fa-share-alt' style={{ color: "white" , marginLeft: "10px",fontSize: "24px"}}></i>       
        </button>
        </div>
        
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
        </div>
      </div>
      <div className="right-container side-col">
      <SideImage showModal={showModal}/>         
      </div>
    </div>
  );
}
