import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";
  
export default function useDashboard() {
  const {
    data: dashboardData = null,
    isLoading: loading,
    error,
    refetch: fetchDashboard,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await apiClient.get("/main/admin/dashboard/");
      return response.data ?? null;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes - dashboard data changes frequently
    retry: 2,
    refetchInterval: 5 * 60 * 1000, // Auto refresh every 5 minutes
    refetchOnWindowFocus: true, // Refresh when user returns to tab
  });

  // Show error toast if there's an error
  if (error) {
    const message = error?.response?.data?.detail || error?.message || "Failed to load dashboard";
    toaster.create({
      title: "Xatolik",
      description: message,
      status: "error",
    });
  }

  return { 
    data: dashboardData, 
    loading, 
    error, 
    refetch: fetchDashboard 
  };
}


