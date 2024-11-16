"use client";

import React, { useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useReviewStore } from "@/hooks/review/useReviewStore";
import RatingRadioGroup from "@/app/components/ratingRadioGroup";

export default function CreateOverviewReviewPage() {
    const { jobPosition, employeeName } = useReviewStore();
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [content, setContent] = useState("");

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue)) {
            setRating(parsedValue);
        } else {
            setRating(null);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!rating || !title.trim() || !content.trim()) {
            return;
        }

        const review = {
            jobPosition,
            employeeName,
            title,
            rating,
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
                Overview Review
            </h1>
            <p className="mt-2 text-lg text-gray-700">
                Share your honest experience and help others about{" "}
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
                        Rating
                    </span>
                    <RatingRadioGroup
                        hideStarsText
                        className="flex-col items-start"
                        color="warning"
                        label={<span className="sr-only">Rating</span>}
                        onChange={handleRatingChange}
                    />
                </div>

                <Input
                    label="Review Title"
                    placeholder="Enter a title for your review"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    classNames={{
                        // input: "text-lg",
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
