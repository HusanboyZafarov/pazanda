import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";

const useCooks = () => {
  const queryClient = useQueryClient();

  // Fetch cooks with React Query
  const {
    data: cooks = [],
    isLoading: loading,
    error,
    refetch: fetchCooks,
  } = useQuery({
    queryKey: ["cooks"],
    queryFn: async () => {
      const response = await apiClient.get("/main/admin/cooks/");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Add cook mutation
  const addCookMutation = useMutation({
    mutationFn: async (cookData) => {
      const response = await apiClient.post("/main/admin/cooks/create/", cookData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch cooks
      queryClient.invalidateQueries({ queryKey: ["cooks"] });
      
      const cookName = data?.full_name || variables.full_name || "Pazanda";
      toaster.create({
        title: "Pazanda qo'shildi",
        description: `${cookName} muvaffaqiyatli qo'shildi.`,
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Pazanda qo'shishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Pazanda qo'shishda muammo bo'ldi.",
        type: "error",
      });
    },
  });

  // Edit cook mutation
  const editCookMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await apiClient.put(`/main/admin/cooks/${id}/update/`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch cooks
      queryClient.invalidateQueries({ queryKey: ["cooks"] });
      
      toaster.create({
        title: "O'zgarish saqlandi",
        description: "Pazanda ma'lumotlari yangilandi.",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Pazandani tahrirlashda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Pazanda ma'lumotlarini yangilashda muammo bo'ldi.",
        type: "error",
      });
    },
  });

  // Delete cook mutation
  const deleteCookMutation = useMutation({
    mutationFn: async (id) => {
      await apiClient.delete(`/main/admin/cooks/${id}/delete/`);
      return id;
    },
    onSuccess: (deletedId) => {
      // Optimistic update - remove from cache immediately
      queryClient.setQueryData(["cooks"], (oldData) => 
        oldData.filter((cook) => cook.user !== deletedId)
      );
      
      toaster.create({
        title: "Pazanda o'chirildi",
        description: "Pazanda muvaffaqiyatli ro'yxatdan o'chirildi.",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Pazandani o'chirishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Pazandani o'chirishda muammo bo'ldi.",
        type: "error",
      });
      // Refetch on error to restore correct state
      queryClient.invalidateQueries({ queryKey: ["cooks"] });
    },
  });

  const addCook = (cookData) => addCookMutation.mutate(cookData);
  const editCook = (id, updatedData) => editCookMutation.mutate({ id, updatedData });
  const deleteCook = (id) => deleteCookMutation.mutate(id);

  return { 
    cooks, 
    loading, 
    error, 
    addCook, 
    editCook, 
    deleteCook, 
    fetchCooks,
    isAdding: addCookMutation.isPending,
    isEditing: editCookMutation.isPending,
    isDeleting: deleteCookMutation.isPending,
  };
};

export default useCooks;
