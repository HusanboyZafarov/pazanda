import React, { useState, useEffect } from "react";
import {
  Dialog,
  Portal,
  Button,
  Box,
  Input,
  Flex,
  Text,
  createListCollection,
  Select,
  InputGroup,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
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

const EditCook = ({ isOpen, onClose, cook, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    rating: "",
    region: "",
    tariff: "",
  });

  useEffect(() => {
    if (isOpen && cook) {
      console.log("EditCook - cook obyekti:", cook);
      
      const nameParts = cook.full_name?.split(" ") || [];
      const name = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      setFormData({
        name,
        lastname,
        phone: cook.phone || cook.phone_number || cook.user_phone || "",
        rating: cook.rating || cook.rating_value || String(cook.rating || ""),
        region: cook.region || cook.address || cook.location || "",
        tariff: cook.tarif || cook.tariff || cook.pricing || "",
      });
    } else if (!isOpen) {
      setFormData({
        name: "",
        lastname: "",
        phone: "",
        rating: "",
        region: "",
        tariff: "",
      });
    }
  }, [isOpen, cook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const payload = {
      full_name: `${formData.name} ${formData.lastname}`.trim(),
      phone: formData.phone,
      rating: formData.rating,
      address: formData.region,
    };

    onSave(payload);
    onClose();
  };
  

  if (!cook) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content
            bg="gray.100"
            borderRadius="xl"
            maxW="600px"
            w="full"
            p={6}
            boxShadow="lg"
          >
            <Dialog.Header>
              <Text fontSize="xl" fontWeight="bold">
                Pazandani tahrirlash
              </Text>
            </Dialog.Header>

            <Dialog.Body>
              <Flex gap={6}>
                <Box flex="1" display="flex" flexDirection="column" gap={4}>
                  <Box>
                    <Text mb={1}>Ism</Text>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <Text mb={1}>Familiya</Text>
                    <Input
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <Text mb={1}>Hudud</Text>

                    <InputGroup flex={1}>
                    <Select.Root
                      collection={regions}
                      value={[formData.region]}               
                      onValueChange={(details) =>
                        setFormData((prev) => ({
                          ...prev,
                          region: details.value[0],        
                        }))
                      }
                      portalled
                    >
                      <Select.HiddenSelect />

                      <Select.Trigger>
                        <Select.ValueText placeholder="Hudud tanlang" />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Positioner>
                        <Select.Content maxH="200px" overflowY="auto" zIndex={9999}>
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
                  </Box>
                </Box>

                <Box flex="1" display="flex" flexDirection="column" gap={4}>
                  <Box>
                    <Text mb={1}>Telefon raqami</Text>
                    <PhoneInput 
                      value={formData.phone}
                      onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                    />
                  </Box>
                  <Box>
                    <Text mb={1}>Reyting</Text>
                    <Input
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                    />
                  </Box>


                  <Box>
                    <Text mb={1}>Tarif</Text>
                    <Input
                      name="tariff"
                      value={formData.tariff}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
              </Flex>
            </Dialog.Body>

            <Dialog.Footer mt={6} gap={3} justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                Bekor qilish
              </Button>
              <Button
                bg="primary.light"
                _hover={{ bg: "primary.dark" }}
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

export default EditCook;
