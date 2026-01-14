import { useState, useEffect } from "react";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";

const useCouriers = () => {
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📌 Couriers list (incomplete)
  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          "/main/admin/couriers/incomplete/"
        );
        setCouriers(response.data);
      } catch (err) {
        console.error("Kuryerlarni olishda xatolik:", err);
        setError(err.message || "Xatolik yuz berdi");
        toaster.create({
          title: "Xatolik yuz berdi",
          description: "Kuryerlar ro‘yxatini yuklashda muammo bo‘ldi.",
          type: "error",
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCouriers();
  }, []);

  // ➕ Add courier
  const addCourier = async (courierData) => {
    try {
      const response = await apiClient.post(
        "/main/admin/couriers/create/",
        courierData
      );
      setCouriers((prev) => [...prev, response.data]);
      toaster.create({
        title: "Kuryer qo‘shildi",
        description: "Kuryer muvaffaqiyatli qo‘shildi.",
        type: "success",
      });
    } catch (err) {
      console.error("Kuryer qo‘shishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Kuryer qo‘shishda muammo bo‘ldi.",
        type: "error",
      });
    }
  };

  // ✏️ Edit courier
  const editCourier = async (id, updatedData) => {
    try {
      const response = await apiClient.put(
        `/main/admin/couriers/${id}/update/`,
        updatedData
      );
      setCouriers((prev) =>
        prev.map((courier) =>
          courier.id === id ? response.data : courier
        )
      );
      toaster.create({
        title: "O‘zgarish saqlandi",
        description: "Kuryer ma‘lumotlari yangilandi.",
        type: "success",
      });
    } catch (err) {
      console.error("Kuryerni tahrirlashda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Kuryer ma‘lumotlarini yangilashda muammo bo‘ldi.",
        type: "error",
      });
    }
  };

  // 🗑 Delete courier
  const deleteCourier = async (courierId) => {
    try {
      await apiClient.delete(
        `/main/admin/couriers/${courierId}/delete/`
      );
      setCouriers((prev) =>
        prev.filter((courier) => courier.id !== courierId)
      );
      toaster.create({
        title: "Kuryer o‘chirildi",
        description: "Kuryer muvaffaqiyatli o‘chirildi.",
        type: "success",
      });
    } catch (err) {
      console.error("Kuryerni o‘chirishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Kuryerni o‘chirishda muammo bo‘ldi.",
        type: "error",
      });
    }
  };

  return {
    couriers,
    setCouriers,
    loading,
    error,
    addCourier,
    editCourier,
    deleteCourier,
  };
};

export default useCouriers;
