import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Spinner,
  Center,
  Table,
  Badge,
} from "@chakra-ui/react";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

import NotificationDialog from "../components/NotificationDialog";
import AddCookDialog from "../components/AddCookDialog";
import EditCook from "../components/EditCook";
import Delete from "../components/Delete";

import useCooks from "../hooks/useCooks";
import { useCooksLid } from "../hooks/useCooksLid";

const Cooks = () => {
  const { cooks, loading, error, addCook, editCook, deleteCook } = useCooks();
  const { cooksLid } = useCooksLid();
  const [showOnlyLids, setShowOnlyLids] = useState(false);
  const [editingCook, setEditingCook] = useState(null);
  const [deletingCook, setDeletingCook] = useState(null);

  const displayedCooks = showOnlyLids ? cooksLid : cooks;



  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Xatolik: {error}</Text>
      </Center>
    );
  }

  return (
    <Box p={4} bg="white" borderRadius="2xl" height="100vh">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Pazandalar
        </Text>

        <Flex gap={2}>
          <NotificationDialog />
          <Button
            size="sm"
            variant="outline"
            colorScheme="green"
            bg={showOnlyLids ? "green.400" : "#B5D8CA80"}
            color={showOnlyLids ? "white" : "black"}
            _hover={{ bg: "green.500", color: "white" }}
            onClick={() => setShowOnlyLids(!showOnlyLids)}
          >
            <Box as="span" mr={2}>
              Lidlar
            </Box>
            <FaClipboardList />
          </Button>
          <AddCookDialog handleAddCook={addCook} />
        </Flex>
      </Flex>

      <Box maxH="600px" overflow="auto" rounded="md" bg="white">
        <Table.Root size="sm" variant="line">
          <Table.Header bg="white">
            <Table.Row>
              <Table.ColumnHeader>Pazanda ismi</Table.ColumnHeader>
              <Table.ColumnHeader>Ovqat soni</Table.ColumnHeader>
              <Table.ColumnHeader>Reyting</Table.ColumnHeader>
              <Table.ColumnHeader>Hudud</Table.ColumnHeader>
              <Table.ColumnHeader>Tarif</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Telefon</Table.ColumnHeader>
              <Table.ColumnHeader>Amal</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {displayedCooks.map((cook, index) => (
              <Table.Row key={cook.user || cook.id || `cook-${index}`} _hover={{ bg: "gray.100" }}>
                <Table.Cell>{cook.full_name}</Table.Cell>
                <Table.Cell>{cook.meal_count ?? "-"}</Table.Cell>
                <Table.Cell>
                  <Flex align="center" gap={1}>
                    <CiStar />
                    {cook.rating ?? "0"}
                  </Flex>
                </Table.Cell>
                <Table.Cell>{cook.region}</Table.Cell>
                <Table.Cell>{cook.tarif}</Table.Cell>
                <Table.Cell>
                  <Badge colorScheme={cook.status === "Online" ? "green" : "gray"}>
                    {cook.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{cook.phone_number}</Table.Cell>
                <Table.Cell>
                  <Flex gap={2}>
                    <Button
                      size="xs"
                      borderRadius="xl"
                      variant="outline"
                      onClick={() => setEditingCook(cook)}
                    >
                      <FiEdit3 />
                    </Button>
                    <Button
                      size="xs"
                      borderRadius="xl"
                      variant="outline"
                      colorScheme="red"
                      onClick={() => setDeletingCook(cook)}
                    >
                      <GoTrash />
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Delete isOpen={!!deletingCook} onClose={() => setDeletingCook(null)} onConfirm={async () => { await deleteCook(deletingCook.user); setDeletingCook(); }} /> 

      <EditCook
        isOpen={!!editingCook}
        cook={editingCook}
        onSave={async (data) => {
          try {
            await editCook(editingCook.user, data);
            setEditingCook(null);
          } catch (error) {
            console.error("Pazandani yangilashda xatolik:", error);
          }
        }}
        onClose={() => setEditingCook(null)}
      />

    </Box>
  );
};

export default Cooks;
