import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./page/AuthPage/Signup";
import Login from "./page/AuthPage/Login";
import Dashboard from "./page/HomePage/Dashboard";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
