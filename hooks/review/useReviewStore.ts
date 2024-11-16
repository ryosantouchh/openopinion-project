import { create } from "zustand";

interface ReviewStoreState {
    jobPosition: string;
    employeeName: string;
    setJobPosition: (position: string) => void;
    setEmployeeName: (name: string) => void;
}

export const useReviewStore = create<ReviewStoreState>((set) => ({
    jobPosition: "",
    employeeName: "",
    setJobPosition: (position: string) => set({ jobPosition: position }),
    setEmployeeName: (name: string) => set({ employeeName: name }),
}));