import { Fragment, useContext, useEffect, useState } from "react";
import { InfoStore, StatsStore } from "../../Store/Store";
import { UTCExpireTime, xlsxDataHandle, HintGenarator, EncryptOT, DecryptOT , AccuracyCheck } from "../../HelperMethods/HelperMethods";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Home.scss";


export default function Home() {
  const navigate = useNavigate();
  const [InfoStatus, setInfoStatus] = useContext(InfoStore);
  const [stastStatus, setStatsStatus] = useContext(StatsStore);
  const [isGuess, setIsGuess] = useState("");
  const [guess1, setGuess1] = useState("");
  const [guess2, setGuess2] = useState("");
  const [guess3, setGuess3] = useState("");
  const [guess4, setGuess4] = useState("");
  const [guess5, setGuess5] = useState("");
  const [guess1Res, setGuess1Res] = useState(false);
  const [guess2Res, setGuess2Res] = useState(false);
  const [guess3Res, setGuess3Res] = useState(false);
  const [guess4Res, setGuess4Res] = useState(false);
  const [guess5Res, setGuess5Res] = useState(false);
  const [decryptOT, setDecryptOT] = useState("");
  const [expireDateTime, setExpireDateTime] = useState(null as any);
  const [gameStatus, setGameStatus] = useState(false);
  const [guessArray] = useState([]);
  const [cookiesOT, setCookieOT, removeCookieOT] = useCookies(["OriginalTitle"]);
  const [cookiesTranslation, setCookieTranslation, removeCookieTranslation] = useCookies(["Translation"]);
  const [cookiesHint1, setCookieHint1, removeCookieHint1] = useCookies(["Hint-1"]);
  const [cookiesHint2, setCookieHint2, removeCookieHint2] = useCookies(["Hint-2"]);
  const [cookiesHint3, setCookieHint3, removeCookieHint3] = useCookies(["Hint-3"]);
  const [cookiesHint4, setCookieHint4, removeCookieHint4] = useCookies(["Hint-4"]);
  const [cookiesHint5, setCookieHint5, removeCookieHint5] = useCookies(["Hint-5"]);
  const [cookiesGuessArray, setCookieGuessArray, removeCookieGuessArray] = useCookies(["GuessArray"]);
 

  const [data, setXlsxData]=useState({} as any)
  
  useEffect(() => {  
    xlsxDataHandle(setXlsxData)
  },[]);
  
  useEffect(() => {
    setCookieGuessArray("GuessArray" , JSON.stringify(guessArray) , { path: '/',  expires : expireDateTime});
    
    if(gameStatus)
    {
      navigate("/result/");
    }
  }, [gameStatus])
  

  useEffect(() => {      
    if(Object.keys(data).length !== 0){
     let Hints = HintGenarator(data);

     let encryptOT = EncryptOT(data["Original Title"]);
     setDecryptOT(DecryptOT(encryptOT));
     setExpireDateTime(UTCExpireTime());      
     
     if(cookiesHint1["Hint-1"] === undefined && cookiesHint2["Hint-2"] === undefined && cookiesHint3["Hint-3"] === undefined && cookiesHint4["Hint-4"] === undefined && cookiesHint5["Hint-5"] === undefined && cookiesOT.OriginalTitle === undefined && cookiesTranslation.Translation === undefined)
     {
        setCookieOT('OriginalTitle',encryptOT,{ path: '/',  expires : expireDateTime});
        setCookieTranslation('Translation',data["Translation"],{ path: '/',  expires : expireDateTime});
        setCookieHint1('Hint-1',Hints.Hint1,{ path: '/',  expires : expireDateTime});
        setCookieHint2('Hint-2',Hints.Hint2,{ path: '/',  expires : expireDateTime});
        setCookieHint3('Hint-3',Hints.Hint3,{ path: '/',  expires : expireDateTime});
        setCookieHint4('Hint-4',Hints.Hint4,{ path: '/',  expires : expireDateTime});
        setCookieHint5('Hint-5',Hints.Hint5,{ path: '/',  expires : expireDateTime});    
     }
     
    }

  },[data]);

  
  const handleChange = e => {
    setIsGuess(e.target.value);
  };
 
  const handleKeypress = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }};

    
  function handleSubmit(){    
      if(guessArray.length < 5 && isGuess !== "")
      {
        let AccuracyRes = AccuracyCheck(decryptOT,isGuess);
        let obj = {Guess : isGuess , Result : AccuracyRes};
        guessArray.push(obj)
        setGuess()

        if(AccuracyRes)
        {          
          setGameStatus(true)
        }
      }
      
      if(guessArray[4] !== undefined)
      {
        setGameStatus(true)
      }
     
      setIsGuess("")    
    }
    
  const handleSkip = e => {
      if(guessArray.length < 5)
      {
        let AccuracyRes = AccuracyCheck(e.target.value,isGuess);
        let obj = {Guess : e.target.value , Result : AccuracyRes};
        guessArray.push(obj)
        setGuess()    
      }

      if(guessArray[4] !== undefined)
      {
        setGameStatus(true)
      }

      setIsGuess("") 
    };

  function setGuess(){
  if(guessArray[0] !== undefined){
    setGuess1(guessArray[0].Guess)
    setGuess1Res(guessArray[0].Result)
  }
  if(guessArray[1] !== undefined){
    setGuess2(guessArray[1].Guess)
    setGuess2Res(guessArray[1].Result)
  }
  if(guessArray[2] !== undefined){
    setGuess3(guessArray[2].Guess)
    setGuess3Res(guessArray[2].Result)
  }
  if(guessArray[3] !== undefined){
    setGuess4(guessArray[3].Guess)
    setGuess4Res(guessArray[3].Result)
  }
  if(guessArray[4] !== undefined){
    setGuess5(guessArray[4].Guess)
    setGuess5Res(guessArray[4].Result)
  }

  console.log(guessArray);
  console.log(guess1,guess2,guess3,guess4,guess5);
}

  return (
    <div className="container">
      <div className="hint-list">
        <div className="hint-row">
          <span className="hint-text">{cookiesHint1["Hint-1"]}</span>
          <span className="hint-text">{guess1 !== "" ? cookiesHint2["Hint-2"] : ""}</span>
        </div>
        <div className="hint-row">
          <span className="hint-text">{guess2 !== "" ? cookiesHint3["Hint-3"] : ""}</span>
          <span className="hint-text">{guess3 !== "" ? cookiesHint4["Hint-4"] : ""}</span>
        </div>
        <div className="hint-row">
          <span className="hint-text">{guess4 !== "" ? cookiesHint5["Hint-5"] : ""}</span>
        </div>
      </div>

      <div className="guess-word">
        <div className="box">
          <h2 className="guess-word-text">{cookiesTranslation.Translation}</h2>
        </div>
      </div>

      <div className="guesses-box">
        <div className="guesses-box-list">
          <div className="guesses-box-row">
            <div className="inner-box">
              <h3 className="guess-word-text">{guess1 !== "" ? guess1 :""}</h3>
              {guess1 !== ""?
              <div className={guess1Res? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
            <div className="inner-box">
              <h3 className="guess-word-text">{guess2 !== "" ? guess2 :""}</h3>
              {guess2 !== ""?
              <div className={guess2Res? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <h3 className="guess-word-text">{guess3 !== "" ? guess3 :""}</h3>
              {guess3 !== ""?
              <div className={guess3Res? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
            <div className="inner-box">
              <h3 className="guess-word-text">{guess4 !== "" ? guess4 :""}</h3>
              {guess4 !== ""?
              <div className={guess4Res? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <h3 className="guess-word-text">{guess5 !== "" ? guess5 :""}</h3>
              {guess5 !== ""?
              <div className={guess5Res? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
        </div>
      </div>

      <div className="textbox-container">
        <div className="textbox">
          <input type="text" value={isGuess} placeholder="Enter your guess here"  onChange={handleChange} onKeyDown={handleKeypress}/>
        </div>
      </div>
      <div className="button-raw">
        <button className="button" type="submit" onClick={handleSubmit}>Submit</button>
        <button className="button" value={"SKIPPED"} onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
}


