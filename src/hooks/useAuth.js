import { useCallback, useEffect, useMemo, useState } from "react";
import apiClient from "../services/api-Client";
import { getToken, removeToken } from "../services/Token";
import { toaster } from "@/components/ui/toaster";

export default function useAuth() {
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = useMemo(() => Boolean(token), [token]);

  const login = useCallback(async ({ phone, password }) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("password", password);

      const { data } = await apiClient.post(
        "/main/login/password/",
        formData
      );

      const accessToken = data?.access;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
      }

      return {
        success: Boolean(accessToken),
        access: data?.access ?? null,
        refresh: data?.refresh ?? null,
        isRegistered: data?.is_registered ?? null,
      };
    } catch (e) {
      const message =
        e?.response?.data?.detail || e?.message || "Login failed";

      // ✅ CHAKRA UI TOASTER
      toaster.create({
        title: "Xatolik",
        description: message,
        type: "error",
        duration: 3000,
        closable: true,
      });

      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setToken(null);

    toaster.create({
      title: "Chiqildi",
      description: "Siz tizimdan chiqdingiz",
      type: "info",
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    const onStorage = (evt) => {
      if (evt.key === "token") {
        setToken(evt.newValue);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
}
