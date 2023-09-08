import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { InfoStore, StatsStore } from "../../Store/Store";
import { UTCExpireTime, xlsxDataHandle, HintGenarator, EncryptOT, DecryptOT , AccuracyCheck, UTCNoExpireTime } from "../../HelperMethods/HelperMethods";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import Navigation from "../../Components/Navigation/Navigation";
import SideImage from "../../Components/GirlImage/Image";
import { ModalInfo } from "../../Components/Info/Info";
import { ModalStats } from "../../Components/Stats/Stats";

export default function Home() {
  const navigate = useNavigate();
  const [infoStatus, setInfoStatus] = useContext(InfoStore);
  const [statsStatus, setStatsStatus] = useContext(StatsStore);
  const initialized = useRef(false)
  const [guessArray] = useState([]);
  const [isGuess, setIsGuess] = useState("");
  const [data, setXlsxData]=useState({} as any)
  const [decryptOT, setDecryptOT] = useState("");
  const [gameStatus, setGameStatus] = useState(false);
  const [guess1, setGuess1] = useCookies(["Guess1"]);;
  const [guess2, setGuess2] = useCookies(["Guess2"]);;
  const [guess3, setGuess3] = useCookies(["Guess3"]);;
  const [guess4, setGuess4] = useCookies(["Guess4"]);;
  const [guess5, setGuess5] = useCookies(["Guess5"]);;
  const [guess1Res, setGuess1Res] =  useCookies(["Guess1-Res"]);;
  const [guess2Res, setGuess2Res] =  useCookies(["Guess2-Res"]);;
  const [guess3Res, setGuess3Res] =  useCookies(["Guess3-Res"]);;
  const [guess4Res, setGuess4Res] =  useCookies(["Guess4-Res"]);;
  const [guess5Res, setGuess5Res] =  useCookies(["Guess5-Res"]);;
  const [cookiesOT, setCookieOT, removeCookieOT] = useCookies(["OriginalTitle"]);
  const [cookiesTranslation, setCookieTranslation, removeCookieTranslation] = useCookies(["Translation"]);
  const [cookiesHint1, setCookieHint1, removeCookieHint1] = useCookies(["Hint-1"]);
  const [cookiesHint2, setCookieHint2, removeCookieHint2] = useCookies(["Hint-2"]);
  const [cookiesHint3, setCookieHint3, removeCookieHint3] = useCookies(["Hint-3"]);
  const [cookiesHint4, setCookieHint4, removeCookieHint4] = useCookies(["Hint-4"]);
  const [cookiesHint5, setCookieHint5, removeCookieHint5] = useCookies(["Hint-5"]);
  const [cookiesGuessArray, setCookieGuessArray, removeCookieGuessArray] = useCookies(["GuessArray"]);
  const [cookiesGameStatus, setCookieGameStatus, removeCookieGameStatus] = useCookies(["GameStatus"]);
  const [cookiesDailyWin, setCookieDailyWin ,removeCookieDailyWin] = useCookies(["DailyWin"]);
  const [cookiesIsAccessible, setCookieIsAccessible ,removeIsAccessible] = useCookies(["IsAccessible"]);
  const [cookiesInfoStatus, setCookieInfoStatus ,removeInfoStatus] = useCookies(["InfoStatus"]);
  const [cookiesTotalGames, setCookieTotalGames ,removeCookieTotalGames] = useCookies(["TotalGames"]);
  const [cookiesTotalWonGames, setCookieTotalWonGames ,removeCookieTotalWonGames] = useCookies(["TotalWonGames"]);
  const [cookiesCurrentStreak, setCookieCurrentStreak ,removeCookieCurrentStreak] = useCookies(["CurrentStreak"]);
  const [cookiesMaxStreak, setCookieMaxStreak ,removeCookieMaxStreak] = useCookies(["MaxStreak"]);
  const [cookiesGuess1Win, setCookieGuess1Win ,removeGuess1Win] = useCookies(["Guess1Win"]);
  const [cookiesGuess2Win, setCookieGuess2Win ,removeGuess2Win] = useCookies(["Guess2Win"]);
  const [cookiesGuess3Win, setCookieGuess3Win ,removeGuess3Win] = useCookies(["Guess3Win"]);
  const [cookiesGuess4Win, setCookieGuess4Win ,removeGuess4Win] = useCookies(["Guess4Win"]);
  const [cookiesGuess5Win, setCookieGuess5Win ,removeGuess5Win] = useCookies(["Guess5Win"]);

  useEffect(() => {  
    if(cookiesGameStatus.GameStatus === "Ended")
    {
      navigate("/result/");
    }
    else
    {
      xlsxDataHandle(setXlsxData)
    }
  },[]);
  
  useEffect(() => {      
    if(cookiesInfoStatus.InfoStatus === undefined)
    { 
      setInfoStatus(true)
      setCookieInfoStatus("InfoStatus" , true , { path: '/',  expires : UTCNoExpireTime()});  
    }

    if(Object.keys(data).length !== 0){
     let Hints = HintGenarator(data);
     let encryptOT = EncryptOT(data["Original Title"]);
     setDecryptOT(DecryptOT(encryptOT));         
     
     if(cookiesHint1["Hint-1"] === undefined && cookiesHint2["Hint-2"] === undefined && cookiesHint3["Hint-3"] === undefined && cookiesHint4["Hint-4"] === undefined && cookiesHint5["Hint-5"] === undefined && cookiesOT.OriginalTitle === undefined && cookiesTranslation.Translation === undefined)
     {
        setCookieOT('OriginalTitle',encryptOT,{ path: '/',  expires : UTCExpireTime()});
        setCookieTranslation('Translation',data["Translation"],{ path: '/',  expires : UTCExpireTime()});
        setCookieHint1('Hint-1',Hints.Hint1,{ path: '/',  expires : UTCExpireTime()});
        setCookieHint2('Hint-2',Hints.Hint2,{ path: '/',  expires : UTCExpireTime()});
        setCookieHint3('Hint-3',Hints.Hint3,{ path: '/',  expires : UTCExpireTime()});
        setCookieHint4('Hint-4',Hints.Hint4,{ path: '/',  expires : UTCExpireTime()});
        setCookieHint5('Hint-5',Hints.Hint5,{ path: '/',  expires : UTCExpireTime()});  
        setCookieIsAccessible("IsAccessible" , false , { path: '/',  expires : UTCNoExpireTime()}); 
        setCookieTotalGames("TotalGames" , cookiesTotalGames.TotalGames === undefined ? 0 : cookiesTotalGames.TotalGames , { path: '/',  expires : UTCNoExpireTime()}); 
        setCookieTotalWonGames("TotalWonGames" , cookiesTotalWonGames.TotalWonGames === undefined ? 0 : cookiesTotalWonGames.TotalWonGames  , { path: '/',  expires : UTCNoExpireTime()});  
        setCookieCurrentStreak("CurrentStreak" , cookiesCurrentStreak.CurrentStreak === undefined ? 0 : cookiesCurrentStreak.CurrentStreak  , { path: '/',  expires : UTCNoExpireTime()});  
        setCookieMaxStreak("MaxStreak" , cookiesMaxStreak.MaxStreak === undefined ? 0 : cookiesMaxStreak.MaxStreak , { path: '/',  expires : UTCNoExpireTime()});  
        setCookieGuess1Win("Guess1Win" , cookiesGuess1Win.Guess1Win === undefined ? 0 : cookiesGuess1Win.Guess1Win , { path: '/',  expires : UTCNoExpireTime()});  
        setCookieGuess2Win("Guess2Win" , cookiesGuess2Win.Guess2Win === undefined ? 0 : cookiesGuess2Win.Guess2Win, { path: '/',  expires : UTCNoExpireTime()});  
        setCookieGuess3Win("Guess3Win" , cookiesGuess3Win.Guess3Win === undefined ? 0 : cookiesGuess3Win.Guess3Win, { path: '/',  expires : UTCNoExpireTime()});  
        setCookieGuess4Win("Guess4Win" , cookiesGuess4Win.Guess4Win === undefined ? 0 : cookiesGuess4Win.Guess4Win, { path: '/',  expires : UTCNoExpireTime()});  
        setCookieGuess5Win("Guess5Win" , cookiesGuess5Win.Guess5Win === undefined ? 0 : cookiesGuess5Win.Guess5Win, { path: '/',  expires : UTCNoExpireTime()});  
     }  
    }
  },[data]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
  
      if(guess1.Guess1 !== undefined && guess1Res["Guess1-Res"] !== undefined)
    {
      let obj = {Guess : guess1.Guess1 , Result : guess1Res["Guess1-Res"]};
      guessArray.push(obj)
    }
    if(guess2.Guess2 !== undefined && guess2Res["Guess2-Res"] !== undefined)
    {
      let obj = {Guess : guess2.Guess2 , Result : guess2Res["Guess2-Res"]};
      guessArray.push(obj)
    }
    if(guess3.Guess3 !== undefined && guess3Res["Guess3-Res"] !== undefined)
    {
      let obj = {Guess : guess3.Guess3 , Result : guess3Res["Guess3-Res"]};
      guessArray.push(obj)
    }
    if(guess4.Guess4 !== undefined && guess4Res["Guess4-Res"] !== undefined)
    {
      let obj = {Guess : guess4.Guess4 , Result : guess4Res["Guess4-Res"]};
      guessArray.push(obj)
    }
    if(guess5.Guess5 !== undefined && guess5Res["Guess5-Res"] !== undefined)
    {
      let obj = {Guess : guess5.Guess5 , Result : guess5Res["Guess5-Res"]};
      guessArray.push(obj)
    }
    //console.log(guessArray);
    }
  }, [])

  useEffect(() => {    
    setCookieGuessArray("GuessArray" , guessArray.length === 0? cookiesGuessArray.GuessArray : JSON.stringify(guessArray) , { path: '/',  expires : UTCExpireTime()});
  
      if(gameStatus)
      {
        navigate("/result/");
        setCookieGameStatus("GameStatus" , "Ended" , { path: '/',  expires : UTCExpireTime()});
        setCookieTotalGames("TotalGames" , cookiesTotalGames.TotalGames === undefined ? 1 : (cookiesTotalGames.TotalGames + 1) , { path: '/',  expires : UTCNoExpireTime()});  
      }
  }, [gameStatus])

  
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
          setCookieDailyWin("DailyWin" , true , { path: '/',  expires : UTCExpireTime()});
          setCookieTotalWonGames("TotalWonGames" , cookiesTotalWonGames.TotalWonGames === undefined ? 1 : (cookiesTotalWonGames.TotalWonGames + 1) , { path: '/',  expires : UTCNoExpireTime()});  
          setCookieCurrentStreak("CurrentStreak" , cookiesCurrentStreak.CurrentStreak === undefined || cookiesCurrentStreak.CurrentStreak === 0 ? 1 : (cookiesCurrentStreak.CurrentStreak  + 1) , { path: '/',  expires : UTCNoExpireTime()});  
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
    setGuess1("Guess1" ,guessArray[0].Guess ,{ path: '/',  expires : UTCExpireTime()})
    setGuess1Res("Guess1-Res" ,guessArray[0].Result ,{ path: '/',  expires : UTCExpireTime()})
    setCookieGuess1Win("Guess1Win" , guessArray[0].Result ? (cookiesGuess1Win.Guess1Win + 1) : cookiesGuess1Win.Guess1Win , { path: '/',  expires : UTCNoExpireTime()});  
  }
  if(guessArray[1] !== undefined){
    setGuess2("Guess2",guessArray[1].Guess ,{ path: '/',  expires : UTCExpireTime()})
    setGuess2Res("Guess2-Res" ,guessArray[1].Result , { path: '/',  expires : UTCExpireTime()})
    setCookieGuess2Win("Guess2Win" , guessArray[1].Result ? (cookiesGuess2Win.Guess2Win + 1) : cookiesGuess2Win.Guess2Win , { path: '/',  expires : UTCNoExpireTime()});  

  }
  if(guessArray[2] !== undefined){
    setGuess3("Guess3",guessArray[2].Guess ,{ path: '/',  expires : UTCExpireTime()})
    setGuess3Res("Guess3-Res",guessArray[2].Result, { path: '/',  expires : UTCExpireTime()})
    setCookieGuess3Win("Guess3Win" , guessArray[2].Result ? (cookiesGuess3Win.Guess3Win + 1) : cookiesGuess3Win.Guess3Win , { path: '/',  expires : UTCNoExpireTime()});  
  }
  if(guessArray[3] !== undefined){
    setGuess4("Guess4" ,guessArray[3].Guess ,{ path: '/',  expires : UTCExpireTime()})
    setGuess4Res("Guess4-Res" ,guessArray[3].Result ,{ path: '/',  expires : UTCExpireTime()})
    setCookieGuess4Win("Guess4Win" , guessArray[3].Result ? (cookiesGuess4Win.Guess4Win + 1) : cookiesGuess4Win.Guess4Win , { path: '/',  expires : UTCNoExpireTime()});  
  }
  if(guessArray[4] !== undefined){
    setGuess5("Guess5" ,guessArray[4].Guess ,{ path: '/',  expires : UTCExpireTime()})
    setGuess5Res("Guess5-Res" ,guessArray[4].Result ,{ path: '/',  expires : UTCExpireTime()})
    setCookieGuess5Win("Guess5Win" , guessArray[4].Result ? (cookiesGuess5Win.Guess5Win + 1) : cookiesGuess5Win.Guess5Win , { path: '/',  expires : UTCNoExpireTime()});  
  }

  //console.log(guessArray);
}

  return (
    <div className="container">
      <ModalInfo showModal={infoStatus} setShowModal={setInfoStatus}/>
      <ModalStats showModal={statsStatus} setShowModal={setStatsStatus}/>
      <div className="left-container side-col">
       <Navigation />
      </div>

      <div className="center-container inner-container">
      <div className="hint-list">
          <label className="hint-text">{cookiesHint1["Hint-1"] === undefined ? "" : "01. " + cookiesHint1["Hint-1"]}</label>
          <label className="hint-text">{guess1.Guess1 !== undefined ? "02. " + cookiesHint2["Hint-2"] : ""}</label>

          <label className="hint-text">{guess2.Guess2 !== undefined ? "03. " + cookiesHint3["Hint-3"] : ""}</label>
          <label className="hint-text">{guess3.Guess3!== undefined ? "04. " + cookiesHint4["Hint-4"] : ""}</label>

          <label className="hint-text">{guess4.Guess4 !== undefined ? "05. " + cookiesHint5["Hint-5"] : ""}</label>
      </div>

      <div className="guess-word inner-container">
        <div className="box">
          <label className="guess-word-text">{cookiesTranslation.Translation}</label>
        </div>
      </div>

      <div className="guesses-box inner-container">
        <div className="guesses-box-list">
          <div className="guesses-box-row">
            <div className="inner-box">
              <label className="guess-word-text">{guess1.Guess1 !== undefined ? guess1.Guess1 : ""}</label>
              {guess1.Guess1 !== undefined?
              <div className={guess1Res["Guess1-Res"] !== undefined && guess1Res["Guess1-Res"] ? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
            <div className="inner-box">
              <label className="guess-word-text">{guess2.Guess2 !== undefined ? guess2.Guess2 :""}</label>
              {guess2.Guess2 !== undefined?
              <div className={guess2Res["Guess2-Res"] !== undefined && guess2Res["Guess2-Res"] ? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <label className="guess-word-text">{guess3.Guess3 !== "" ? guess3.Guess3 :""}</label>
              {guess3.Guess3 !== undefined?
              <div className={guess3Res["Guess3-Res"] !== undefined && guess3Res["Guess3-Res"] ? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
            <div className="inner-box">
              <label className="guess-word-text">{guess4.Guess4 !== "" ? guess4.Guess4 :""}</label>
              {guess4.Guess4 !== undefined?
              <div className={guess4Res["Guess4-Res"] !== undefined && guess4Res["Guess4-Res"] ? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <label className="guess-word-text">{guess5.Guess5 !== "" ? guess5.Guess5 :""}</label>
              {guess5.Guess5 !== undefined?
              <div className={guess5Res["Guess5-Res"] !== undefined && guess5Res["Guess5-Res"] ? "img-box correct" : "img-box wrong"}></div>
              : 
              <Fragment />}
            </div>
          </div>
        </div>
      </div>

      <div className="textbox-container inner-container">
        <div className="textbox">
          <input type="text" maxLength={100} value={isGuess} placeholder="Enter your guess here"  onChange={handleChange} onKeyDown={handleKeypress} />
        </div>
      </div>
      <div className="button-raw inner-container">
        <button className="button primary-btn" type="submit" onClick={handleSubmit}>Submit</button>
        <button className="button skip" value={"SKIPPED"} onClick={handleSkip}>Skip</button>
      </div>

      </div>

      <div className="right-container side-col">
      <SideImage showModal={infoStatus ? true : statsStatus ? true : false}/>             
      </div>
    </div>
  );
}


