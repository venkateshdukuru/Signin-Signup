import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import MiniDrawer from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<MiniDrawer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
