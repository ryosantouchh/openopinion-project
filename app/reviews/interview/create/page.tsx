"use client";

import React, { useState } from "react";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { useReviewStore } from "@/hooks/review/useReviewStore";

export default function CreateInterviewReviewPage() {
    const { jobPosition, employeeName } = useReviewStore();
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [content, setContent] = useState("");

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!difficulty || !title.trim() || !content.trim()) {
            return;
        }

        const review = {
            jobPosition,
            employeeName,
            title,
            difficulty,
            content,
        };

        console.log("Submitted Review:", review);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-8 space-y-6 bg-white"
        >
            <h1 className="text-3xl font-extrabold text-center text-primary mb-4">
                Interview Review
            </h1>
            <p className="mt-2 text-lg text-gray-700">
                Tell us what it's like interviewing for{" "}
                <span className={jobPosition ? "font-bold text-primary" : ""}>
                    {jobPosition || "this job position!"}
                </span>{" "}
                at{" "}
                <span className={employeeName ? "font-bold text-primary" : ""}>
                    {employeeName || "this company!"}
                </span>
            </p>
            <div className="space-y-4">
                <div>
                    <span className="block text-gray-800 font-medium mb-2">
                        Difficulty
                    </span>
                    <Select
                        placeholder="Select difficulty"
                        value={difficulty}
                        onChange={(e) => handleDifficultyChange(e.target.value)}
                        className="w-full"
                    >
                        <SelectItem key="very easy" value="very easy">Very Easy</SelectItem>
                        <SelectItem key="easy" value="easy">Easy</SelectItem>
                        <SelectItem key="normal" value="normal">Normal</SelectItem>
                        <SelectItem key="hard" value="hard">Hard</SelectItem>
                        <SelectItem key="very hard" value="very hard">Very Hard</SelectItem>
                    </Select>
                </div>

                <Input
                    label="Review Title"
                    placeholder="Enter a title for your review"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    classNames={{
                        label: "text-gray-800 font-medium mb-2",
                    }}
                />

                <Textarea
                    label="Your Review"
                    placeholder="Write your detailed review here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    minRows={4}
                    classNames={{
                        label: "text-gray-800 font-medium mb-2",
                    }}
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
                <Button
                    type="submit"
                    color="primary"
                >
                    Submit Review
                </Button>
            </div>
        </form>
    );
}
