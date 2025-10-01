import React, { useState } from "react";
import { Box, Text, Flex, ButtonGroup, Button } from "@chakra-ui/react";
import TotalNumber from "../components/totalNumber";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  PieChart,
  Pie,
  Cell,
  LabelList,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Home = () => {
  const [period, setPeriod] = useState("kunlik");

  const tarifChart = useChart({
    data: [
      { name: "Luxury", value: 189245, color: "#5654D4" },
      { name: "Bepul", value: 120000, color: "#ED64A6" },
      { name: "Standard", value: 100000, color: "#ED8936" },
      { name: "Premium", value: 90800, color: "#4299E1" },
    ],
  });

  const buyurtmaChart = useChart({
    data: [
      { name: "Bekor qilindi", value: 600, color: "#F6AD55" },
      { name: "Yetkazildi", value: 1114, color: "#38A169" },
    ],
  });

  const dataByPeriod = {
    kunlik: [
      { name: "Dush", Luxury: 60, Premium: 40, Standard: 30, Bepul: 20 },
      { name: "Se", Luxury: 55, Premium: 30, Standard: 25, Bepul: 35 },
      { name: "Chor", Luxury: 75, Premium: 50, Standard: 40, Bepul: 45 },
      { name: "Pay", Luxury: 65, Premium: 35, Standard: 30, Bepul: 30 },
      { name: "Ju", Luxury: 50, Premium: 40, Standard: 20, Bepul: 35 },
      { name: "Shan", Luxury: 40, Premium: 35, Standard: 25, Bepul: 30 },
      { name: "Yak", Luxury: 45, Premium: 25, Standard: 20, Bepul: 30 },
    ],
    oylik: [
      { name: "1-hafta", Luxury: 400, Premium: 300, Standard: 200, Bepul: 100 },
      { name: "2-hafta", Luxury: 380, Premium: 310, Standard: 190, Bepul: 120 },
      { name: "3-hafta", Luxury: 420, Premium: 290, Standard: 210, Bepul: 110 },
      { name: "4-hafta", Luxury: 390, Premium: 280, Standard: 180, Bepul: 100 },
    ],
    yillik: [
      { name: "Yanvar", Luxury: 500, Premium: 400, Standard: 300, Bepul: 200 },
      { name: "Fevral", Luxury: 480, Premium: 420, Standard: 280, Bepul: 220 },
      { name: "Mart", Luxury: 520, Premium: 390, Standard: 310, Bepul: 210 },
      { name: "Aprel", Luxury: 600, Premium: 450, Standard: 320, Bepul: 230 },
      { name: "May", Luxury: 550, Premium: 400, Standard: 310, Bepul: 200 },
      { name: "Iyun", Luxury: 530, Premium: 410, Standard: 300, Bepul: 190 },
      { name: "Iyul", Luxury: 570, Premium: 430, Standard: 330, Bepul: 210 },
      { name: "Avgust", Luxury: 590, Premium: 440, Standard: 310, Bepul: 220 },
      {
        name: "Sentyabr",
        Luxury: 560,
        Premium: 420,
        Standard: 290,
        Bepul: 210,
      },
      { name: "Oktabr", Luxury: 500, Premium: 400, Standard: 300, Bepul: 180 },
      { name: "Noyabr", Luxury: 480, Premium: 390, Standard: 280, Bepul: 190 },
      { name: "Dekabr", Luxury: 510, Premium: 410, Standard: 310, Bepul: 200 },
    ],
  };
  
  const orderDataByPeriod = {
    kunlik: [
      { name: "Dush", Yetkazildi: 100, Bekor: 60, Kutilyapti: 50 },
      { name: "Se", Yetkazildi: 90, Bekor: 50, Kutilyapti: 70 },
      { name: "Chor", Yetkazildi: 110, Bekor: 65, Kutilyapti: 60 },
      { name: "Pay", Yetkazildi: 80, Bekor: 45, Kutilyapti: 55 },
      { name: "Ju", Yetkazildi: 120, Bekor: 40, Kutilyapti: 85 },
      { name: "Shan", Yetkazildi: 130, Bekor: 70, Kutilyapti: 90 },
      { name: "Yak", Yetkazildi: 140, Bekor: 60, Kutilyapti: 100 },
    ],
    oylik: [
      { name: "1-hafta", Yetkazildi: 1200, Bekor: 200, Kutilyapti: 150 },
      { name: "2-hafta", Yetkazildi: 1000, Bekor: 180, Kutilyapti: 170 },
      { name: "3-hafta", Yetkazildi: 1300, Bekor: 250, Kutilyapti: 190 },
      { name: "4-hafta", Yetkazildi: 1100, Bekor: 190, Kutilyapti: 140 },
    ],
    yillik: [
      { name: "Yanvar", Yetkazildi: 1200, Bekor: 150, Kutilyapti: 110 },
      { name: "Fevral", Yetkazildi: 1400, Bekor: 180, Kutilyapti: 130 },
      { name: "Mart", Yetkazildi: 1600, Bekor: 200, Kutilyapti: 150 },
      { name: "Aprel", Yetkazildi: 1550, Bekor: 170, Kutilyapti: 160 },
      { name: "May", Yetkazildi: 1450, Bekor: 160, Kutilyapti: 140 },
      { name: "Iyun", Yetkazildi: 1380, Bekor: 150, Kutilyapti: 130 },
      { name: "Iyul", Yetkazildi: 1500, Bekor: 170, Kutilyapti: 160 },
      { name: "Avgust", Yetkazildi: 1600, Bekor: 190, Kutilyapti: 180 },
      { name: "Sentyabr", Yetkazildi: 1550, Bekor: 180, Kutilyapti: 170 },
      { name: "Oktabr", Yetkazildi: 1480, Bekor: 170, Kutilyapti: 160 },
      { name: "Noyabr", Yetkazildi: 1400, Bekor: 160, Kutilyapti: 150 },
      { name: "Dekabr", Yetkazildi: 1700, Bekor: 200, Kutilyapti: 180 },
    ],
  };
  
  const selectValue =  ["kunlik", "oylik", "yillik"]

  return (
    <Box p={4} height="100vh">
      <TotalNumber />

      <Flex gap={4} mt={6} wrap="wrap">
        <Box
          border="1px solid #E2E8F0"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent="center"
          p={4}
          width="250px"
          height="250px"
        >
          <Text fontWeight="bold" mr="165px">
            Tariflar
          </Text>
          <Chart.Root boxSize="220px" mx="auto" chart={tarifChart}>
            <PieChart>
              <Tooltip
                cursor={false}
                animationDuration={100}
                content={<Chart.Tooltip hideLabel />}
              />
              <Pie
                isAnimationActive={true}
                data={tarifChart.data}
                dataKey={tarifChart.key("value")}
              >
                <LabelList
                  position="inside"
                  fill="white"
                  stroke="none"
                  dataKey="name"
                />
                {tarifChart.data.map((item) => (
                  <Cell key={item.name} fill={tarifChart.color(item.color)} />
                ))}
              </Pie>
            </PieChart>
          </Chart.Root>
          <Text>Umumiy: 500.000</Text>
        </Box>

        <Box
          flex="1"
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={4}
          height="250px"
          width="1100px"
        >
          <Flex justify="space-between" mb={2}>
            <Text fontWeight="bold">Pazandalar</Text>
            <ButtonGroup size="sm" isAttached>
              {selectValue.map((key) => (
                <Button
                  key={key}
                  onClick={() => setPeriod(key)}
                  variant={period === key ? "solid" : "outline"}
                  bg={period === key ? "primary.light" : "transparent"}
                  _hover={{ bg: period === key ? "primary.light" : "gray.100" }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Button>
              ))}
            </ButtonGroup>
          </Flex>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={dataByPeriod[period]} barSize={40}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Luxury" stackId="a" fill="#5654D4" />
              <Bar dataKey="Premium" stackId="a" fill="#4299E1" />
              <Bar dataKey="Standard" stackId="a" fill="#ED8936" />
              <Bar dataKey="Bepul" stackId="a" fill="#ED64A6" />
            </BarChart>
          </ResponsiveContainer>
          <Text mt={2}>Tushum: 1.500.000 so'm</Text>
        </Box>
      </Flex>

      <Flex gap={4} mt={6} wrap="wrap">
        <Box
          border="1px solid #E2E8F0"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent="center"
          p={4}
          width="250px"
          height="250px"
        >
          <Text fontWeight="bold" mr="120px">
            Buyurtmalar
          </Text>
          <Chart.Root boxSize="220px" mx="auto" chart={buyurtmaChart}>
            <PieChart>
              <Tooltip
                cursor={false}
                animationDuration={100}
                content={<Chart.Tooltip hideLabel />}
              />
              <Pie
                isAnimationActive={true}
                data={buyurtmaChart.data}
                dataKey={buyurtmaChart.key("value")}
              >
                <LabelList
                  position="inside"
                  fill="white"
                  stroke="none"
                  dataKey="name"
                />
                {buyurtmaChart.data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={buyurtmaChart.color(item.color)}
                  />
                ))}
              </Pie>
            </PieChart>
          </Chart.Root>
          <Text>Umumiy: 1714</Text>
        </Box>

        <Box
          flex="1"
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={4}
          height="250px"
          width="1100px"
        >
          <ResponsiveContainer width="100%" height={190}>
            <BarChart
              data={orderDataByPeriod[period]}
              barCategoryGap={20}
              barGap={5}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Bekor" fill="#F6AD55" name="Bekor qilindi" />
              <Bar dataKey="Yetkazildi" fill="#38A169" name="Yetkazildi" />
            </BarChart>
          </ResponsiveContainer>

          <Flex justify="space-between" mt={2}>
            <Text>Buyurtmalar soni: 1714</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
