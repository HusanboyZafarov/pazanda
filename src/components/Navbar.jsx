import {
  Box,
  IconButton, 
  Text,
} from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      bg="white"
      width="100%"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      boxShadow="sm"
    >
      <Box
        display="flex"
        alignItems="center"
        gap={"20px"}
        width="100%"
        maxWidth="350px"
        marginRight="auto"
      >
        <Link to="/home">
          <Text color={"#379570"} fontSize={30} fontWeight={"bold"}>
            Pazanda
          </Text>
        </Link>


      </Box>

      <Box display="flex" alignItems="center" gap={"10px"} maxWidth="350px">
        <IconButton
          borderRadius={"md"}
          bg={"white"}
          aria-label="Bell database"
          style={{ border: "1px solid #379570" }}
        >
          <LuBell style={{ color: "#379570" }} />
        </IconButton>

        <Box display={"flex"} align="center" gap="2">
          <Box lineHeight="1">
            <Text fontSize="lg" fontWeight="semibold">
              {user?.full_name }
            </Text>
            <Text fontSize="md" color="gray.500">
              {user?.role || ""}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
