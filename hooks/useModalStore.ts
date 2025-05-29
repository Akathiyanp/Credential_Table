
// // Here i am created a reusable modal system ( This file will manage the state for all modals in this application)

// import { create } from "zustand";
// import { ModalType, Person } from "@/types/Modaltype"

// interface ModalStore {
//   type: ModalType | null;
//   data: Person | null;
//   isOpen: boolean;
//   onOpen: (type: ModalType, data?: Person) => void;
//   onClose: () => void;
// }

// export const useModalStore = create<ModalStore>((set) => ({
//   type: null,
//   data: null,
//   isOpen: false,
//   onOpen: (type, data?) => set({ isOpen: true, type, data: data ?? null }),
//   onClose: () => set({ type: null, isOpen: false, data: null }), 
// }));
                                                                                  