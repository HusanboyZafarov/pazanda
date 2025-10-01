import React, { useState } from "react";
import { Box, Flex, Text, Button, Badge, Table } from "@chakra-ui/react";
import { FaClipboardList } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";

import NotificationDialog from "../components/NotificationDialog";
import Delete from "../components/Delete";
import AddCookDialog from "../components/AddCookDialog";
import EditCook from "../components/EditCook";

const Cooks = ({ cooks, setCooks }) => {
  const [openIndex, setOpenIndex] = useState(null); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [showOnlyLids, setShowOnlyLids] = useState(false);

  const handleAddCook = (newCook) => {
    setCooks((prev) => [...prev, newCook]);
  };

  const handleDelete = () => {
    if (openIndex !== null) {
      const updated = cooks.filter((_, i) => i !== openIndex);
      setCooks(updated);
      setOpenIndex(null);
    }
  };

  const handleEditSave = (updatedCook) => {
    const updated = cooks.map((c, i) => (i === editingIndex ? updatedCook : c));
    setCooks(updated);
    setEditingIndex(null);
  };

  const filteredCooks = showOnlyLids
    ? cooks.filter((cook) => cook.Lid === "True")
    : cooks;

  return (
    <Box p={4} bg="white" borderRadius="2xl" height="100vh">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" fontFamily="systemUiB">
          {showOnlyLids ? "Murojaatlar ro'yxati" : "Pazandalar"}
        </Text>

        <Flex gap={2}>
          <NotificationDialog />
          <Button
            size="sm"
            variant="outline"
            colorScheme="green"
            bg={showOnlyLids ? "primary.light" : "#B5D8CA80"}
            color={showOnlyLids ? "white" : "black"}
            _hover={{ bg: "primary.light", color: "white" }}
            onClick={() => setShowOnlyLids(!showOnlyLids)}
          >
            <Box as="span">Lidlar</Box>
            <FaClipboardList />
          </Button>
          <AddCookDialog handleAddCook={handleAddCook} />
        </Flex>
      </Flex>

      <Box maxH="600px" overflow="auto" rounded="md" bg="white">
        <Table.Root size="sm" variant="line">
          <Table.Header bg="white">
            <Table.Row>
              {showOnlyLids ? (
                <>
                  <Table.ColumnHeader>Pazanda ismi</Table.ColumnHeader>
                  <Table.ColumnHeader>Familiyasi</Table.ColumnHeader>
                  <Table.ColumnHeader>Hudud</Table.ColumnHeader>
                  <Table.ColumnHeader>Tel no'mer</Table.ColumnHeader>
                  <Table.ColumnHeader>O'zgarish</Table.ColumnHeader>
                </>
              ) : (
                <>
                  <Table.ColumnHeader>Pazanda ismi</Table.ColumnHeader>
                  <Table.ColumnHeader>Ovqat soni</Table.ColumnHeader>
                  <Table.ColumnHeader>Reyting</Table.ColumnHeader>
                  <Table.ColumnHeader>Hudud</Table.ColumnHeader>
                  <Table.ColumnHeader>Tarif</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Ro'yxat sanasi</Table.ColumnHeader>
                  <Table.ColumnHeader>Tel no'mer</Table.ColumnHeader>
                  <Table.ColumnHeader>O'zgarish</Table.ColumnHeader>
                </>
              )}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredCooks.map((cook, index) => (
              <Table.Row key={index} _hover={{ bg: "gray.100" }}>
                {showOnlyLids ? (
                  <>
                    <Table.Cell>{cook.name}</Table.Cell>
                    <Table.Cell>{cook.lastname}</Table.Cell>
                    <Table.Cell>{cook.region}</Table.Cell>
                    <Table.Cell>{cook.phone}</Table.Cell>
                    <Table.Cell>
                      <Flex gap={2}>
                        <Button
                          size="xs"
                          borderRadius="xl"
                          variant="outline"
                          colorScheme="green"
                          bg="#B5D8CA80"
                          onClick={() => setEditingIndex(index)}
                          _hover={{ bg: "primary.light", color: "white" }}
                        >
                          <FiEdit3 style={{ width: "20px" }} />
                        </Button>
                        <Button
                          size="xs"
                          borderRadius="xl"
                          variant="outline"
                          colorScheme="green"
                          bg="#B5D8CA80"
                          onClick={() => setOpenIndex(index)}
                          _hover={{ bg: "primary.light", color: "white" }}
                        >
                          <GoTrash style={{ width: "20px" }} />
                        </Button>
                      </Flex>
                    </Table.Cell>
                  </>
                ) : (
                  <>
                    <Table.Cell>{cook.name}</Table.Cell>
                    <Table.Cell>{cook.meals}</Table.Cell>
                    <Table.Cell>
                      <Flex align="center" gap={1}>
                        <CiStar />
                        {cook.rating}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>{cook.region}</Table.Cell>
                    <Table.Cell>{cook.tariff}</Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorScheme={
                          cook.status === "Online" ? "green" : "gray"
                        }
                      >
                        {cook.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{cook.date}</Table.Cell>
                    <Table.Cell>{cook.phone}</Table.Cell>
                    <Table.Cell>
                      <Flex gap={2}>
                        <Button
                          size="xs"
                          borderRadius="xl"
                          variant="outline"
                          colorScheme="green"
                          bg="#B5D8CA80"
                          onClick={() => setEditingIndex(index)}
                          _hover={{ bg: "primary.light", color: "white" }}
                        >
                          <FiEdit3 style={{ width: "20px" }} />
                        </Button>
                        <Button
                          size="xs"
                          borderRadius="xl"
                          variant="outline"
                          colorScheme="green"
                          bg="#B5D8CA80"
                          onClick={() => setOpenIndex(index)}
                          _hover={{ bg: "primary.light", color: "white" }}
                        >
                          <GoTrash style={{ width: "20px" }} />
                        </Button>
                      </Flex>
                    </Table.Cell>
                  </>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Delete
        isOpen={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        onConfirm={handleDelete}
      />

      <EditCook
        isOpen={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        cook={editingIndex !== null ? cooks[editingIndex] : null}
        onSave={handleEditSave}
      />
    </Box>
  );
};

export default Cooks;
