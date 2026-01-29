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
        boxShadow: "0 0 0 1px token(colors.primary.light)",
      }}
    />
  );
};

const AddCookDialog = ({ handleAddCook }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "andijon", // Region address sifatida
    phone: "",
  });

  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [step, setStep] = useState("form");
  const [isOpen, setIsOpen] = useState(false);

  const resetAll = () => {
    setFormData({ 
      name: "", 
      surname: "", 
      address: "andijon", 
      phone: "" 
    });
    setLoginData({ login: "", password: "" });
    setStep("form");
    setIsOpen(false);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.surname || !formData.phone || !formData.address) return;
    setStep("login");
  };

  const handleLoginSubmit = async () => {
    if (!loginData.login || !loginData.password) return;

    const newCook = {
      full_name: `${formData.name} ${formData.surname}`,
      address: formData.address, // Region address sifatida
      region: formData.address, // Agar backendda region ham kerak bo'lsa
      phone: formData.phone,
      login: loginData.login,
      password: loginData.password,
      // Qo'shimcha default qiymatlar
      meals: "0/0",
      rating: "0.0",
      tariff: "Bepul",
      status: "Offline",
      Lid: "False",
      date: new Date().toLocaleDateString("en-GB"),
    };

    try {
      await handleAddCook(newCook);
      resetAll();
    } catch (error) {
      // Xatolik bo'lsa, dialog ochiq qoladi
      console.error("Pazanda qo'shishda xatolik:", error);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        bg="primary.white"
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
                  {step === "form" ? "Pazanda qo'shish" : "Login parol..."}
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" onClick={resetAll} />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body>
                {step === "form" ? (
                  <Box bg="white" borderRadius="md" p={4}>
                    <Flex gap={3} mb={4}>
                      <InputGroup startElement={<MdPerson color="gray.500" />}>
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
                            borderColor: "primary.600",
                            boxShadow: `0 0 0 1px primary.600`,
                          }}
                        />
                      </InputGroup>
                      <InputGroup startElement={<MdPerson color="gray.500" />}>
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
                            borderColor: "primary.600",
                            boxShadow: `0 0 0 1px primary.600`,
                          }}
                        />
                      </InputGroup>
                    </Flex>

                    <Flex gap={3} mb={4}>
                      <InputGroup
                        flex={1}
                        startElement={<MdLocationOn color="gray.500" />}
                      >
                        <Select.Root
                          value={formData.address ? [formData.address] : []}
                          onValueChange={(details) =>
                            setFormData((prev) => ({
                              ...prev,
                              address: details.value[0],
                            }))
                          }
                          collection={regions}
                        >
                          <Select.HiddenSelect />
                          <Select.Trigger
                            flex={1}
                            bg="white"
                            borderColor="gray.400"
                            paddingLeft={"30px"}
                            _focusWithin={{
                              borderColor: "primary.600",
                              boxShadow: `0 0 0 1px primary.600`,
                            }}
                          >
                            <Select.ValueText placeholder="Manzil (Hudud)" />
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
                        startElement={<MdPhone color="gray.500" />}
                      >
                        <PhoneInput 
                          value={formData.phone}
                          onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                        />
                      </InputGroup>
                    </Flex>
                  </Box>
                ) : (
                  <Box bg="white" borderRadius="md" p={4}>
                    <Flex direction="column" gap={4}>
                      <InputGroup startElement={<MdLogin color="gray.500" />}>
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
                            borderColor: "primary.600",
                            boxShadow: `0 0 0 1px primary.600`,
                          }}
                        />
                      </InputGroup>
                      <InputGroup startElement={<MdLock color="gray.500" />}>
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
                            borderColor: "primary.600",
                            boxShadow: `0 0 0 1px primary.600`,
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
                    border={"1px solid"}
                    borderColor="gray.400"
                    onClick={resetAll}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    bg="primary.light"
                    color="white"
                    _hover={{ bg: "primary.dark" }}
                    px={6}
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
    { label: "Qo'qon", value: "qoqon" },
  ],
});

export default AddCookDialog;