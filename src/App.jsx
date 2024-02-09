import { Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import Navbar from "./components/NavBar/NavBar";
// import BuildPage from "./pages/BuildPage/BuildPage";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="*"
          element={<Homepage />}
        />
        {/* <Route
          path="/build"
          element={<BuildPage />}
        /> */}
        <Route
          path="/signup"
          element={<AuthPage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Routes>
    </>
  );
}

export default App;