"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useReviewStore } from "@/hooks/review/useReviewStore";

export default function CreateReviewPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);
    const { jobPosition, setJobPosition, employeeName, setEmployeeName } = useReviewStore();
    const [isError, setIsError] = useState<boolean>(false);

    const handleSelect = (value: string) => {
        setSelected(value);
        if (isError) setIsError(false);
    };

    const handleJobPositionChange = (value: string) => {
        setJobPosition(value);
        if (isError && value.trim()) setIsError(false);
    };

    const handleNext = () => {
        if (!selected || !jobPosition.trim() || !employeeName.trim()) {
            setIsError(true);
            return;
        }
        router.push(`/reviews/${selected}/create`);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 space-y-8 bg-white">
            <h1 className="text-3xl font-extrabold text-center text-primary">
                What's on your mind to review?
            </h1>
            <div>
                <Input
                    required
                    isClearable
                    label="Employee Name"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    onClear={() => setEmployeeName("")}
                    className="text-lg text-gray-700 font-medium mb-4"
                />
                <Input
                    required
                    isClearable
                    label="Job Position"
                    value={jobPosition}
                    onChange={(e) => handleJobPositionChange(e.target.value)}
                    onClear={() => handleJobPositionChange("")}
                    className="text-lg text-gray-700 font-medium mb-4"
                />
            </div>
            <div className="grid grid-cols-2 gap-6">
                {["overview", "interview", "salary", "benefits"].map((item) => (
                    <Button
                        key={item}
                        value={item}
                        onClick={() => handleSelect(item)}
                        className={cn(
                            "h-24 text-lg rounded-lg transition-all",
                            selected === item
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        )}
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Button>
                ))}
            </div>

            {isError && (
                <p className="text-red-500 text-sm">
                    * Please fill in all fields.
                </p>
            )}
            <div className="flex justify-end gap-4">
                <Button
                    variant="light"
                    onClick={() => {
                        setSelected(null);
                        setJobPosition("");
                        setEmployeeName("");
                        setIsError(false);
                        router.back();
                    }}
                    className="text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={handleNext}
                    disabled={isError}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
