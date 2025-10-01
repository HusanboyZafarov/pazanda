import React, { useState } from "react";
import { Box, Flex, Text, Switch, Table } from "@chakra-ui/react";
import NotificationDialog from "../components/NotificationDialog";

const Users = () => {
    const [users, setUsers] = useState(
      Array.from({ length: 10 }, () => ({
        name: "Dildora",
        lastname: "A.",
        date: "28.04.2025",
        phone: "(93) 701-44-64",
        blocked: false,
      }))
    );

    const handleToggleBlock = (index) => {
      const updated = [...users];
      updated[index].blocked = !updated[index].blocked;
      setUsers(updated);
    };
  return (
    <Box p={4} bg="white" borderRadius={"2xl"} height="100vh">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" fontFamily="systemUiB">
          Foydalanuvchilar
        </Text>
        <NotificationDialog />
      </Flex>
      <Box maxH="600px" overflow="auto" rounded="md" bg="white">
        <Table.Root size="sm" variant="line">
          <Table.Header bg="white">
            <Table.Row>
              <Table.ColumnHeader>Foydalanuvchi ismi</Table.ColumnHeader>
              <Table.ColumnHeader>Ro'yxat sanasi</Table.ColumnHeader>
              <Table.ColumnHeader>Tel no'mer</Table.ColumnHeader>
              <Table.ColumnHeader>Bloklash</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user, index) => (
              <Table.Row
                key={index}
                bg={user.blocked ? "red.400" : "white"}
                color={user.blocked ? "white" : "black"}
                _hover={{ bg: user.blocked ? "red.500" : "gray.100" }}
              >
                <Table.Cell>
                  {user.name} {user.lastname}
                </Table.Cell>
                <Table.Cell>{user.date}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>
                  {" "}
                  <Switch.Root
                    checked={!user.blocked}
                    onCheckedChange={() => handleToggleBlock(index)}
                    colorPalette={!user.blocked ? "green" : "#681919"}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label />
                  </Switch.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default Users;
