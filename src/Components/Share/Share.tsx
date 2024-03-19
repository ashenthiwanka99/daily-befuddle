import { useRef, useEffect, useCallback, useState } from 'react';
import { GenarateCopyText, UTCExpireTime, UTCNoExpireTime } from "../../HelperMethods/HelperMethods";
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import "./Share.scss"
import { useCookies } from 'react-cookie';
import React from 'react';

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color:white;
`;


export const ModalShare = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const [copyTextResult, setCopyTextresult] = useState(null as any);
  const [copyText, setCopyText] = useState("");
  const [buttonText, setButtonText] = useState("Copy to Clipboard.");
  const [cookiesDailyWin, setCookieDailyWin ,removeCookieDailyWin] = useCookies(["DailyWin"]);
  const [cookiesIsAccessible, setCookieIsAccessible ,removeIsAccessible] = useCookies(["IsAccessible"]);
  const [cookiesGuessArray, setCookieGuessArray, removeCookieGuessArray] = useCookies(["GuessArray"]);
  const [isToggled, setIsToggled] = useState(cookiesIsAccessible.IsAccessible);


  const handleCopy =()=>{
    navigator.clipboard.writeText(copyText);
    setButtonText("Copied!")
  }

  const handleClose =()=>{
    setShowModal(prev => !prev);
    setButtonText("Copy to Clipboard.")
  }

  const toggleSwitch = () => {
    setIsToggled(!isToggled); 
    setButtonText("Copy to Clipboard.")
  };
  
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  function handleCopyText()
  {
    if (cookiesGuessArray.GuessArray.length < 5 && cookiesGuessArray.GuessArray.length !== 0) {
      while (cookiesGuessArray.GuessArray.length < 5) {
        let _array = cookiesGuessArray.GuessArray;
        _array.push(null);
        setCookieGuessArray("GuessArray", _array, {
          path: "/",
          expires: UTCExpireTime(),
        });
      }
    }
    
    let result = GenarateCopyText(cookiesDailyWin.DailyWin,cookiesGuessArray.GuessArray)    
    setCopyTextresult(result)
  }

  useEffect(() => {
    handleCopyText();
    setCopyText(isToggled ? copyTextResult?.textAccessible : copyTextResult?.textEmoji )
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
    },[keyPress]);  

    useEffect(() => {
      setCopyText(isToggled ? copyTextResult?.textAccessible : copyTextResult?.textEmoji )
      setCookieIsAccessible("IsAccessible" , isToggled , { path: '/',  expires : UTCNoExpireTime()});  
    }, [isToggled])

  return (
    <>
      {showModal ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="modal-wrapper">
              <div className="modal-header">
                <h1 className="h1">Share Your Result.</h1>
                {/* <CloseModalButton
                  aria-label="Close modal"
                  onClick={handleClose}
                /> */}
              <div className="modalClose-share" onClick={handleClose}></div>
              </div>
              <div className="modal-container">
                <div className="modal-top-content">
                  <div className="div-switch">
                    <label className="text-switch">Accessible Mode</label>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={isToggled}
                        onChange={toggleSwitch}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="modal-mid-content">
                <textarea className="textarea" defaultValue={copyText} />
                </div>
              </div>
              <div className="modal-footer">
              <button className="button primary-btn" onClick={handleCopy}>
                  {buttonText.toUpperCase()}
                  <i
                    className="fa-solid fa-copy"
                    style={{ marginLeft: "16px" }}
                  ></i>
                </button>
              </div>
            </div>

            {/* <div className="modalWrapper">
              <div className="modalContent">
                <h1 className="h1">Share Your Result.</h1>
                <div className="div-center">
                  <div className="div-switch">
                    <label className="text-switch">Accessible Mode</label>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={isToggled}
                        onChange={toggleSwitch}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <textarea className="textarea" defaultValue={copyText} />
                </div>
                <button className="button primary-btn" onClick={handleCopy}>
                  {buttonText.toUpperCase()}
                  <i
                    className="fa-solid fa-copy"
                    style={{ marginLeft: "16px" }}
                  ></i>
                </button>
              </div>
              <CloseModalButton
                aria-label="Close modal"
                onClick={handleClose}
              />
            </div> */}
          </animated.div>
        </div>
      ) : null}
    </>
  );
};


