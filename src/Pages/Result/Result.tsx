import { useCookies } from "react-cookie";
import { DecryptOT } from "../../HelperMethods/HelperMethods";
import { useState, useEffect, Fragment } from "react";
import "./Result.scss";

export default function Result() {
  const [cookiesOT, setCookieOT, removeCookieOT] = useCookies(["OriginalTitle"]);
  const [cookiesGuessArray, setCookieGuessArray, removeCookieGuessArray] = useCookies(["GuessArray"]);
  const [decryptOT, setDecryptOT] = useState("");
  const guessArray = cookiesGuessArray.GuessArray;


  useEffect(() => {

    if(cookiesOT.OriginalTitle !== undefined && cookiesGuessArray !== undefined)
    {    
      setDecryptOT(DecryptOT(cookiesOT.OriginalTitle));   
      console.log(guessArray);
    }
    
    
  }, []);

  return (
    <div className="container">
      <div className="header-text">
        <h2>Congratulations! You guessed today's Befuddle.</h2>;
      </div>

      <div className="orginal-word">
        <div className="box">
          <h2 className="orginal-word-text">{decryptOT}</h2>
        </div>
      </div>

      <div className="color-box">
        {guessArray.map((index)=>{
          console.log(index.Result , index.Guess);
          
          return(<div className={index.Guess === "SKIPPED" ? "box skip" : index.Result? "box correct" : "box wrong" }></div>)
        })}
        {/* <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div> */}
      </div>

      <div className="guesses-box">
        <div className="guesses-box-list">
          <div className="guesses-box-row">
            <div className="inner-box">
              <h3 className="guess-word-text">{guessArray[0].Guess !== "" ? guessArray[0].Guess :""}</h3>
              {guessArray[0].Guess !== ""?
              <div className={guessArray[0].Result? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
            <div className="inner-box">
              <h3 className="guess-word-text">{guessArray[1].Guess !== "" ? guessArray[1].Guess :""}</h3>
              {guessArray[1].Guess !== ""?
              <div className={guessArray[1].Result? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <h3 className="guess-word-text">{guessArray[2].Guess !== "" ? guessArray[2].Guess :""}</h3>
              {guessArray[2].Guess !== ""?
              <div className={guessArray[2].Result? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
            <div className="inner-box">
              <h3 className="guess-word-text">{guessArray[3].Guess !== "" ? guessArray[3].Guess :""}</h3>
              {guessArray[3].Guess !== ""?
              <div className={guessArray[3].Result? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <h3 className="guess-word-text">{guessArray[4].Guess !== "" ? guessArray[4].Guess :""}</h3>
              {guessArray[4].Guess !== ""?
              <div className={guessArray[4].Result? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
