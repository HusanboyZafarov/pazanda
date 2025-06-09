import { Box, Flex, Icon, Text, SimpleGrid } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

const TotalNumber = () => {
  const cards = [
    {
      title: "Foydalanuvchilar soni",
      count: 0,
    },
    {
      title: "Umumiy pazanda soni",
      count: 0,
    },
    {
      title: "Umumiy kuryerlar soni",
      count: 0,
    },
  ];

  return (
    <Box display={"flex"} alignItems={"center"} gap={"20px"}>
      {cards.map((card, index) => (
        <Flex
          key={index}
          width={"380px"}
          height={"150px"}
          bg="white"
          borderRadius="2xl"
          display={"flex"}
          flexDirection={"column"}
          p="4"
          align="start"
          justifyContent={"center"}
          boxShadow="md"
        >
          <Box display={"flex"}  >
            <Box
              bg="#379FFF"
              borderRadius="full"
              w="10"
              h="10"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr="4"
            >
              <Icon as={FaUsers} color="white" />
            </Box>
            <Text fontSize="sm" fontWeight={"bold"} color="gray.600">
              {card.title}
            </Text>
          </Box>
          <Text fontSize="2xl" color="gray.600">
            {card.count}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default TotalNumber;
