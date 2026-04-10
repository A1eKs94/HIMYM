import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Season from "./pages/Season";
import Episode from "./pages/Episode";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/season/:seasonNumber" element={<Season />} />
        <Route
          path="/season/:seasonNumber/episode/:episodeNumber"
          element={<Episode />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
