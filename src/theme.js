import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import "./fonts.css";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          light: { value: "#4dc293ff" },
          dark: { value: "rgb(0, 0, 0)" },
          gradient: { value: "linear-gradient(to right, #F12D12, #FFAA00)" },
          red: {
            value: "#ef233c",
            100: { value: "#ef233c" },
            200: { value: "#eb2d43ff" }
          },
        },
        gray: {
          100: { value: "#ffffff" },
          200: { value: "#f4f7fa" },
          300: { value: "#f8f9fa" },
          400: { value: "#d9d9d9" },
          500: { value: "#adb5bd" },
          600: { value: "#364356" },
        },
        white: {
          value: "#ffffff",
          100: { value: "#ffffff" },
          200: { value: "#f4f7fa" },
          300: { value: "#f8f9fa" },
          400: { value: "#d9d9d9" },
          500: { value: "#adb5bd" },
          600: { value: "#364356" },
        },
        warning: {
          value: "#FED430",
        },
        error: {
          value: "#ef233c",
        },
        success: {
          value: "#52b788",
        },
      },
      fonts: {
        systemUiB: { value: "system-ui-b" },
        systemUiSm: { value: "system-ui-sm" },
        systemUiM: { value: "system-ui-m" },
      },
    },
  },
});

export default customConfig;
export const system = createSystem(customConfig, defaultConfig);
