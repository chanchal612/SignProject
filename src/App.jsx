import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { LiveTranslation } from "./pages/LiveTranslation";

import { Learning } from "./pages/Learning";
import { Alphabet } from "./pages/Alphabet";

const Home = () => {
  return (
    <main>
      {/* Put your existing home sections back here later */}
    </main>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/live-translation"
          element={<LiveTranslation />}
        />

        <Route
          path="/learn"
          element={<Learning />}
        />

        <Route
          path="/learn/alphabet"
          element={<Alphabet />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;