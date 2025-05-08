import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/gamePage/Game";
import Leader from "./pages/leaderPage/Leader";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/game">Играть</Link>
          <Link to="/leader">leader</Link>
        </nav>
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/leader" element={<Leader/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
