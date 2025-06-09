import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Heading,
  Text,
  InputGroup,
  Icon,
} from "@chakra-ui/react";
import { LuUser, LuLock, LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const isFilled = login.trim() !== "" && password.trim() !== "";

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="radial(primary.lightAlpha 5%, transparent 80%)"
    >
      <Box
        bg="white"
        p={{ base: 6, md: 10 }}
        rounded="2xl"
        w="100%"
        maxW="420px"
        boxShadow="0 4px 120px #B5D8CA"
      >
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={2}
          fontFamily="systemUiB"
          color="gray.800"
        >
          Kirish
        </Heading>
        <Text
          textAlign="center"
          color="gray.500"
          mb={6}
          fontSize="sm"
          fontFamily="systemUiM"
        >
          Ilovadan to‘liq foydalanish uchun login kiriting
        </Text>

        <Text fontSize="sm" mb={1} color="gray.700" fontFamily="systemUiM">
          Login kiriting
        </Text>
        <InputGroup
          mb={4}
          startElement={<Icon as={LuUser} color={"gray.400"} boxSize={4.5} />}
        >
          <Input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Spencer"
            fontFamily="systemUiM"
            borderRadius="xl"
            border="1px solid"
            borderColor={isFilled ? "primary.light" : "gray.300"}
            color={isFilled ? "gray.800" : "gray.600"}
            _hover={{
              borderColor: isFilled ? "primary.light" : "gray.400",
            }}
            _focus={{ borderColor: "primary.light", boxShadow: "none" }}
          />
        </InputGroup>

        <Text fontSize="sm" mb={1} color="gray.700" fontFamily="systemUiM">
          Parol kiriting
        </Text>
        <InputGroup
          mb={6}
          startElement={<Icon as={LuLock} color={"gray.400"} boxSize={4.5} />}
          endElement={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              px={2}
              _hover={{ bg: "transparent" }}
            >
              <Icon
                as={showPassword ? LuEyeOff : LuEye}
                color={isFilled ? "primary.light" : "gray.400"}
                boxSize={5}
              />
            </Button>
          }
        >
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parol"
            type={showPassword ? "text" : "password"}
            fontFamily="systemUiM"
            borderRadius="xl"
            border="1px solid"
            borderColor={isFilled ? "primary.light" : "gray.300"}
            color={isFilled ? "gray.800" : "gray.600"}
            _hover={{
              borderColor: isFilled ? "primary.light" : "gray.400",
            }}
            _focus={{ borderColor: "primary.light", boxShadow: "none" }}
          />
        </InputGroup>

        <Button
          w="100%"
          bg={isFilled ? "primary.light" : "gray.400"}
          color="white"
          _hover={{ bg: isFilled ? "primary.light" : "#BBBBBB" }}
          fontFamily="systemUiB"
          rounded="xl"
          cursor={!isFilled ? "not-allowed" : "pointer"}
          onClick={() => {
            window.location.href = "/home";
          }
          }
        >
          Kirish
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
