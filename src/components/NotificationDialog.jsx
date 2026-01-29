import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Portal,
  Dialog,
} from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { toaster } from "@/components/ui/toaster";

import { LuCalendarCheck2 } from "react-icons/lu";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NotificationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(dayjs().format("HH:mm"));
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const handleMonthChange = (dir) => {
    setSelectedDate((prev) => dayjs(prev).add(dir, "month").toDate());
  };

  const handleTimeChange = (dir) => {
    const newTime = dayjs(`2000-01-01T${selectedTime}`)
      .add(dir, "minute")
      .format("HH:mm");
    setSelectedTime(newTime);
  };
  const handleSubmit = () => {
    const id = "send-toast";

    toaster.loading({
      id,
      title: "Yuborilmoqda...",
      description: "Iltimos, kuting ",
    });

    setTimeout(() => {
      toaster.update(id, {
        title: "Muvaffaqiyatli yuborildi",
        description: "Bildirishnoma muvaffaqiyatli jo'natildi.",
        type: "success",
        duration: 3000, 
      });

      setIsOpen(false);
    }, 2000);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) =>
    dayjs().hour(i).minute(0).format("HH:mm")
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant="outline"
          bg="primary.white"
          _hover={{ bg: "primary.light", color: "white" }}
        >
          <IoMdNotificationsOutline />
          Bildirishnoma
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="primary.white"
            borderRadius="xl"
            maxW="550px"
            height="420px"
            w="full"
            p={6}
            boxShadow="lg"
          >
            <Box bg={"white"} borderRadius="md" p={4} mb={4} mt={6}>
              <Flex justify="space-between" align="center" mb={4}>
                <Dialog.Title fontSize="lg" fontWeight="bold">
                  Bildirishnoma
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <Box
                    as="button"
                    bg="gray.100"
                    borderRadius="full"
                    p={1}
                    _hover={{ bg: "gray.200" }}
                  >
                    <RxCross2 size={18} />
                  </Box>
                </Dialog.CloseTrigger>
              </Flex>

              {/* <Box mb={4}>
                <Text fontWeight="bold" fontSize="sm">
                  Lorem ipsum dolor sit amet.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box> */}
            </Box>

            {/* Sana va vaqt */}
            <Flex
              gap={3}
              mb={6}
              flexDirection={{ base: "column", sm: "row" }}
              justify="space-between"
              width="100%"
            >
              {/* Sana */}
              <Box position="relative">
                <Flex
                  align="center"
                  bg="white"
                  borderRadius="md"
                  width="250px"
                  height="40px"
                  justifyContent="space-between"
                  p={3}
                  gap="10px"
                  onClick={() => setIsMonthOpen(!isMonthOpen)}
                  cursor="pointer"
                >
                  <LuCalendarCheck2 />
                  <Text>{dayjs(selectedDate).format("MMMM YYYY")}</Text>
                  <Box
                    display="flex"
                    height="25px"
                    justifyContent="center"
                    gap={2}
                    bg="#F9FAFB"
                    borderRadius="md"
                  >
                    <Button
                      size="xs"
                      height="25px"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMonthChange(-1);
                      }}
                    >
                      <FaAngleLeft />
                    </Button>
                    <Button
                      size="xs"
                      height="25px"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMonthChange(1);
                      }}
                    >
                      <FaAngleRight />
                    </Button>
                  </Box>
                </Flex>
                {isMonthOpen && (
                  <Box position="absolute" zIndex={10} mt={2}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setIsMonthOpen(false);
                      }}
                      inline
                    />
                  </Box>
                )}
              </Box>

              {/* Vaqt */}
              <Box position="relative">
                <Flex
                  align="center"
                  bg="white"
                  borderRadius="md"
                  width="250px"
                  height="40px"
                  justifyContent="space-between"
                  p={3}
                  gap="10px"
                  onClick={() => setIsTimeOpen(!isTimeOpen)}
                  cursor="pointer"
                >
                  <AiOutlineClockCircle />
                  <Text>
                    {dayjs(`2000-01-01T${selectedTime}`).format("hh:mm A")}
                  </Text>

                  <Box
                    display="flex"
                    height="25px"
                    justifyContent="center"
                    gap={2}
                    bg="#F9FAFB"
                    borderRadius="md"
                  >
                    <Button
                      size="xs"
                      height="25px"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTimeChange(-5);
                      }}
                    >
                      <FaAngleLeft />
                    </Button>
                    <Button
                      size="xs"
                      height="25px"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTimeChange(5);
                      }}
                    >
                      <FaAngleRight />
                    </Button>
                  </Box>
                </Flex>

                {isTimeOpen && (
                  <Box
                    mt={2}
                    bg="white"
                    p={2}
                    borderRadius="md"
                    boxShadow="md"
                    maxHeight="150px"
                    overflowY="auto"
                    position="absolute"
                    zIndex={10}
                    width="100%"
                  >
                    {timeOptions.map((time) => (
                      <Text
                        key={time}
                        py={1}
                        px={2}
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{ bg: "gray.100" }}
                        onClick={() => {
                          setSelectedTime(time);
                          setIsTimeOpen(false);
                        }}
                      >
                        {dayjs(`2000-01-01T${time}`).format("hh:mm A")}
                      </Text>
                    ))}
                  </Box>
                )}
              </Box>
            </Flex>

            <Flex justify="flex-end" mt="150px">
              <Dialog.Footer>
                <Button
                  bg="primary.light"
                  color="white"
                  _hover={{ bg: "primary.dark" }}
                  px={6}
                  borderRadius="md"
                  onClick={handleSubmit}

                >
                  Yuborish
                </Button>
              </Dialog.Footer>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NotificationDialog;
