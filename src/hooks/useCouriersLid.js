import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";

export const useCouriersLid = () => {
  const {
    data: couriersLid = [],
    isLoading: loading,
    error,
    refetch: fetchCouriersLid,
  } = useQuery({
    queryKey: ["couriersLid"],
    queryFn: async () => {
      const response = await apiClient.get("/main/admin/couriers/incomplete/");
      return response.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
    refetchInterval: 2 * 60 * 1000, // Auto refresh every 2 minutes - lids change frequently
  });

  // Show error toast if there's an error
  if (error) {
    console.error("Couriers lidni olishda xatolik:", error);
    toaster.create({
      title: "Xatolik yuz berdi",
      description: "Kuryerlar murojaatlarini yuklashda muammo bo'ldi.",
      type: "error",
      duration: 5000,
    });
  }

  return { couriersLid, loading, error, refetch: fetchCouriersLid };
};
