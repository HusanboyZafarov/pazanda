import { useEffect, useState, useCallback } from "react";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster"
  
export default function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/main/admin/dashboard/");
      setData(response.data ?? null);
    } catch (e) {
      const message = e?.response?.data?.detail || e?.message || "Failed to load dashboard";
      toaster.create({
        title: message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
}


