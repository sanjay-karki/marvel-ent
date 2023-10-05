import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Error from "./Pages/Error";
import Character from "./Pages/Character";
import MainContextProvider from "./Contexts/MainContext";

function App() {
  return (
    <div className="App">
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="details" element={<Details />} />
            <Route path="character" element={<Character />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;