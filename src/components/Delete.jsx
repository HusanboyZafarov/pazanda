import React from "react";
import { Dialog, Button, Portal, Box } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";

const Delete = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content
            bg="#F9FAFB"
            borderRadius="xl"
            maxW="400px"
            height="300px"
            w="full"
            p={6}
            boxShadow="lg"
          >
            <Dialog.Header fontSize="xl" fontWeight="bold">
              O'chirishni xohlaysizmi?
            </Dialog.Header>
            <Dialog.Body>
              Rostan ham ushbu pazandani ro‘yxatdan o‘chirmoqchimisiz?
            </Dialog.Body>
            <Dialog.Footer mt={4} gap={3} justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                Yo‘q
              </Button>
              <Button
                bg="red.500"
                _hover={{ bg: "red.700" }}
                onClick={onConfirm}
              >
                Ha
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

export default Delete;
