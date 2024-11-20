import { Difficulty } from "@/app/consts/difficulty";

export const getChipColor = (difficulty: string) => {
    switch (difficulty) {
        case "very easy":
            return "bg-green-200";
        case "easy":
            return "bg-blue-200";
        case "medium":
            return "bg-yellow-200";
        case "hard":
            return "bg-orange-200";
        case "very hard":
            return "bg-red-200";
        default:
            return "bg-gray-200";
    }
};

