import { Difficulty } from "@/app/consts/difficulty";

export const getChipColor = (difficulty: Difficulty) => {
    switch (difficulty) {
        case Difficulty.VERY_EASY:
            return "bg-green-200";
        case Difficulty.EASY:
            return "bg-blue-200";
        case Difficulty.MEDIUM:
            return "bg-yellow-200";
        case Difficulty.HARD:
            return "bg-orange-200";
        case Difficulty.VERY_HARD:
            return "bg-red-200";
        default:
            return "bg-gray-200";
    }
};

