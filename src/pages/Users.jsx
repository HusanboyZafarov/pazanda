import React, { useState, useMemo } from "react";
import { Box, Flex, Text, Switch, Table, Spinner, Center, Input, InputGroup, Select, createListCollection } from "@chakra-ui/react";
import { MdSearch, MdFilterList } from "react-icons/md";
import NotificationDialog from "../components/NotificationDialog";
import useUsers from "../hooks/useUsers";

const Users = () => {
  const { 
    users, 
    loading, 
    error, 
    activateUser, 
    deactivateUser,
    isActivating,
    isDeactivating 
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");

  const sortOptions = createListCollection({
    items: [
      { label: "Barchasi", value: "all" },
      { label: "Bloklanmaganlar", value: "active" },
      { label: "Bloklanganlar", value: "blocked" },
    ],
  });

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (user.full_name?.toLowerCase().includes(searchLower) || "") ||
        (user.phone?.includes(searchTerm) || "");
      
      if (!matchesSearch) return false;
      
      if (sortBy === "active") return user.is_active;
      if (sortBy === "blocked") return !user.is_active;
      return true; // "all"
    });

    return filtered;
  }, [users, searchTerm, sortBy]);

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

  const handleToggleBlock = (userId, currentStatus) => {
    // React Query mutationlar async emas, shuning uchun await kerak emas
    if (currentStatus) {
      deactivateUser(userId);
    } else {
      activateUser(userId);
    }
  };

  // Check if specific user is being processed
  const isUserProcessing = (userId) => {
    return isActivating || isDeactivating;
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
        <Text color="red.500">
          Xatolik: {error.message || "Ma'lumotlarni yuklashda xatolik yuz berdi"}
        </Text>
      </Center>
    );
  }

  return (
    <Box p={0} bg="white" borderRadius={"2xl"} border="1px solid" borderColor="gray.200" height="calc(100vh - 135px)" display="flex" flexDirection="column">
      <Flex justify="space-between" align="center" mb={4} p={4} flexShrink={0}>
        <Text fontSize="xl" fontWeight="bold">
          Foydalanuvchilar
        </Text>
        <Flex gap={4} align="center" zIndex={10}>
          <InputGroup startElement={<MdSearch color="#adb5bd" />}>
            <Input
              w="320px"
              placeholder="Ism yoki telefon raqami bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
              borderColor="gray.400"
              _focus={{
                borderColor: "primary.light",
                boxShadow: "0 0 0 1px token(colors.primary.light)",
              }}
            />
          </InputGroup>
          
          <InputGroup startElement={<MdFilterList color="#adb5bd" />}>
            <Select.Root
              w="150px"
              value={[sortBy]}
              onValueChange={(details) => setSortBy(details.value[0])}
              collection={sortOptions}
            >
              <Select.HiddenSelect />
              <Select.Trigger
                bg="white"
                borderColor="gray.400"
                paddingLeft="30px"
                _focusWithin={{
                  borderColor: "primary.light",
                  boxShadow: "0 0 0 1px token(colors.primary.light)",
                  zIndex: 1,
                }}
              >
                <Select.ValueText placeholder="Saralash" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Positioner zIndex={2000}>
                <Select.Content bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                  {sortOptions.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </InputGroup>
          
          <NotificationDialog />
        </Flex>
      </Flex>
      <Box flex="1" overflow="auto" rounded="md" bg="white" p={4}>
        <Table.Root size="sm" variant="line">
          <Table.Header bg="white">
            <Table.Row>
              <Table.ColumnHeader>Foydalanuvchi ismi</Table.ColumnHeader>
              <Table.ColumnHeader>Ro'yxat sanasi</Table.ColumnHeader>
              <Table.ColumnHeader>Tel no'mer</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredAndSortedUsers.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={4} textAlign="center" py={8}>
                  <Text color="gray.500">
                    {searchTerm || sortBy !== "all" 
                      ? "Qidiruv bo'yicha foydalanuvchilar topilmadi" 
                      : "Foydalanuvchilar mavjud emas"}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredAndSortedUsers.map((user) => (
              <Table.Row
                key={user.user_id}
                bg={!user.is_active ? "primary.red" : "white"}
                color={!user.is_active ? "white" : "black"}
                _hover={{ bg: !user.is_active ? "primary.red" : "gray.100" }}
              >
                <Table.Cell>{user.full_name || "-"}</Table.Cell>
                <Table.Cell>{formatDate(user.date_joined)}</Table.Cell>
                <Table.Cell>{user.phone || "-"}</Table.Cell>
                <Table.Cell>
                  <Switch.Root
                    checked={user.is_active}
                    onCheckedChange={() => handleToggleBlock(user.user_id, user.is_active)}
                    colorPalette={user.is_active ? "green" : "#681919"}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </Table.Cell>

              </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default Users;
