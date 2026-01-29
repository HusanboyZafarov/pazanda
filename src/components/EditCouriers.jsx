import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  Portal,
  Button,
  Box,
  Input,
  Flex,
  Text,
  InputGroup,
  createListCollection,
  Select,
  Switch,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { MdPerson, MdPhone, MdLocalShipping, MdLock } from "react-icons/md";
import { useIMask } from 'react-imask';

const PhoneInput = ({ value, onChange }) => {
  const { ref } = useIMask({
    mask: '+{998} 00 000-00-00',
    onAccept: (value) => onChange(value),
    placeholder: '+998 __ ___-__-__'
  });

  return (
    <Input
      ref={ref}
      placeholder="+998 __ ___-__-__"
      inputMode="numeric"
      bg="white"
      borderColor="gray.400"
      paddingLeft="40px"
      _focus={{
        borderColor: "primary.light",
        boxShadow: "0 0 0 1px #379570",
      }}
    />
  );
};

const EditCourier = ({ isOpen, onClose, courier, cooks = [], onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    password: "",
    vehicle_type: "",
    is_active: true,
    working: true,
    cooks: [],
  });

const pazandalarCollection = useMemo(
  () =>
    createListCollection({
      items: cooks
        .map((cook) => ({
          label: cook.full_name || `${cook.name || ""} ${cook.lastname || ""}`.trim(),
          value: cook.user?.toString() || "",
        }))
        .filter((item) => item.value),
    }),
  [cooks]
);


