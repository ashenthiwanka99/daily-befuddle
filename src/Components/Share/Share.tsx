import { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import "./Share.scss"

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
  const [isToggled, setIsToggled] = useState(false);

  const toggleSwitch = () => {
    setIsToggled(!isToggled);
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
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

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
                <textarea  className="textarea" placeholder="Enter your guess here" />             
                
                </div>  
                <button className="button primary-btn">
                    Copy to Clipbord
                    <i className="fa-solid fa-copy" style={{marginLeft:"16px"}}></i>
                </button>                    
            </div>
                 <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev => !prev)}/>
            </div>
        </animated.div>
        </div>
      ) : null}
    </>
  );
};
