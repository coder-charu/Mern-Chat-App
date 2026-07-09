import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useChat = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in our zustand -> useChat -> getUsers() fn:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(
        "Error in our zustand -> useChat -> getMessages() fn:",
        error,
      );
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
