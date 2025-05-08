import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/game">Играть</Link>
        </nav>
        <Routes>
          <Route path="/game" element={<Game />} />
          {/* другие маршруты */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
