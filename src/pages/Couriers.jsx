import React, { useState } from "react";
import { Box, Flex, Text, Button, Badge, Table } from "@chakra-ui/react";
import { FaClipboardList } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import NotificationDialog from "../components/NotificationDialog";
import Delete from "../components/Delete";
import AddCouriers from "../components/AddCouriers";
import EditCourier from "../components/EditCouriers";

const Couriers = ({ cooks }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showOnlyLids, setShowOnlyLids] = useState(false);

  const [couriers, setCouriers] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      name: "Sherzodbek. D",
      bazar: "Rayxona G'ulomova",
      status: i % 2 === 0 ? "Online" : "Offline",
      Lid: i % 2 === 0 ? "True" : "False",
      date: "28.04.2025",
      phone: "(93) 701-44-64",
    }))
  );

  const handleAddCourier = (newCourier) => {
    setCouriers((prev) => [...prev, newCourier]);
  };

  const handleDelete = () => {
    if (openIndex !== null) {
      const updated = couriers.filter((_, i) => i !== openIndex);
      setCouriers(updated);
      setOpenIndex(null);
    }
  };

  const handleEditSave = (updatedCourier) => {
    setCouriers((prev) =>
      prev.map((c, i) => (i === editingIndex ? updatedCourier : c))
    );
    setEditingIndex(null);
  };

  const filteredCouriers = showOnlyLids
    ? couriers.filter((c) => c.Lid === "True")
    : couriers;

  return (
    <Box p={4} bg="white" borderRadius="2xl" height="100vh">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" fontFamily="systemUiB">
          {showOnlyLids ? "Murojaatlar ro'yxati" : "Kuryerlar"}
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

          <AddCouriers cooks={cooks} handleAddCourier={handleAddCourier} />
        </Flex>
      </Flex>

      <Box maxH="600px" overflow="auto" rounded="md" bg="white">
        <Table.Root size="sm" variant="line">
          <Table.Header bg="white">
            <Table.Row>
              <Table.ColumnHeader>Kuryer ismi</Table.ColumnHeader>
              <Table.ColumnHeader>Biriktirilgan pazanda</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Ro'yxat sanasi</Table.ColumnHeader>
              <Table.ColumnHeader>Tel no'mer</Table.ColumnHeader>
              <Table.ColumnHeader>O'zgarish</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredCouriers.map((courier, index) => (
              <Table.Row key={index} _hover={{ bg: "gray.100" }}>
                <Table.Cell>{courier.name}</Table.Cell>
                <Table.Cell>{courier.bazar}</Table.Cell>
                <Table.Cell>
                  <Badge
                    colorScheme={courier.status === "Online" ? "green" : "gray"}
                  >
                    {courier.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{courier.date}</Table.Cell>
                <Table.Cell>{courier.phone}</Table.Cell>
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

      <EditCourier
        isOpen={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        courier={editingIndex !== null ? couriers[editingIndex] : null}
        onSave={handleEditSave}
      />
    </Box>
  );
};

export default Couriers;
