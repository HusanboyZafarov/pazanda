import React, { useMemo, useState, useCallback } from "react";
import { Box, Text, Flex, ButtonGroup, Button } from "@chakra-ui/react";
import TotalNumber from "../components/totalNumber";
import { Chart, useChart } from "@chakra-ui/charts";
import useDashboard from "../hooks/useDashboard";
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
  const { data: dashboard } = useDashboard();
  const userCount = useMemo(() => dashboard?.user_count ?? 0, [dashboard]);
  const cookCount = useMemo(() => dashboard?.cook_count ?? 0, [dashboard]);
  const courierCount = useMemo(() => dashboard?.courier_count ?? 0, [dashboard]);

  const tariffPie = useMemo(() => {
    const colors = ["#5654D4", "#ED64A6", "#ED8936", "#4299E1", "#38A169", "#F6AD55"];
    const stats = dashboard?.tariff_stats || [];
    return stats.map((s, idx) => ({ name: s.title, value: s.count ?? s.percent ?? 0, color: colors[idx % colors.length] }));
  }, [dashboard]);
  const buyurtmaChart = useChart({ data: tariffPie });

  const [periodType, setPeriodType] = useState("haftalik");

  const getISOWeekKey = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
  };

  const getMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const getYearKey = (date) => `${date.getFullYear()}`;

  const aggregateIncome = useCallback((periods, type) => {
    const groups = new Map();
    const getKey = (d) => (type === "yillik" ? getYearKey(d) : type === "oylik" ? getMonthKey(d) : getISOWeekKey(d));
    periods.forEach((p) => {
      const d = new Date(p.period);
      const key = getKey(d);
      if (!groups.has(key)) groups.set(key, {});
      const group = groups.get(key);
      (p.tariffs || []).forEach((t) => {
        const prev = group[t.title] || 0;
        group[t.title] = prev + (t.income ?? 0);
      });
    });
    return Array.from(groups.entries()).map(([name, values]) => ({ name, ...values }));
  }, []);

  const incomeRows = useMemo(() => {
    const periods = dashboard?.income_by_period || [];
    return aggregateIncome(periods, periodType);
  }, [dashboard, periodType, aggregateIncome]);

  const uniqueTariffTitles = useMemo(() => {
    const set = new Set();
    incomeRows.forEach((row) => Object.keys(row).forEach((k) => k !== "name" && set.add(k)));
    return Array.from(set);
  }, [incomeRows]);

  return (
    <Box p={0}>
      <TotalNumber userCount={userCount} cookCount={cookCount} courierCount={courierCount} />

      <Flex gap={4} mt={4} wrap="wrap" >
        <Box
          border="1px solid #E2E8F0"
          bg={"white"}
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent="center"
          p={4}
          width="250px"
          height="250px"
          borderRadius="2xl"
        >
          <Text fontWeight="bold" alignSelf="flex-start" mb={2}>Tariflar</Text>
          <Chart.Root boxSize="180px" mx="auto" chart={buyurtmaChart}  >
            <PieChart>
              <Tooltip
                cursor={false}
                animationDuration={100}
                
                content={<Chart.Tooltip hideLabel />}
              />
              <Pie isAnimationActive={true} data={buyurtmaChart.data} dataKey={buyurtmaChart.key("value")}>
                <LabelList
                  position="inside"
                  fill="white"
                  stroke="none"
                  dataKey="name"
                />
                {buyurtmaChart.data.map((item) => (
                  <Cell key={item.name} fill={buyurtmaChart.color(item.color)} />
                ))}
              </Pie>
            </PieChart>
          </Chart.Root>
          <Text>Tur soni: {buyurtmaChart.data.length}</Text>
        </Box>

        <Box
          flex="1"
          border="1px solid #E2E8F0"
          bg={"white"}
          borderRadius="2xl"
          p={4}
          height="250px"
          width="1100px"
          minWidth="400px"
        >
          <Flex justify="space-between" mb={2}>
            <Text fontWeight="bold">Daromad bo'yicha tariflar</Text>
            <ButtonGroup size="sm" isAttached>
              {(["Haftalik", "Oylik", "Yillik"]).map((t) => (
                <Button key={t} onClick={() => setPeriodType(t)} variant={periodType === t ? "solid" : "outline"} bg={periodType === t ? "primary.light" : "transparent"} _hover={{ bg: periodType === t ? "primary.light" : "gray.100" }}>
                  {t}
                </Button>
              ))}
            </ButtonGroup>
          </Flex>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={incomeRows} barSize={40}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {uniqueTariffTitles.map((title, idx) => (
                <Bar key={title} dataKey={title} stackId="a" fill={["#5654D4","#4299E1","#ED8936","#ED64A6","#38A169","#F6AD55"][idx % 6]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <Text mt={2}>Umumiy tushum: {dashboard?.total_tariff_income ?? 0}</Text>
        </Box>
      </Flex>

      <Flex gap={4} mt={4} wrap="wrap">
        <Box
          border="1px solid #E2E8F0"
          bg={"white"}
          borderRadius="2xl"
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent="center"
          p={4}
          width="250px"
          height="250px"
        >
          <Text fontWeight="bold" alignSelf="flex-start">Tariflar bo'linishi</Text>
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
          <Text>Tur soni: {buyurtmaChart.data.length}</Text>
        </Box>

        <Box
          flex="1"
          border="1px solid #E2E8F0"
          bg={"white"}
          borderRadius="2xl"
          p={4}
          height="250px"
          width="1100px"
          minWidth="400px"
        >
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={incomeRows} barCategoryGap={20} barGap={5}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {uniqueTariffTitles.map((title, idx) => (
                <Bar key={title} dataKey={title} fill={["#5654D4","#4299E1","#ED8936","#ED64A6","#38A169","#F6AD55"][idx % 6]} name={title} />
              ))}
            </BarChart>
          </ResponsiveContainer>

          <Flex justify="space-between" mt={2}>
            <Text>Periodlar: {incomeRows.length}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
