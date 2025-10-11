import React from "react";
import { Box, VStack, Button, Text } from "@chakra-ui/react";
import { FiHome, FiTruck, FiUsers, FiLogOut } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

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
        h="100vh"
        bg="white"
        borderRadius="xl"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        overflowY="auto"
      >
        <VStack align="stretch" spacing={2}>
          <Box mb={4} p={3} borderBottom="1px solid" borderColor="gray.200">
            <Text fontSize="xl" fontWeight="bold">
              Dashboard
            </Text>
          </Box>

          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Button
                key={item.label}
                as={Link} // ✅ MUHIM O‘ZGARISH
                to={item.to} // router link shu yerda ishlaydi
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
          onClick={() => console.log("Logout clicked")}
        >
          Chiqish
        </Button>
      </Box>
    </Box>
  );
};

export default SideBar;
