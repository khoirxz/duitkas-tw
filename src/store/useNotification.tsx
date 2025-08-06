// this is for global notification
import { create } from "zustand";
// import { persist } from "zustand/middleware";

interface NotificationState {
  message: string;
  type: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
}

export const useNotification = create<NotificationState>()(
  // persist(
  (set) => ({
    message: "",
    type: "",
    open: false,
    setOpen: (open: boolean) => set({ open }),
    setMessage: (message: string) => set({ message }),
    setType: (type: string) => set({ type }),
  })
  // )
);
