import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/gamePage/Game";
import Leader from "./pages/leaderPage/Leader";
import MainPage from "./pages/mainPage/MainPage";
import './App.css'
import Inctruction from "./pages/instruction/Inctruction";


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
          <Route path="/leader" element={<Leader />} />

          <Route path="/instruction" element={<Inctruction/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
