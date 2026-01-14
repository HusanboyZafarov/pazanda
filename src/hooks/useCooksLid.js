import { useState, useEffect } from "react";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster"

export const useCooksLid = () => {
  const [cooksLid, setCooksLid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCooksLid = async () => {
      try {
        const response = await apiClient.get("/main/admin/cooks/incomplete/");
        setCooksLid(response.data);
      } catch (err) {
        console.error("Cooks lidni olishda xatolik:", err);
        toaster.create({
          title: "Xatolik yuz berdi",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCooksLid();
  }, []);

  return { cooksLid, loading };
};