useEffect(() => {
  if (isOpen && courier) {
    const nameParts = courier.full_name?.split(" ") || [];
    const name = nameParts[0] || "";
    const surname = nameParts.slice(1).join(" ") || "";

    setFormData({
      name,
      surname,
      phone: courier.phone || "",
      password: "",
      vehicle_type: courier.vehicle_type,  
      is_active: courier.is_active ?? true,
      working: courier.working ?? true,
      cooks: (courier.cooks || []).map((c) => c.toString()),
    });
  } else if (!isOpen) {
    setFormData({
      name: "",
      surname: "",
      phone: "",
      password: "",
      vehicle_type: "foot",
      is_active: true,
      working: true,
      cooks: [],
    });
  }
}, [isOpen, courier]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSave = () => {
  if (!courier || !courier.user) return;

  const payload = {
    full_name: `${formData.name} ${formData.surname}`.trim(),
    phone: formData.phone,
    vehicle_type: formData.vehicle_type, // "car" | "bicycle" | ...
    is_active: formData.is_active,
    working: formData.working,
    cooks: formData.cooks.map(Number).filter(Number.isFinite),
    telegram: courier.telegram || "",
    ...(courier.birth_date && { birth_date: courier.birth_date }),
    firebase_token: courier.firebase_token || "",
    ...(formData.password && { password: formData.password }),
  };

  onSave(courier.user, payload);
};


  if (!courier) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content
            bg="#F9FAFB"
            borderRadius="xl"
            maxW="600px"
            w="full"
            p={6}
            boxShadow="lg"
          >
            <Dialog.Header>
              <Text fontSize="xl" fontWeight="bold">
                Kuryerni tahrirlash
              </Text>
            </Dialog.Header>

            <Dialog.Body mt={"10px"}>
              <Flex gap={6} direction="column">
                <Flex gap={4}>
                  <Box flex="1">
                    <Text mb={1} fontSize="sm" fontWeight="medium">
                      Ism
                    </Text>
                    <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ism"
                        bg="white"
                      />
                    </InputGroup>
                  </Box>

                  <Box flex="1">
                    <Text mb={1} fontSize="sm" fontWeight="medium">
                      Familiya
                    </Text>
                    <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                      <Input
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        placeholder="Familiya"
                        bg="white"
                      />
                    </InputGroup>
                  </Box>
                </Flex>

                <Flex gap={4}>
                  <Box flex="1">
                    <Text mb={1} fontSize="sm" fontWeight="medium">
                      Telefon raqami
                    </Text>
                    <InputGroup startElement={<MdPhone color="#adb5bd" />}>
                      <PhoneInput 
                        value={formData.phone}
                        onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                      />
                    </InputGroup>
                  </Box>

                  <Box flex="1">
                    <Text mb={1} fontSize="sm" fontWeight="medium">
                      Parol (yangilash uchun)
                    </Text>
                    <InputGroup startElement={<MdLock color="#adb5bd" />}>
                      <Input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Parol (ixtiyoriy)"
                        bg="white"
                      />
                    </InputGroup>
                  </Box>
                </Flex>
                <Flex gap={10}>
                <Box flex="1">
                  <Text mb={1} fontSize="sm" fontWeight="medium">
                    Transport turi
                  </Text>
                  <InputGroup startElement={<MdLocalShipping color="#adb5bd" />}>
                    <Select.Root
                      collection={transportTypes}
                      value={[formData.vehicle_type]} 
                      onValueChange={(e) => {
                        const next = e.value?.[0];
                        setFormData((prev) => ({ ...prev, vehicle_type: next }));
                      }}
                    >
                      <Select.HiddenSelect />
                      <Select.Trigger
                        flex={1}
                        bg="white"
                        borderColor="gray.400"
                        paddingLeft="30px"
                        _focusWithin={{
                          borderColor: "primary.light",
                          boxShadow: "0 0 0 1px #379570",
                        }}
                      >
                        <Select.ValueText placeholder="Transport turini tanlang" />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Positioner>
                        <Select.Content
                          bg="white"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                          maxHeight="200px"
                        >
                          {transportTypes.items.map((item) => (
                            <Select.Item key={item.value} item={item}>
                              {item.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  </InputGroup>
                </Box>

                <Box  flex="1">
                  <Text mb={1} fontSize="sm" fontWeight="medium">
                    Biriktirilgan pazandalar
                  </Text>
                  <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                    <Select.Root
                      multiple
                      closeOnSelect={false}
                      collection={pazandalarCollection}
                      value={formData.cooks} // array of strings, masalan ["21", "28"]
                      onValueChange={(e) => {
                        setFormData((prev) => ({ ...prev, cooks: e.value }));
                      }}
                    >
                      <Select.HiddenSelect />

                      <Select.Trigger
                        flex={1}
                        bg="white"
                        borderColor="gray.400"
                        paddingLeft="30px"
                        _focusWithin={{
                          borderColor: "primary.light",
                          boxShadow: "0 0 0 1px #379570",
                        }}
                      >
                        <Select.ValueText
                          placeholder="Pazandalarni tanlang"
                          value={
                            formData.cooks.length > 0 ? `${formData.cooks.length} ta tanlangan` : undefined
                          }
                        />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Positioner>
                        <Select.Content
                          overflowY="auto"
                          maxH="120px"  
                        >
                          {pazandalarCollection.items.map((item) => (
                            <Select.Item key={item.value} item={item}>
                              {item.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>

                    </Select.Root>

                  </InputGroup>
                </Box>
</Flex>

              </Flex>
            </Dialog.Body>

            <Dialog.Footer mt={"100px"} gap={3} justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                Bekor qilish
              </Button>
              <Button

                bg="primary.light"
                _hover={{ bg: "green.600" }}
                onClick={handleSave}
              >
                Saqlash
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <Box
                as="button"
                bg="gray.100"
                borderRadius="full"
                p={1}
                _hover={{ bg: "gray.200" }}
                position="absolute"
                right="2"
                top="2"
                onClick={onClose}
              >
                <RxCross2 size={18} />
              </Box>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const transportTypes = createListCollection({
  items: [
    { label: "Yengil moshina", value: "car" },
    { label: "Velosiped", value: "bicycle" },
    { label: "Skuter", value: "scooter" },
    { label: "Piyoda", value: "foot" },
  ],
});

export default EditCourier;
