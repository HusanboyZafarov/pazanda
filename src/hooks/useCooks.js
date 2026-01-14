import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api-Client";
import { toaster } from "@/components/ui/toaster";

const useCooks = () => {
  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/main/admin/cooks/");
      setCooks(response.data);
    } catch (err) {
      console.error("Pazandalarni olishda xatolik:", err);
      setError(err.message || "Xatolik yuz berdi");
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Pazandalar ro'yxatini yuklashda muammo bo'ldi.",
        type: "error",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCooks();
  }, [fetchCooks]);

  const addCook = async (cookData) => {
    try {
      const response = await apiClient.post("/main/admin/cooks/create/", cookData);
      // Yangi cook qo'shilgandan keyin ro'yxatni qaytadan yuklaymiz,
      // chunki backenddan keladigan javob har doim ham to'liq obyekt bo'lmasligi mumkin.
      await fetchCooks();
      const cookName = response.data?.full_name || cookData.full_name || "Pazanda";
      toaster.create({
        title: "Pazanda qo'shildi",
        description: `${cookName} muvaffaqiyatli qo'shildi.`,
        type: "success",
      });
    } catch (err) {
      console.error("Pazanda qo'shishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Pazanda qo'shishda muammo bo'ldi.",
        type: "error",
      });
      throw err; // Xatolikni yuqoriga tashlaymiz, shunda AddCookDialog dialogni yopmasligini biladi
    }
  };

  const editCook = async (id, updatedData) => {
    try {
      const response = await apiClient.put(`/main/admin/cooks/${id}/update/`, updatedData);
      // Yangilashdan keyin ro'yxatni qaytadan yuklaymiz,
      // chunki backenddan keladigan javob har doim ham to'liq obyekt bo'lmasligi mumkin.
      await fetchCooks();
      toaster.create({
        title: "O'zgarish saqlandi",
        description: "Pazanda ma'lumotlari yangilandi.",
        type: "success",
      });
    } catch (err) {
      console.error("Pazandani tahrirlashda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Pazanda ma'lumotlarini yangilashda muammo bo'ldi.",
        type: "error",
      });
      throw err; // Xatolikni yuqoriga tashlaymiz
    }
  };

  const deleteCook = async (id) => {
    try {
      await apiClient.delete(`/main/admin/cooks/${id}/delete/`);
      setCooks((prev) => prev.filter((cook) => cook.user !== id));
      toaster.create({
        title: "Pazanda o'chirildi",
        description: "Pazanda muvaffaqiyatli ro'yxatdan o'chirildi.",
        type: "success",
      });
    } catch (err) {
      console.error("Pazandani o'chirishda xatolik:", err);
      toaster.create({
        title: "Xatolik yuz berdi",
        description: "Pazandani o'chirishda muammo bo'ldi.",
        type: "error",
      });
    }
  };

  return { cooks, setCooks, loading, error, addCook, editCook, deleteCook };
};

export default useCooks;
