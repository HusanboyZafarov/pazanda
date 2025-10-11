import React, { useState } from "react";
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
import {
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdLock,
  MdLogin,
} from "react-icons/md";
import SelectComponent from "./SelectComponent";

const AddCookDialog = ({ handleAddCook }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    region: "andijon",
    phone: "",
  });

  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [step, setStep] = useState("form");
  const [isOpen, setIsOpen] = useState(false);

  const resetAll = () => {
    setFormData({ name: "", surname: "", region: "andijon", phone: "" });
    setLoginData({ login: "", password: "" });
    setStep("form");
    setIsOpen(false);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.surname || !formData.phone) return;
    setStep("login");
  };

  const handleLoginSubmit = () => {
    if (!loginData.login || !loginData.password) return;

    const newCook = {
      name: `${formData.name} ${formData.surname}`,
      meals: "0/0",
      rating: "0.0",
      region: formData.region,
      tariff: "Bepul",
      status: "Offline",
      Lid: "False",
      date: new Date().toLocaleDateString("en-GB"),
      phone: formData.phone,
      login: loginData.login,
      password: loginData.password,
    };

    handleAddCook(newCook);
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
          setStep("form");
          setIsOpen(true);
        }}
      >
        <IoIosAddCircleOutline />
        Pazanda qo‘shish
      </Button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.400" />
          <Dialog.Positioner>
            <Dialog.Content
              bg="white"
              borderRadius="2xl"
              maxW={step === "form" ? "550px" : "400px"}
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
                  {step === "form" ? "Pazanda qo‘shish" : "Login parol..."}
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" onClick={resetAll} />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body>
                {step === "form" ? (
                  <Box bg="white" borderRadius="md" p={4}>
                    <Flex gap={3} mb={4}>
                      <InputGroup startElement={<MdPerson color="#adb5bd" />}>
                        <Input
                          placeholder="Ism"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
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
                            setFormData((prev) => ({
                              ...prev,
                              surname: e.target.value,
                            }))
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

                    <Flex gap={3}>
                      <InputGroup
                        flex={1}
                        startElement={<MdLocationOn color="#adb5bd" />}
                      >
                        <Select.Root
                          selected={(item) => item.value === formData.region}
                          onSelect={(item) =>
                            setFormData((prev) => ({
                              ...prev,
                              region: item.value,
                            }))
                          }
                          collection={regions}
                          onChange={(e) => console.log(e.target.value)}
                        >
                          <Select.HiddenSelect />
                          <Select.Trigger
                            flex={1}
                            bg="white"
                            borderColor="gray.400"
                            paddingLeft={"30px"}
                            _focusWithin={{
                              borderColor: "primary.light",
                              boxShadow: "0 0 0 1px #379570",
                            }}
                          >
                            <Select.ValueText placeholder="Hududni tanlang" />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Positioner>
                            <Select.Content>
                              {regions.items.map((item) => (
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
                          placeholder="Tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          bg="white"
                          borderColor="gray.400"
                          type="998 __ ___‑__‑__"
                          _focus={{
                            borderColor: "primary.light",
                            boxShadow: "0 0 0 1px #379570",
                          }}
                        />
                      </InputGroup>
                    </Flex>
                  </Box>
                ) : (
                  <Box bg="white" borderRadius="md" p={4}>
                    <Flex direction="column" gap={4}>
                      <InputGroup startElement={<MdLogin color="#adb5bd" />}>
                        <Input
                          placeholder="Login"
                          value={loginData.login}
                          onChange={(e) =>
                            setLoginData((prev) => ({
                              ...prev,
                              login: e.target.value,
                            }))
                          }
                          bg="white"
                          borderColor="gray.400"
                          _focus={{
                            borderColor: "primary.light",
                            boxShadow: "0 0 0 1px #379570",
                          }}
                        />
                      </InputGroup>
                      <InputGroup startElement={<MdLock color="#adb5bd" />}>
                        <Input
                          placeholder="Parol"
                          type="password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
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
                  </Box>
                )}
              </Dialog.Body>

              <Dialog.Footer mt={6} justify="flex-end">
                <Flex gap={3}>
                  <Button
                    variant="ghost"
                    color="gray.600"
                    _hover={{ color: "primary.light" }}
                    border={"1px solid #B5D8CA"}
                    onClick={resetAll}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    bg="primary.light"
                    color="white"
                    _hover={{ bg: "green.600" }}
                    px={6}
                    borderRadius="xl"
                    onClick={
                      step === "form" ? handleFormSubmit : handleLoginSubmit
                    }
                  >
                    {step === "form" ? "Keyingi" : "Saqlash"}
                  </Button>
                </Flex>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

const regions = createListCollection({
  items: [
    { label: "Toshkent", value: "toshkent" },
    { label: "Andijon", value: "andijon" },
    { label: "Namangan", value: "namangan" },
    { label: "Farg'ona", value: "fargona" },
    { label: "Samarqand", value: "samarqand" },
    { label: "Buxoro", value: "buxoro" },
    { label: "Xiva", value: "xiva" },
    { label: "Nukus", value: "nukus" },
    { label: "Termiz", value: "termiz" },
    { label: "Guliston", value: "guliston" },
    { label: "Jizzax", value: "jizzax" },
    { label: "Navoiy", value: "navoiy" },
    { label: "Qo‘qon", value: "qoqon" },
  ],
});

export default AddCookDialog;
