import { create } from "zustand";

import { apiWrapper } from "@/utils";

type State = {
  companyReviews: Record<string, unknown>[];
  salaryReviews: Record<string, unknown>[];
  interviewReviews: Record<string, unknown>[];
  benefitReviews: Record<string, unknown>[];
};

type Action = {
  appendCompanyReviews: (newCompanyReview: Record<string, unknown>) => void;
  appendSalaryReviews: (newSalaryReview: Record<string, unknown>) => void;
  appendInterviewReviews: (newInterviewReview: Record<string, unknown>) => void;
  appendBenefitReviews: (newBenefitReview: Record<string, unknown>) => void;

  clearCompanyReviews: () => void;
  clearSalaryReviews: () => void;
  clearInterviewReviews: () => void;
  clearBenefitReviews: () => void;
};

export const useReviewStore = create<State & Action>((set) => ({
  companyReviews: [],
  salaryReviews: [],
  interviewReviews: [],
  benefitReviews: [],

  fetchCompanyReview: async () => {
    try {
      const res = await apiWrapper<Record<string, unknown>[]>({
        method: "GET",
        endpoint: process.env.NEXT_PUBLIC_API_BASE_URL!,
      });

      if (!res?.data) {
        return;
      }

      set({ companyReviews: [...res.data] });
    } catch (error) {
      throw error;
    }
  },

  appendCompanyReviews: (newCompanyReview) =>
    set(({ companyReviews }) => ({
      companyReviews: [...companyReviews, newCompanyReview],
    })),

  appendSalaryReviews: (newSalaryReview) =>
    set(({ salaryReviews }) => ({
      salaryReviews: [...salaryReviews, newSalaryReview],
    })),

  appendInterviewReviews: (newInterviewReview) =>
    set(({ interviewReviews }) => ({
      interviewReviews: [...interviewReviews, newInterviewReview],
    })),

  appendBenefitReviews: (newBenefitReview) =>
    set(({ benefitReviews }) => ({
      benefitReviews: [...benefitReviews, newBenefitReview],
    })),

  clearCompanyReviews: () => set(() => ({ companyReviews: [] })),
  clearSalaryReviews: () => set(() => ({ salaryReviews: [] })),
  clearInterviewReviews: () => set(() => ({ interviewReviews: [] })),
  clearBenefitReviews: () => set(() => ({ benefitReviews: [] })),
}));
