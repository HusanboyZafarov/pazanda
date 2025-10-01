import { useEffect, useState } from "react";
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

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <Box bg={"#F1FAF7"}>
      {!isLoginPage && <Navbar />}
      <div style={{ display: "flex" }}>
        {!isLoginPage && <SideBar />}
        <div style={{ flex: 1, padding: "1rem" }}>{children}</div>
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
  const [cooks, setCooks] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      name: "Dilshoda",
      lastname: "To‘liqova",
      meals: "10/8",
      rating: "4.5",
      region: "Andijon sh.",
      tariff: "Bepul",
      status: i % 2 === 0 ? "Online" : "Offline",
      Lid: i % 2 === 0 ? "True" : "False",
      date: "28.04.2025",
      phone: "(93) 701-44-64",
    }))
  );

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/cooks"
            element={<Cooks cooks={cooks} setCooks={setCooks} />}
          />
          <Route path="/couriers" element={<Couriers cooks={cooks} />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
