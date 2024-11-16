import { create } from "zustand";
import { useReviewStore } from "./useReviewStore";

export default function useCompanyReview() {
  const { companyReviews, appendCompanyReviews, clearCompanyReviews } =
    useReviewStore();
}

// export const useCounter = () => {
//     const { count, increment, decrement } = useStore();
//     return { count, increment, decrement };
// };
