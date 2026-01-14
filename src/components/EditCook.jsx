import React, { useState, useEffect } from "react";
import {
  Dialog,
  Portal,
  Button,
  Box,
  Input,
  Flex,
  Text,
  Switch,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";

const EditCook = ({ isOpen, onClose, cook, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    rating: "",
    region: "",
    tariff: "",
  });

  // 🔹 Eski ma’lumotlarni inputlarga joylash
  useEffect(() => {
    // Dialog ochilganda va cook o'zgarganda formani yangilash
    if (isOpen && cook) {
      // Debug: cook obyektini ko'rsatish
      console.log("EditCook - cook obyekti:", cook);
      
      // full_name ni to'g'ri ajratish - birinchi qism ism, qolgani familiya
      const nameParts = cook.full_name?.split(" ") || [];
      const name = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      setFormData({
        name,
        lastname,
        phone: cook.phone || cook.phone_number || cook.user_phone || "",
        rating: cook.rating || cook.rating_value || String(cook.rating || ""),
        // Backenddan kelgan ma'lumotlar address yoki region bo'lishi mumkin
        region: cook.region || cook.address || cook.location || "",
        // Backenddan kelgan ma'lumotlar tarif yoki tariff bo'lishi mumkin
        tariff: cook.tarif || cook.tariff || cook.pricing || "",
      });
    } else if (!isOpen) {
      // Dialog yopilganda formani tozalash
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
      // API da `address` maydoni bor, biz hududni shu yerga yuboramiz
      address: formData.region,
      // Qolgan required bo'lmagan maydonlar backendda default qoladi
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
            bg="#F9FAFB"
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
                    <Text mb={1}>Reyting</Text>
                    <Input
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>

                {/* O‘ng tomoni */}
                <Box flex="1" display="flex" flexDirection="column" gap={4}>
                  <Box>
                    <Text mb={1}>Telefon raqami</Text>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <Text mb={1}>Hudud</Text>
                    <Input
                      name="region"
                      value={formData.region}
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

export default EditCook;
