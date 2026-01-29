import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";

const useCouriers = () => {
  const queryClient = useQueryClient();

  // 📌 Fetch couriers list with React Query
  const {
    data: couriers = [],
    isLoading: loading,
    error,
    refetch: fetchCouriers,
  } = useQuery({
    queryKey: ["couriers"],
    queryFn: async () => {
      const response = await apiClient.get("/main/admin/couriers/");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // ➕ Add courier mutation
  const addCourierMutation = useMutation({
    mutationFn: async (courierData) => {
      console.log("SENT courierData:", courierData);
      
      const response = await apiClient.post(
        "/main/admin/couriers/create/",
        courierData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch couriers
      queryClient.invalidateQueries({ queryKey: ["couriers"] });
      
      const courierName = data?.full_name || variables.full_name || "Kuryer";
      toaster.create({
        title: "Kuryer qo'shildi",
        description: `${courierName} muvaffaqiyatli qo'shildi.`,
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Kuryer qo'shishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Kuryer qo'shishda muammo bo'ldi.",
        type: "error",
      });
    },
  });

  // ✏️ Edit courier mutation
  const editCourierMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      console.log('Received data in editCourier:', JSON.stringify(updatedData, null, 2));
      
      const payload = {
        ...updatedData, // Keep all the data as is
      };
      
      console.log('Sending to API:', JSON.stringify(payload, null, 2));
      
      const response = await apiClient.put(
        `/main/admin/couriers/${id}/update/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log('API Response:', response.data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch couriers
      queryClient.invalidateQueries({ queryKey: ["couriers"] });
      
      toaster.create({
        title: "O'zgarish saqlandi",
        description: "Kuryer ma'lumotlari yangilandi.",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Kuryerni tahrirlashda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: err.response?.data?.detail || "Kuryer ma'lumotlarini yangilashda muammo bo'ldi.",
        type: "error",
      });
    },
  });

  // 🗑 Delete courier mutation
  const deleteCourierMutation = useMutation({
    mutationFn: async (courierId) => {
      await apiClient.delete(`/main/admin/couriers/${courierId}/delete/`);
      return courierId;
    },
    onSuccess: (deletedId) => {
      // Optimistic update - remove from cache immediately
      queryClient.setQueryData(["couriers"], (oldData) =>
        oldData.filter((courier) => courier.user !== deletedId)
      );
      
      toaster.create({
        title: "Kuryer o'chirildi",
        description: "Kuryer muvaffaqiyatli o'chirildi.",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Kuryerni o'chirishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Kuryerni o'chirishda muammo bo'ldi.",
        type: "error",
      });
      // Refetch on error to restore correct state
      queryClient.invalidateQueries({ queryKey: ["couriers"] });
    },
  });

  const addCourier = (courierData) => addCourierMutation.mutate(courierData);
  const editCourier = (id, updatedData) => editCourierMutation.mutate({ id, updatedData });
  const deleteCourier = (courierId) => deleteCourierMutation.mutate(courierId);

  return {
    couriers,
    loading,
    error,
    addCourier,
    editCourier,
    deleteCourier,
    fetchCouriers,
    isAdding: addCourierMutation.isPending,
    isEditing: editCourierMutation.isPending,
    isDeleting: deleteCourierMutation.isPending,
  };
};

export default useCouriers;
