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
import { MdPerson, MdPhone, MdLocalShipping } from "react-icons/md";
import SelectComponent from "./SelectComponent";


const AddCouriers = ({ cooks = [], handleAddCourier }) => {
  const pazandalarCollection = useMemo(
    () =>
      createListCollection({
        items: cooks.map((cook, idx) => ({
          label: `${cook.name}${cook.lastname ? " " + cook.lastname : ""}`,
          value: idx.toString(),
        })),
      }),
    [cooks]
  );

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    transport: "",
    phone: "",
    bazars: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  
  console.log("AddCouriers render - isOpen:", isOpen);

  const resetAll = () => {
    setFormData({
      name: "",
      surname: "",
      transport: "",
      phone: "",
      bazars: "",
    });
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const { name, surname, phone, transport, bazars } = formData;
    if (!name || !surname || !phone || !bazars) return;

    const selected = pazandalarCollection.items.find((i) => i.value === bazars);
    const selectedBazars = selected ? [selected.value] : [];
    const selectedBazarLabels = selected ? [selected.label] : [];

    const newCourier = {
      fullName: `${name} ${surname}`,
      transport,
      phone,
      bazars: selectedBazars,
      bazarLabels: selectedBazarLabels,
      status: "Offline",
      date: new Date().toLocaleDateString("en-GB"),
    };

    handleAddCourier?.(newCourier);
    resetAll();
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        bg="#B5D8CA80"
        _hover={{ bg: "primary.light", color: "white" }}
        onClick={() => {
          console.log("Button clicked, setting isOpen to true");
          setIsOpen(true);
        }}
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

              <Dialog.Body mb={6}>
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
                        selected={(item) => item.value === formData.transport}
                        onSelect={(item) =>
                          setFormData({ ...formData, transport: item.value })
                        }
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

                    <InputGroup
                      flex={1}
                      startElement={<MdPhone color="#adb5bd" />}
                    >
                      <Input
                        placeholder="+998 __ ___‑__‑__"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
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

                  <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                    <Select.Root
                      selected={(item) => item.value === formData.bazars}
                      onSelect={(item) =>
                        setFormData({ ...formData, bazars: item.value })
                      }
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
                          placeholder="Pazandani tanlang"
                          value={
                            pazandalarCollection.items.find(
                              (i) => i.value === formData.bazars
                            )?.label
                          }
                        />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Positioner>
                        <Select.Content
                          overflowY="scroll"
                          maxHeight="80px"
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
  ],
});

export default AddCouriers;
