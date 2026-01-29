import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Auth/Login.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import SideBar from "./components/SideBar.jsx";
import { Box } from "@chakra-ui/react";
import Cooks from "./pages/Cooks.jsx";
import Couriers from "./pages/Couriers.jsx";
import Users from "./pages/Users.jsx";

import ProtectedRoute from "./ProtectedRoute"; 

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <Box bg={"#F1FAF7"} minH="100vh">
      {!isLoginPage && <Navbar />}
      <div style={{ display: "flex" }}>
        {!isLoginPage && <SideBar />}
        <div style={{  flex: 1, padding: "1rem", paddingTop: isLoginPage ? "0" : "96px", marginLeft: isLoginPage ? "0" : "285px"}}>{children}</div>
      </div>
    </Box>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cooks"
            element={
              <ProtectedRoute>
                <Cooks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/couriers"
            element={
              <ProtectedRoute>
                <Couriers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
