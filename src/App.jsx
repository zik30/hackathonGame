import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/gamePage/Game";
import MainPage from "./pages/mainPage/MainPage";
import './App.css'
import Inctruction from "./pages/instruction/Inctruction";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <nav>
          <Link to="/">Главная</Link>
          <Link to="/game">Играть</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/game" element={<Game />} />
          <Route path="/instruction" element={<Inctruction/>}/>
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
