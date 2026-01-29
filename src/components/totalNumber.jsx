import { Box, Flex, Icon, Text, SimpleGrid } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

const TotalNumber = ({ userCount = 0, cookCount = 0, courierCount = 0 }) => {
  const cards = [
    {
      title: "Foydalanuvchilar soni:",
      count: userCount,
    },
    {
      title: "Umumiy pazanda soni:",
      count: cookCount,
    },
    {
      title: "Umumiy kuryerlar soni:",
      count: courierCount,
    },
  ];

  return (
    <Box display={"flex"}justifyContent={"space-between"} gap={"10px"} width={"1205px"}>
      {cards.map((card, index) => (
        <Flex
          key={index}
          width={"400px"}
          height={"110px"}
          bg="white"
          borderRadius="2xl"
          display={"flex"}
          flexDirection={"column"}
          p="4"
          align="start"
          justifyContent={"center"}
          border="1px solid"
          borderColor="gray.200"
        >
          <Box display="flex" justifyContent="center" alignItems="center" mb={2} gap={4}>
            <Box
              bg="#379FFF"
              borderRadius="full"
              w="10"
              h="10"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaUsers} color="white" />
            </Box>
          <Box textAlign="start">
            <Text fontSize="sm" fontWeight={"bold"} color="gray.600" mb={2}>
              {card.title}
            </Text>
            <Text fontSize="2xl" color="gray.600" fontWeight={"bold"}>
              {card.count}
            </Text>
          </Box>
          </Box>

        </Flex>
      ))}
    </Box>
  );
};

export default TotalNumber;
