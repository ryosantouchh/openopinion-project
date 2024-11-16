"use client";

import React, { useState } from "react";
import { User, Button } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { buildUrl } from "@/utils/api";

export type BenefitReviewType = {
    id: string;
    user: {
        address: string;
        avatar: string;
    };
    created_at: string;
    title: string;
    content: string;
    benefits: {
        [key: string]: "Yes" | "No" | "Unsure";
    };
};

export default function BenefitReviewPage() {
    const { id } = useParams(); // Fetch review ID from URL
    const router = useRouter();

    const [review, setReview] = useState<BenefitReviewType | null>(null);

    const fetchReview = async () => {
        const response = await fetch(buildUrl(`benefits?id=${id}`));
        const data = await response.json();
        setReview(data);
    }

    // const review: BenefitReviewType = {
    //     id: id as string,
    //     user: {
    //         name: "John Doe",
    //         avatar: "https://example.com/avatar.jpg",
    //     },
    //     created_at: "2024-01-01",
    //     title: "Great Company Benefits",
    //     content: "The benefits offered by the company are generous and cater to employee well-being.",
    //     benefits: {
    //         "Free Lunch or Snacks": "Yes",
    //         "Work From Home": "No",
    //         "Vacation & Paid Time Off": "Yes",
    //         "Employee Discount": "Unsure",
    //         "Maternity & Paternity Leave": "Yes",
    //         "Fertility Assistance": "No",
    //         "Stock Options": "Yes",
    //         "Employee Stock Purchase Plan": "Yes",
    //         "Adoption Assistance": "No",
    //         "Childcare": "Unsure",
    //     },
    // };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Back Button */}
            <Button
                className="mb-4"
                size="sm"
                variant="light"
                onClick={() => router.back()}
            >
                <Icon icon="mdi:arrow-left" className="mr-2" /> Back
            </Button>

            {/* Review Content */}
            <div className="border rounded-lg p-6 bg-white shadow-lg">
                {/* User Information */}
                <div className="flex items-center gap-4 mb-6">
                    <User
                        avatarProps={{
                            src: review?.user.avatar,
                        }}
                        classNames={{
                            name: "font-medium text-xl",
                            description: "text-sm text-gray-500",
                        }}
                        description={new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        }).format(new Date(review?.created_at || ""))}
                        name={review?.user.address || ""}
                    />
                </div>

                {/* Review Title */}
                <h1 className="text-2xl font-bold mb-4">{review?.title}</h1>

                {/* Review Content */}
                <div className="mb-6">
                    <p className="text-gray-800 leading-relaxed">{review?.content}</p>
                </div>

                {/* Benefits Section */}
                <div>
                    <h2 className="text-lg font-medium mb-4">Select which benefits are offered</h2>
                    <div className="grid gap-4">
                        {Object.entries(review?.benefits || {}).map(([benefit, status]) => (
                            <div key={benefit} className="flex items-center justify-between border-b pb-2">
                                <span className="text-gray-700">{benefit}</span>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="flat"
                                        size="sm"
                                        className={status === "Yes" ? "bg-green-100 text-green-600" : ""}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        variant="flat"
                                        size="sm"
                                        className={status === "No" ? "bg-red-100 text-red-600" : ""}
                                    >
                                        No
                                    </Button>
                                    <Button
                                        variant="flat"
                                        size="sm"
                                        className={status === "Unsure" ? "bg-gray-100 text-gray-600" : ""}
                                    >
                                        Unsure
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
