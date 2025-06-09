import {
  Box,
  IconButton,
  Image,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { LuSearch, LuBell } from "react-icons/lu";
import Logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import ProfileImg from "../assets/images/telegram-peer-photo-size-2-4467101622810552291-1-0-0 1.png";

const Navbar = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      bg="white"
      width="100%"
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
          <Image width={"90px"} src={Logo} />
        </Link>
        <InputGroup startElement={<LuSearch />}>
          <Input borderRadius={"md"} placeholder="Search" />
        </InputGroup>
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
          <Image borderRadius="full" src={ProfileImg} />
          <Box lineHeight="1">
            <Box lineHeight="1">
              <Text fontSize="lg" fontWeight="semibold">
                Murodillo. I
              </Text>
              <Text fontSize="md" color="gray.500">
                Admin
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
