import React, { useState } from "react";
import { Box, VStack, Button, Icon, Text } from "@chakra-ui/react";
import { FiHome, FiUser, FiTruck, FiUsers, FiLogOut } from "react-icons/fi";

const items = [
  { label: "Asosiy", icon: FiHome },
  { label: "Pazandalar", icon: FiUser },
  { label: "Kuryerlar", icon: FiTruck },
  { label: "Foydalanuvchilar", icon: FiUsers },
];

const SideBar = () => {
  const [active, setActive] = useState("Asosiy");

  return (
    <Box p={"12px"}>
      <Box
        w="300px"
        h="620px"
        bg="white"
        borderRadius="xl"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VStack align="stretch" spacing={2}>
          <Box mb={4} p={3} borderBottom="1px solid" borderColor="gray.200">
            <Text fontSize="xl" fontWeight="bold">
              Dashboard
            </Text>
          </Box>

          {items.map(({ label, icon }) => (
            <Button
              key={label}
              justifyContent="flex-start"
              variant="ghost"
              fontWeight="normal"
              fontSize="md"
              borderRadius="xl"
              border="1px solid"
              borderColor="primary.light"
              bg={active === label ? "primary.light" : "transparent"}
              color={active === label ? "white" : "black"}
              _hover={{
                bg: active === label ? "primary.light" : "gray.200",
              }}
              onClick={() => setActive(label)}
            >
              {icon}
              {label}
            </Button>
          ))}
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
        >
          <FiLogOut />
          Chiqish
        </Button>
      </Box>
    </Box>
  );
};

export default SideBar;
