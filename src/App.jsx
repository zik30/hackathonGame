import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/gamePage/Game";
import RegistrationModal from "./modules/RegistrationModal/RegistrationModal.jsx";

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
        </Routes>
        <RegistrationModal/>
      </BrowserRouter>
    </>
  );
}

export default App;
