import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";

export const useCooksLid = () => {
  const {
    data: cooksLid = [],
    isLoading: loading,
    error,
    refetch: fetchCooksLid,
  } = useQuery({
    queryKey: ["cooksLid"],
    queryFn: async () => {
      const response = await apiClient.get("/main/admin/cooks/incomplete/");
      return response.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
    refetchInterval: 2 * 60 * 1000, // Auto refresh every 2 minutes - lids change frequently
  });

  // Show error toast if there's an error
  if (error) {
    console.error("Cooks lidni olishda xatolik:", error);
    toaster.create({
      title: "Xatolik yuz berdi",
      description: "Pazanda murojaatlarini yuklashda muammo bo'ldi.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return { cooksLid, loading, error, refetch: fetchCooksLid };
};
