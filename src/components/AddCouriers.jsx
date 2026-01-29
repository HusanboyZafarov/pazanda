import React, { useState, useMemo } from "react";
import {
  Button,
  Flex,
  Box,
  Input,
  InputGroup,
  Dialog,
  Portal,
  CloseButton,
  createListCollection,
  Select,
} from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdPerson, MdPhone, MdLocalShipping, MdLock } from "react-icons/md";
import { toaster } from "@/components/ui/toaster";
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



const AddCouriers = ({ cooks = [], handleAddCourier }) => {
  const pazandalarCollection = useMemo(
    () =>
      createListCollection({
        items: cooks.map((cook) => ({
          label: cook.full_name || `${cook.name || ""} ${cook.lastname || ""}`.trim(),
          value: cook.user?.toString() || cook.id?.toString() || "",
        })).filter(item => item.value),
      }),
    [cooks]
  );

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    transport: "",
    phone: "",
    password: "",
    bazars: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetAll = () => {
    setFormData({
      name: "",
      surname: "",
      transport: "",
      phone: "",
      password: "",
      bazars: "",
    });
    setIsOpen(false);
  };



  const handleSubmit = async () => {
    const { name, surname, phone, transport, password, bazars } = formData;
    
    console.log("Form data before submit:", formData);
    console.log("Selected bazars value:", bazars);
    
    // Validatsiya
    if (!name || !name.trim()) {
      toaster.create({
        title: "Xatolik",
        description: "Ism maydoni to'ldirilishi shart.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (!surname || !surname.trim()) {
      toaster.create({
        title: "Xatolik",
        description: "Familiya maydoni to'ldirilishi shart.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (!phone || !phone.trim()) {
      toaster.create({
        title: "Xatolik",
        description: "Telefon raqami maydoni to'ldirilishi shart.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (!password || !password.trim()) {
      toaster.create({
        title: "Xatolik",
        description: "Parol maydoni to'ldirilishi shart.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    // Get selected cook IDs - API requires at least one cook
    let selectedCookIds = [];
    if (bazars) {
      // bazars is already a string ID from the select, convert to number
      const cookId = parseInt(bazars);
      console.log("Parsed cook ID:", cookId);
      if (!isNaN(cookId) && cookId > 0) {
        selectedCookIds = [cookId];
      }
    }

    console.log("Selected cook IDs:", selectedCookIds);

    // Validate that we have at least one cook selected
    if (!bazars || selectedCookIds.length === 0) {
      toaster.create({
        title: "Xatolik",
        description: "Kamida bitta pazanda tanlanishi shart.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    // Map vehicle type to API format
    const vehicleTypeMap = {
      "yengil moshina": "car",
      "velosiped": "bicycle",
      "skuter": "scooter",
      "piyoda": "foot",
    };
    const vehicle_type = transport ? vehicleTypeMap[transport] || "foot" : "foot";

    const defaultBirthDate = new Date();
    defaultBirthDate.setFullYear(defaultBirthDate.getFullYear() - 18);
    const birthDateString = defaultBirthDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const courierPayload = {
      full_name: `${name.trim()} ${surname.trim()}`.trim(),
      phone: phone.trim(),
      password: password,
      is_active: true,
      vehicle_type: vehicle_type,
      working: true,
      cooks: selectedCookIds,
      telegram: "",
      birth_date: birthDateString,
      firebase_token: "",
    };

    setIsSubmitting(true);
    try {
      await handleAddCourier?.(courierPayload);
      resetAll();
    } catch (error) {
      // Error is handled in the hook, but we can show additional info here if needed
      console.error("Kuryer qo'shishda xatolik:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        bg="#B5D8CA80"
        _hover={{ bg: "primary.light", color: "white" }}
        onClick={() => setIsOpen(true)}
      >
        <IoIosAddCircleOutline />
        Kuryer qo‘shish
      </Button>
      {isOpen && (
        <Dialog.Root 
        open={isOpen} 
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            borderRadius="2xl"
            maxW="650px"
            w="full"
            p={6}
            boxShadow="xl"
          >
              <Dialog.Header mb={3}>
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="bold"
                  fontFamily="systemUiB"
                >
                  Kuryerlar qo‘shish
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" onClick={resetAll} />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body mb={12}>
                <Box bg="white" borderRadius="md" p={4}>
                  <Flex gap={3} mb={4}>
                    <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                      <Input
                        placeholder="Ism"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        bg="white"
                        borderColor="gray.400"
                        _focus={{
                          borderColor: "primary.light",
                          boxShadow: "0 0 0 1px #379570",
                        }}
                      />
                    </InputGroup>
                    <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                      <Input
                        placeholder="Familiya"
                        value={formData.surname}
                        onChange={(e) =>
                          setFormData({ ...formData, surname: e.target.value })
                        }
                        bg="white"
                        borderColor="gray.400"
                        _focus={{
                          borderColor: "primary.light",
                          boxShadow: "0 0 0 1px #379570",
                        }}
                      />
                    </InputGroup>
                  </Flex>

                  <Flex gap={3} mb={4} >
                    <InputGroup
                      flex={1}
                      startElement={<MdLocalShipping color="#adb5bd" />}
                    >
                      <Select.Root
                        value={formData.transport ? [formData.transport] : []}
                        onValueChange={(details) => {
                          const selectedValue = details.value[0];
                          setFormData({ ...formData, transport: selectedValue });
                        }}
                        collection={transportTypes}
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
                            marginTop="-160px"
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

                    
                    <InputGroup flex={1} startElement={<MdPhone color="#adb5bd" />}>
                      <PhoneInput 
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                      />
                    </InputGroup>

                  </Flex>

                  <InputGroup startElement={<MdLock color="#adb5bd" />} mb={4}>
                    <Input
                      placeholder="Parol"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      bg="white"
                      borderColor="gray.400"
                      _focus={{
                        borderColor: "primary.light",
                        boxShadow: "0 0 0 1px #379570",
                      }}
                    />
                  </InputGroup>

                  <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                    {pazandalarCollection.items.length > 0 ? (
                      <Select.Root
                        value={formData.bazars ? [formData.bazars] : []}
                        onValueChange={(details) => {
                          const selectedValue = details.value[0];
                          console.log("Selected cook value:", selectedValue);
                          setFormData({ ...formData, bazars: selectedValue });
                        }}
                        collection={pazandalarCollection}
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
                            placeholder="Pazandani tanlang (majburiy)"
                          >
                            {formData.bazars
                              ? pazandalarCollection.items.find(
                                  (i) => i.value === formData.bazars
                                )?.label || "Pazandani tanlang (majburiy)"
                              : "Pazandani tanlang (majburiy)"}
                          </Select.ValueText>
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Positioner>
                          <Select.Content
                            overflowY="scroll"
                            maxHeight="200px"
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
                    ) : (
                      <Input
                        placeholder="Pazandalar mavjud emas"
                        disabled
                        bg="gray.100"
                        borderColor="gray.300"
                      />
                    )}
                  </InputGroup>
                </Box>
              </Dialog.Body>

              <Dialog.Footer mt={6} justify="flex-end">
                <Flex gap={3}>
                  <Button
                    variant="ghost"
                    color="gray.600"
                    _hover={{ color: "primary.light" }}
                    border="1px solid #B5D8CA"
                    onClick={resetAll}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    bg="primary.light"
                    color="white"
                    _hover={{ bg: "green.600" }}
                    px={6}
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    loadingText="Saqlanmoqda..."
                    disabled={isSubmitting}
                  >
                    Saqlash
                  </Button>
                </Flex>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
      </Dialog.Root>
      )}
    </>
  );
};

const transportTypes = createListCollection({
  items: [
    { label: "Yengil moshina", value: "yengil moshina" },
    { label: "Velosiped", value: "velosiped" },
    { label: "Skuter", value: "skuter" },
    { label: "Piyoda", value: "piyoda" }
  ],
});

export default AddCouriers;
