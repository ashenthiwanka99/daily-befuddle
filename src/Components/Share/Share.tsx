import { useRef, useEffect, useCallback, useState } from 'react';
import { GenarateCopyText, UTCExpireTime, UTCNoExpireTime } from "../../HelperMethods/HelperMethods";
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import "./Share.scss"
import { useCookies } from 'react-cookie';

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
  const [buttonText, setButtonText] = useState("Copy to Clipbord.");
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
    setButtonText("Copy to Clipbord.")
  }

  const toggleSwitch = () => {
    setIsToggled(!isToggled); 
    setButtonText("Copy to Clipbord.")
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
        <div className='background' onClick={closeModal} ref={modalRef}>
        <animated.div style={animation}>
            <div className='modalWrapper'>
              <div className='modalContent'>   
                <h1 className='h1'>Share Your Result.</h1>  
                <div className='div-center'>
                <div className='div-switch'>
                <label className='text-switch'>Accessible Mode</label>
                <label className="toggle-switch">
                 <input type="checkbox" checked={isToggled} onChange={toggleSwitch} />
                 <span className="slider round"></span>
                 </label>
                </div>           
                <textarea  className="textarea" defaultValue={copyText}/>                         
                </div>  
                <button className="button primary-btn"  onClick={handleCopy}> 
                   {buttonText.toUpperCase()}
                    <i className="fa-solid fa-copy" style={{marginLeft:"16px"}}></i>
                </button>                    
            </div>
                 <CloseModalButton aria-label='Close modal' onClick={handleClose}/>
            </div>
        </animated.div>
        </div>
      ) : null}
    </>
  );
};


