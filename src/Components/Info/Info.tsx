import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import "./Info.scss";

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

export const ModalInfo = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

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
                <div className="background-heading-info">
                  <label className="h1">How to play.</label>
                </div>
                <div className="div-center-info">
                  <div className="left-box-info">
                    <div className="text-heading-info">
                      DECIPHER THE BEFUDDLE IN FIVE ATTEMPTS!
                    </div>
                    <div>
                      <ul>
                        <li className="li-text">
                          A popular title has had its name transformed into
                          something else. <span className="pink-text"> Each word has been swapped for another
                          word</span> (or words!) that has the same meaning.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="text-heading-info">EXAMPLES</div>
                    <div></div>
                  </div>
                  {/* <label className="text-heading">
                    Guess the Befuddle in five attempts!
                  </label>
                  <ul>
                    <li className="li-text">
                      A popular title has had its name transformed into
                      something else. Each word has been swapped for another
                      word (or words!) that have the same meaning.
                    </li>
                    <li className="li-text">
                      Type in your guess to decipher the Befuddle and hit enter
                      or the submit button.
                    </li>
                    <li className="li-text">
                      Incorrect guesses or skips will reveal a new hint about
                      the Befuddled title.
                    </li>
                    <li className="li-text">
                      Answer in as few attempts as possible and share your
                      score!
                    </li>
                  </ul>
                  <label className="text-heading" style={{marginBottom:"20px"}}>Examples:</label>
                  <div className="example-boxes">
                    <div className="example-box-row">
                      <div className="box" style={{width:"210px"}}>
                        <label className="guess-word-text">Best Pistol</label>
                      </div>
                      <div className="arrow">
                      <i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:"40px" , color:"white"}}></i>
                      </div>
                      <div className="box" style={{width:"210px"}}>
                        <label className="guess-word-text">Top Gun</label>
                      </div>
                    </div>
                    <div className="example-box-row">
                      <div className="box" style={{width:"210px"}}>
                        <label className="guess-word-text">Pelvis is Honest</label>
                      </div>
                      <div className="arrow">
                      <i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:"40px" , color:"white"}}></i>
                      </div>
                      <div className="box" style={{width:"210px"}}>
                        <label className="guess-word-text">Hips Don't Lie</label>
                      </div>
                    </div>
                    <div className="example-box-row">
                      <div className="box" style={{width:"210px"}}>
                        <label className="guess-word-text">Cracking Corrupt</label>
                      </div>
                      <div className="arrow">
                      <i className="fa fa-arrow-right" aria-hidden="true" style={{fontSize:"40px" , color:"white"}}></i>
                      </div>
                      <div className="box" style={{width:"210px"}}>
                        <label className="guess-word-text">Breakin Bad</label>
                      </div>
                    </div>
                  </div> */}
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
