import { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated, to } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import ReactApexChart from "react-apexcharts";
import "./Stats.scss";
import { useCookies } from "react-cookie";
import React from "react";

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: white;
`;

export const ModalStats = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState({hours: '00',minutes: '00',seconds: '00',message: '',});
  const [timeDifference, setTimeDifference] = useState(calculateTimeDifference());
  const [cookiesTotalGames, setCookieTotalGames ,removeCookieTotalGames] = useCookies(["TotalGames"]);
  const [cookiesTotalWonGames, setCookieTotalWonGames ,removeCookieTotalWonGames] = useCookies(["TotalWonGames"]);
  const [cookiesMaxStreak, setCookieMaxStreak ,removeCookieMaxStreak] = useCookies(["MaxStreak"]);
  const [cookiesCurrentStreak, setCookieCurrentStreak ,removeCookieCurrentStreak] = useCookies(["CurrentStreak"]);
  const [cookiesGuess1Win, setCookieGuess1Win ,removeGuess1Win] = useCookies(["Guess1Win"]);
  const [cookiesGuess2Win, setCookieGuess2Win ,removeGuess2Win] = useCookies(["Guess2Win"]);
  const [cookiesGuess3Win, setCookieGuess3Win ,removeGuess3Win] = useCookies(["Guess3Win"]);
  const [cookiesGuess4Win, setCookieGuess4Win ,removeGuess4Win] = useCookies(["Guess4Win"]);
  const [cookiesGuess5Win, setCookieGuess5Win ,removeGuess5Win] = useCookies(["Guess5Win"]);

  function calculateTimeDifference() {
    const currentTime = new Date();
    const utcMidnight = new Date(Date.UTC(currentTime.getUTCFullYear(),currentTime.getUTCMonth(),currentTime.getUTCDate() + 1, 0, 0,0));
    return  utcMidnight.getTime() - currentTime.getTime();
  }

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  useEffect(() => {
    const timerInterval = setTimeout(() => {
    const newTimeDifference = calculateTimeDifference();

      if (newTimeDifference <= 0) {
        setCountdown({
          hours:"00",
          minutes: "00",
          seconds: "00",
          message: "Time has already passed",
        });
      } else {
        const hours = Math.floor(newTimeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((newTimeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((newTimeDifference % (1000 * 60)) / 1000);

     
        setCountdown({
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
          message: '',
        });
      }

      setTimeDifference(newTimeDifference);
    }, 1000);

    return () => clearTimeout(timerInterval);
  }, [timeDifference]); 

  function calculateWinPercentage(totalGames, winGames) {   
    if (totalGames === 0 && totalGames === undefined) {
      return 0; 
    }
    const winPercentage = (winGames / totalGames) * 100;   
    return winPercentage.toFixed(1);
  }

  function LostPercentage(){
    var lostGameTotal = cookiesTotalGames.TotalGames - cookiesTotalWonGames.TotalWonGames;
    const lostPercentage = (lostGameTotal/cookiesTotalGames.TotalGames) * 100;   
    return (lostPercentage.toString() === "NaN" ? 0 : lostPercentage.toFixed(0) );
  }

  function Guess1Percentage(){
    const wonPercentage = (cookiesGuess1Win.Guess1Win/cookiesTotalGames.TotalGames) * 100;   
    return (wonPercentage.toString() === "NaN" ? 0 : wonPercentage.toFixed(0));
  }

  function Guess2Percentage(){
    const wonPercentage = (cookiesGuess2Win.Guess2Win/cookiesTotalGames.TotalGames) * 100;   
    return (wonPercentage.toString() === "NaN" ? 0 : wonPercentage.toFixed(0));
  }

  function Guess3Percentage(){
    const wonPercentage = (cookiesGuess3Win.Guess3Win/cookiesTotalGames.TotalGames) * 100;   
    return (wonPercentage.toString() === "NaN" ? 0 : wonPercentage.toFixed(0));
  }

  function Guess4Percentage(){
    const wonPercentage = (cookiesGuess4Win.Guess4Win/cookiesTotalGames.TotalGames) * 100;   
    return (wonPercentage.toString() === "NaN" ? 0 : wonPercentage.toFixed(0));
  }

  function Guess5Percentage(){
    const wonPercentage = (cookiesGuess5Win.Guess5Win/cookiesTotalGames.TotalGames) * 100;   
    return (wonPercentage.toString() === "NaN" ? 0 : wonPercentage.toFixed(0));
  }

  const data = {
    options: {
      chart: {
        type: "bar" as const,
        stacked: true,
        width: 700, 
        height: 300, 
        toolbar: {
          show: true,
          tools:{
            download:false
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '%';
        },
      },
      xaxis: {
        categories: ["1", "2", "3", "4", "5","X"],
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: '#ffffff',
            fontSize: '14px', 
          },
        },
        fill: {
          opacity: 1, 
        },
      },
      grid: {
        show: false, 
      },
      tooltip: {
        enabled: false, 
      },
    },
    series: [
      {
        data: [
          { x: "1", y: Guess1Percentage() , fillColor: '#90ee90' },
          { x: "2", y: Guess2Percentage(), fillColor: '#90ee90' },
          { x: "3", y: Guess3Percentage(), fillColor: '#90ee90' },
          { x: "4", y: Guess4Percentage(), fillColor: '#90ee90' },
          { x: "5", y: Guess5Percentage(), fillColor: '#90ee90' },
          { x: "X", y: LostPercentage(), fillColor: '#F08080' },
        ],
      },
    ],
  };

  const handleClose = () => {
    setShowModal((prev) => !prev);
  };

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="modalWrapper-info">
              <div className="modalContent-info">
                <div className="background-heading">
                  <label className="h1">Your Stats.</label>
                </div>
                <div className="div-center-info">
                  <div className="chart">
                    <ReactApexChart
                      options={data.options}
                      series={data.series}
                      type="bar"
                      width={isMobile? 325 : 700}
                      height={300}
                    />
                  </div>

                  <div className="game-info">
                    <div className="box-played">
                      <div className="text-number">{cookiesTotalGames.TotalGames === undefined ? 0 : cookiesTotalGames.TotalGames}</div>
                      <div className="text-lable">Played</div>
                    </div>
                    <div className="box-played">
                      <div className="text-number">{calculateWinPercentage(cookiesTotalGames.TotalGames, cookiesTotalWonGames.TotalWonGames) === "NaN" ? 0+"%" : calculateWinPercentage(cookiesTotalGames.TotalGames, cookiesTotalWonGames.TotalWonGames)+"%"}</div>
                      <div className="text-lable">Won</div>
                    </div>
                    <div className="box-played">
                      <div className="text-number">{cookiesCurrentStreak.CurrentStreak === undefined ? 0 : cookiesCurrentStreak.CurrentStreak}</div>
                      <div className="text-lable">Current Streak</div>
                    </div>
                    <div className="box-played">
                      <div className="text-number">{cookiesMaxStreak.MaxStreak === undefined ? 0 : cookiesMaxStreak.MaxStreak}</div>
                      <div className="text-lable">Max Streak</div>
                    </div>
                  </div>              
               </div>  
               <div className="next-game-time">
                  <label className="text">Next Befuddle in: </label>
                  <label className="text">{countdown.hours}h {countdown.minutes}m {countdown.seconds}s</label>
                  </div>               
              </div>
              <CloseModalButton
                aria-label="Close modal"
                onClick={handleClose}
              />
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};
