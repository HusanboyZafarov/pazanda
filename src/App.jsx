import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import SideBar from "./components/SideBar.jsx";
import TotalNumber from "./components/totalNumber.jsx";
import { Box } from "@chakra-ui/react";

const App = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsLoginPage(currentPath === "/");
  }, [window.location.pathname]);

  return (
    <Box bg={"#F1FAF7"}>
      {" "}
      <Router>
        <div>
          {!isLoginPage && <Navbar />}
          <div style={{ display: "flex" }}>
            {!isLoginPage && <SideBar />}
            <div style={{ flex: 1, padding: "1rem" }}>
            {!isLoginPage && <TotalNumber />}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Box>
  );
};

export default App;
