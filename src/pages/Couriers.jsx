import React, { useState } from "react";
import { Box, Flex, Text, Button, Badge, Table, Spinner, Center } from "@chakra-ui/react";
import { FaClipboardList } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import NotificationDialog from "../components/NotificationDialog";
import Delete from "../components/Delete";
import AddCouriers from "../components/AddCouriers";
import EditCourier from "../components/EditCouriers";
import useCouriers from "../hooks/useCouriers";
import { useCouriersLid } from "../hooks/useCouriersLid";
import useCooks from "../hooks/useCooks";

const Couriers = () => {
  const { cooks } = useCooks();
  const { couriers, loading, error, addCourier, editCourier, deleteCourier } = useCouriers();
  const { couriersLid } = useCouriersLid();
  const [deletingCourier, setDeletingCourier] = useState(null);
  const [editingCourier, setEditingCourier] = useState(null);
  const [showOnlyLids, setShowOnlyLids] = useState(false);

  const displayedCouriers = showOnlyLids ? couriersLid : couriers;

  const handleAddCourier = async (courierData) => {
    try {
      await addCourier(courierData);
    } catch {
      // Error is handled in the hook
    }
  };


  const handleEditSave = async (courierId, updatedData) => {
    try {
      await editCourier(courierId, updatedData);
      setEditingCourier(null);
    } catch {
      // Error is handled in the hook
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatCooks = (cooksArray) => {
    if (!cooksArray || cooksArray.length === 0) return "-";
    // If cooks is an array of IDs, we might need to map them to names
    // For now, just return the count or first cook name if available
    return cooksArray.length > 0 ? `${cooksArray.length} pazanda` : "-";
  };

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
    <Box p={0} bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.200" height="calc(100vh - 135px)" display="flex" flexDirection="column">
      <Flex justify="space-between" align="center" mb={4} p={4} flexShrink={0}>
        <Text fontSize="xl" fontWeight="bold" >
          {showOnlyLids ? "Murojaatlar ro'yxati" : "Kuryerlar"}
        </Text>

        <Flex gap={2}>
          <NotificationDialog />

          <Button
            size="sm"
            variant="outline"
            colorScheme="green"
            bg={showOnlyLids ? "primary.light" : "primary.white"}
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

      <Box flex="1" overflow="auto" rounded="md" bg="white" p={4}>
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
            {displayedCouriers.map((courier, index) => (
              <Table.Row key={courier.user || `courier-${index}`} _hover={{ bg: "gray.100" }}>
                <Table.Cell>{courier.full_name || "-"}</Table.Cell>
                <Table.Cell>{formatCooks(courier.cooks)}</Table.Cell>
                <Table.Cell>
                  <Badge
                    colorScheme={courier.status === "Online" ? "green" : "gray"}
                  >
                    {courier.status || "Offline"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{formatDate(courier.date_joined)}</Table.Cell>
                <Table.Cell>{courier.phone || "-"}</Table.Cell>
                <Table.Cell>
                  <Flex gap={2}>
                    <Button
                      size="xs"
                      borderRadius="xl"
                      variant="outline"
                      colorScheme="green"
                      bg="#B5D8CA80"
                      onClick={() => setEditingCourier(courier)}
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
                      onClick={() => setDeletingCourier(courier)}
                      _hover={{ bg: "primary.red", color: "white" }}
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
        isOpen={!!deletingCourier}
        onClose={() => setDeletingCourier(null)}
        onConfirm={async () => {
          await deleteCourier(deletingCourier.user);
          setDeletingCourier(null);
        }}
      />

      <EditCourier
        isOpen={editingCourier !== null}
        onClose={() => setEditingCourier(null)}
        courier={editingCourier}
        cooks={cooks}
        onSave={handleEditSave}
      />
    </Box>
  );
};

export default Couriers;
