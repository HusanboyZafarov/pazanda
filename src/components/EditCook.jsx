import React, { useState, useEffect, useMemo } from "react";
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
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (cook) setFormData(cook);
  }, [cook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
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
                  {[
                    { name: "name", label: "Ism" },
                    { name: "lastname", label: "Familiya" },
                    { name: "meals", label: "Ovqat soni" },
                    { name: "rating", label: "Reyting" },
                  ].map(({ name, label }) => (
                    <Box key={name}>
                      <Text mb={1} fontSize="sm" fontWeight="medium">
                        {label}
                      </Text>
                      <Input
                        name={name}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        placeholder={label}
                      />
                    </Box>
                  ))}
                </Box>

                <Box flex="1" display="flex" flexDirection="column" gap={4}>
                  {[
                    { name: "region", label: "Hudud" },
                    { name: "tariff", label: "Tarif" },
                    { name: "phone", label: "Telefon raqami" },
                  ].map(({ name, label }) => (
                    <Box key={name}>
                      <Text mb={1} fontSize="sm" fontWeight="medium">
                        {label}
                      </Text>
                      <Input
                        name={name}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        placeholder={label}
                      />
                    </Box>
                  ))}
{/* 
                  <Box>
                    <Text mb={1} fontSize="sm" fontWeight="medium">
                      Lid holati
                    </Text>
                    <Switch.Root
                      isChecked={formData.Lid === "True"}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          Lid: checked ? "True" : "False",
                        }))
                      }
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                      <Switch.Label ml={2}>
                        {formData.Lid === "True"
                          ? "Lid holati yoqilgan"
                          : "Yoqilgan emas"}
                      </Switch.Label>
                    </Switch.Root>
                  </Box> */}
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

            <Dialog.CloseTrigger asChild onClick={onClose}>
              <Box
                as="button"
                bg="gray.100"
                borderRadius="full"
                p={1}
                _hover={{ bg: "gray.200" }}
                position="absolute"
                right="2"
                top="2"
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
