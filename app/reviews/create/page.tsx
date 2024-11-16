"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { useRouter } from "next/dist/client/components/navigation";
import BackButton from "@/app/components/backButton";

export default function CreateReviewPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);
    const [jobPosition, setJobPosition] = useState<string | null>(null);
    const handleSelect = (value: string) => {
        setSelected(value);
    };

    const handleNext = () => {
        router.push(`/reviews/create/${selected}`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-2xl">
            <h1 className="text-3xl font-extrabold text-center text-gray-900">
                What do you want to review?
            </h1>
            <div className="grid grid-cols-2 gap-4">
                {["interview", "salary", "benefits", "overview"].map((item) => (
                    <Button
                        key={item}
                        value={item}
                        onClick={() => handleSelect(item)}
                        className={cn(
                            "w-40 h-40 text-lg rounded-lg transition-all",
                            selected === item
                                ? "bg-primary text-white "
                                : "bg-gray-200 text-gray-700 "
                        )}
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Button>
                ))}
            </div>
            <div className="mt-4">
                <Input
                    isClearable
                    label="Job Position"
                    value={jobPosition ?? ""}
                    onValueChange={setJobPosition}
                    classNames={{
                        input: "text-lg",
                        label: "text-gray-700 font-medium",
                    }}
                />
            </div>
            <div className="flex justify-end gap-4">
                <Button variant="light">Cancel</Button>
                <Button color="primary" onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}
