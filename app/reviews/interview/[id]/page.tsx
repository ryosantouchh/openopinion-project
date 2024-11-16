"use client";

import React, { useEffect, useState } from "react";
import { User, Button, Chip } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { getChipColor } from "@/app/utils/chip";
import { obscureName } from "@/app/utils/name";
import { Difficulty } from "@/app/consts/difficulty";
import { buildUrl } from "@/utils/api";

export type InterviewReviewType = {
    id: string;
    user: {
        address: string;
        avatar: string;
    };
    created_at: string;
    difficulty: "Very Easy" | "Easy" | "Normal" | "Hard" | "Very Hard";
    title: string;
    content: string;
    gotOffer: boolean;
};

export default function InterviewReviewPage() {
    const { id } = useParams();
    const router = useRouter();

    const [review, setReview] = useState<InterviewReviewType | null>(null);

    const fetchReview = async () => {
        const response = await fetch(buildUrl(`interview?id=${id}`));
        const data = await response.json();
        setReview(data);
    }

    useEffect(() => {
        fetchReview();
    }, []);

    // const review: InterviewReviewType = {
    //     id: id as string,
    //     user: {
    //         name: "0x123bhj1dasd123bh1j23",
    //         avatar: "https://example.com/avatar.jpg",
    //     },
    //     created_at: "2024-01-01",
    //     difficulty: "Hard",
    //     title: "Challenging but Rewarding",
    //     content: "The interview process was thorough with multiple stages, but the experience was overall positive.",
    //     gotOffer: true,
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
                        name={obscureName(review?.user.address || "")}
                    />
                </div>

                {/* Review Title */}
                <h1 className="text-2xl font-bold mb-4">{review?.title}</h1>

                {/* Interview Difficulty */}
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-700">Interview Difficulty</h2>
                    <div className="mt-2 inline-flex items-center gap-2">
                        <Chip className={getChipColor(review?.difficulty as Difficulty)}>{review?.difficulty}</Chip>
                    </div>
                </div>

                {/* Did You Get an Offer? */}
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-700">Did You Get an Offer?</h2>
                    <div className="mt-2 inline-flex items-center gap-2">
                        <Icon
                            className={review?.gotOffer ? "text-green-500" : "text-red-500"}
                            icon={
                                review?.gotOffer
                                    ? "mdi:check-circle"
                                    : "mdi:close-circle"
                            }
                        />
                        <span className={review?.gotOffer ? "text-green-700" : "text-red-700"}>
                            {review?.gotOffer ? "Yes" : "No"}
                        </span>
                    </div>
                </div>

                {/* Review Content */}
                <div>
                    <p className="text-gray-800 leading-relaxed">{review?.content}</p>
                </div>
            </div>
        </div>
    );
}
