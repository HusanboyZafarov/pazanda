import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";

const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users with React Query
  const {
    data: users = [],
    isLoading: loading,
    error,
    refetch: fetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiClient.get("/main/admin/customers/");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Activate user mutation
  const activateUserMutation = useMutation({
    mutationFn: async (userId) => {
      await apiClient.post(`/main/users/activate/${userId}/`);
    },
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ["users"] });
      
      toaster.create({
        title: "O'zgarish saqlandi",
        description: "Foydalanuvchi faollashtirildi.",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Foydalanuvchini faollashtirishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Foydalanuvchini faollashtirishda muammo bo'ldi.",
        type: "error",
      });
    },
  });

  // Deactivate user mutation
  const deactivateUserMutation = useMutation({
    mutationFn: async (userId) => {
      await apiClient.post(`/main/users/deactivate/${userId}/`);
    },
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ["users"] });
      
      toaster.create({
        title: "O'zgarish saqlandi",
        description: "Foydalanuvchi bloklandi.",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Foydalanuvchini bloklashda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Foydalanuvchini bloklashda muammo bo'ldi.",
        type: "error",
      });
    },
  });

  const activateUser = (userId) => activateUserMutation.mutate(userId);
  const deactivateUser = (userId) => deactivateUserMutation.mutate(userId);

  const toggleUserStatus = (userId, isActive) => {
    if (isActive) {
      activateUser(userId);
    } else {
      deactivateUser(userId);
    }
  };

  return {
    users,
    loading,
    error,
    toggleUserStatus,
    activateUser,
    deactivateUser,
    fetchUsers,
    isActivating: activateUserMutation.isPending,
    isDeactivating: deactivateUserMutation.isPending,
  };
};

export default useUsers;
