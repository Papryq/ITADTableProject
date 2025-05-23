import { create } from "zustand";
import dayjs from "dayjs";
import axios from "axios";

const API_URL = "https://itadtableproject.onrender.com/api/auth";
console.log("API_URL:", API_URL);
// const API_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:3000/api/auth"
//     : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  order: null,
  orders: [],
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/orders/`, {
        withCredentials: true,
      });
      set({
        orders: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching orders",
        isLoading: false,
      });
      throw error;
    }
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (name, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        name,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },

  addOrder: async (
    orderNumber,
    orderSystemCount,
    orderNotebookCount,
    orderDateExpiresAt
  ) => {
    set({ isLoading: true, error: null });

    console.log(
      "orderNumber:",
      orderNumber,
      "orderSystemCount",
      orderSystemCount,
      "orderNotebookCount",
      orderNotebookCount,
      "oderDateExpiresAt",
      orderDateExpiresAt
    );

    // Sprawdzenie i formatowanie daty
    const formattedDate = orderDateExpiresAt
      ? dayjs(orderDateExpiresAt).format("YYYY-MM-DD") // formatowanie na 'YYYY-MM-DD'
      : ""; // jeśli brak daty, wysyłamy pusty ciąg

    try {
      const response = await axios.post(`${API_URL}/orders`, {
        orderNumber,
        orderSystemCount,
        orderNotebookCount,
        orderDateExpiresAt: formattedDate,
      });

      set({
        orders: response.data.orders,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error adding order",
        isLoading: false,
      });
      throw error;
    }
  },

  deleteOrder: async (orderNumber) => {
    set({ isLoading: true, error: null });

    try {
      await axios.delete(`${API_URL}/orders/${orderNumber}`);
      set({
        order: null,
        isLoading: false,
      });
      console.log(`Deleted order with number: ${orderNumber}`);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error deleting order",
        isLoading: false,
      });
      throw error;
    }
  },

  updateOrder: async (orderNumber, updateData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(
        `${API_URL}/orders/${orderNumber}`,
        updateData
      );
      console.log("Sending updateData to backend:", updateData);

      set({
        order: response.data.order,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating order",
        isLoading: false,
      });
      throw error;
    }
  },
}));
