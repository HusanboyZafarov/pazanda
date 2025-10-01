import React, { useState } from "react";
import { Box, Flex, Text, Button, Portal, Dialog } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LuCalendarCheck2 } from "react-icons/lu";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NotificationDialog = () => {
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

  const timeOptions = Array.from({ length: 24 }, (_, i) =>
    dayjs().hour(i).minute(0).format("HH:mm")
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant="outline"
          bg="#B5D8CA80"
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
            bg="#F9FAFB"
            borderRadius="xl"
            maxW="550px"
            height="500px"
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

              <Box mb={4}>
                <Text fontWeight="bold" fontSize="sm">
                  Lorem ipsum dolor sit amet.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Box>

            <Flex
              gap={3}
              mb={6}
              flexDirection={{ base: "column", sm: "row" }}
              justify="space-between"
              width="100%"
            >
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

            <Flex justify="flex-end" mt={"150px"}>
              <Dialog.Footer>
                <Button
                  bg="primary.light"
                  color="white"
                  _hover={{ bg: "green.500" }}
                  px={6}
                  borderRadius="xl"
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
