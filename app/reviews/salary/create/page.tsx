"use client";

import React, { useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useReviewStore } from "@/hooks/review/useReviewStore";
import RatingRadioGroup from "@/app/components/ratingRadioGroup";

export default function CreateSalaryReviewPage() {
    const { jobPosition, employeeName } = useReviewStore();
    const [salary, setSalary] = useState<number | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (salary === null) {
            return;
        }

        const review = {
            jobPosition,
            employeeName,
            salary,
        };

        console.log("Submitted Review:", review);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-8 space-y-6 bg-white"
        >
            <h1 className="text-3xl font-extrabold text-center text-primary mb-4">
                Share Your Salary Experience
            </h1>
            <p className="mt-2 text-lg text-gray-700">
                Tell us what it's like working as{" "}
                <span className={jobPosition ? "font-bold text-primary" : ""}>
                    {jobPosition || "this job position!"}
                </span>{" "}
                at{" "}
                <span className={employeeName ? "font-bold text-primary" : ""}>
                    {employeeName || "this company!"}
                </span>. Your insights can help others!
            </p>
            <div className="space-y-4">
                <Input
                    label="Annual Salary (USD)"
                    type="number"
                    value={salary !== null ? salary.toString() : ""}
                    onChange={(e) => setSalary(parseFloat(e.target.value))}
                    classNames={{
                        label: "text-gray-800 font-medium mb-2",
                    }}
                    endContent={<span className="text-gray-500">$</span>}
                />
            </div>

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
