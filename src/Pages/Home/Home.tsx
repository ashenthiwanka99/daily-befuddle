import "./Home.css";

export default function Home() {
  return (
    <div className="container">

      <div className="hint-list">
        <div className="hint-row">
          <span className="hint-text">Item 1</span>
          <span className="hint-text">Item 1</span>
        </div>
        <div className="hint-row">
          <span className="hint-text">Item 1</span>
          <span className="hint-text">Item 1</span>
        </div>
        <div className="hint-row">
          <span className="hint-text">Item 1</span>
        </div>
      </div>

      <div className="guess-word">
        <div className="box">
          <h2 className="guess-word-text">top gun</h2>
        </div>
      </div>

      <div className="guesses-box">
        <div className="guesses-box-list">
          <div className="guesses-box-row">
            <div className="inner-box">
              <h4 className="guess-word-text">top gun</h4>
            </div>
            <div className="inner-box">
              <h4 className="guess-word-text">top gun</h4>
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <h4 className="guess-word-text">top gun</h4>
            </div>
            <div className="inner-box">
              <h3 className="guess-word-text">top gun</h3>
            </div>
          </div>
          <div className="guesses-box-row">
            <div className="inner-box">
              <h3 className="guess-word-text">top gun</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="textbox-container">
        <div className="textbox">
          <input type="text" placeholder="Enter your guess here" />
        </div>
      </div>
      <div className="button-raw">
        <button className="button">Submit</button>
        <button className="button">Skip</button>
      </div>
    </div>
  );
}
