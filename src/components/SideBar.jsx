import React from "react";
import { Box, VStack, Button, Text } from "@chakra-ui/react";
import { FiHome, FiTruck, FiUsers, FiLogOut } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: "Asosiy", icon: <FiHome />, to: "/home" },
    { label: "Pazandalar", icon: <FiUsers />, to: "/cooks" },
    { label: "Kuryerlar", icon: <FiTruck />, to: "/couriers" },
    { label: "Foydalanuvchilar", icon: <MdGroups />, to: "/users" },
  ];

  return (
    <Box p={"12px"}>
      <Box
        w="300px"
        h="calc(100vh - 130px)"
        bg="white"
        borderRadius="2xl"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        overflowY="auto"
        position="fixed"
        top="95px"
        left="12px"
        border="1px solid"
        borderColor="gray.200"
      >
        <VStack align="stretch" spacing={2}>

          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Button
                key={item.label}
                as={Link}
                to={item.to}
                justifyContent="flex-start"
                variant="ghost"
                fontWeight="normal"
                fontSize="md"
                borderRadius="xl"
                border="1px solid"
                borderColor="primary.light"
                bg={isActive ? "primary.light" : "transparent"}
                color={isActive ? "white" : "black"}
                leftIcon={item.icon} // ✅ iconni shunaqa joylashtirish to‘g‘riroq
                _hover={{
                  bg: isActive ? "primary.light" : "gray.200",
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </VStack>

        <Button
          variant="ghost"
          justifyContent="flex-start"
          fontWeight="normal"
          fontSize="md"
          borderRadius="xl"
          color="black"
          border="1px solid"
          borderColor="primary.light"
          _hover={{ bg: "primary.light", color: "white" }}
          leftIcon={<FiLogOut />}
          onClick={handleLogout}
        >
          Chiqish
        </Button>
      </Box>
    </Box>
  );
};

export default SideBar;
