import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Result from "./Pages/Result/Result";
import "./App.css";

function App() {
  return (
    <div className="body">
      <div className="header">
      <header>
        <div className="logo">Your Logo</div>
      </header>
      </div>
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="footer">
      <div className="social-media">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
        </div>  
      </div>
    </div>
  );
}
export default App;
