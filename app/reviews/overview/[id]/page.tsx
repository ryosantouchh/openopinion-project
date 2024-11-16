"use client";

import React, { useEffect, useState } from "react";
import { User, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@nextui-org/react";
import { obscureName } from "@/app/utils/name";
import { buildUrl } from "@/utils/api";

export type ReviewOverviewType = {
    id: string;
    user: {
        address: string;
        avatar: string;
    };
    created_at: string;
    rating: number;
    title: string;
    content: string;
};

export default function OverviewReviewPage() {
    const { id } = useParams(); // Fetch review ID from URL
    const router = useRouter();

    const [review, setReview] = useState<ReviewOverviewType | null>(null);

    const fetchReview = async () => {
        console.log("Fetching review with id:", id);
        try {
            const response = await fetch(buildUrl(`overview?postId=${id}`));
            const data = await response.json();
            data.user.avatar = obscureName(data.user.address || "");
            setReview(data);
            console.log("Review data:", review);
        } catch (error) {
            console.error("Error fetching review:", error);
        }
    }

    // Mock Data for Example (Replace with API call)
    // const review: ReviewOverviewType = {
    //     id: id as string,
    //     user: {
    //         name: "0xd481830f803157D6C8DFd2D0CBA04DbA91243160",
    //         avatar: "https://example.com/avatar.jpg",
    //     },
    //     created_at: "2024-01-01",
    //     rating: 4.5,
    //     title: "Amazing Experience",
    //     content: "Working at this company was a wonderful experience. The culture is supportive, and the team is highly collaborative.",
    // };

    useEffect(() => {
        fetchReview();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Button
                className="mb-4"
                size="sm"
                variant="light"
                onClick={() => router.back()}
            >
                <Icon icon="mdi:arrow-left" className="mr-2" /> Back
            </Button>

            <div className="rounded-2xl p-6 bg-white shadow-md">
                <div className="flex items-center gap-4 mb-6">
                    <User
                        avatarProps={{
                            src: review?.user.avatar,
                        }}
                        classNames={{
                            name: "font-medium text-xl text-gray-800",
                            description: "text-sm text-gray-500",
                        }}
                        // description={new Intl.DateTimeFormat("en-US", {
                        //     month: "long",
                        //     day: "numeric",
                        //     year: "numeric",
                        // }).format(new Date(review?.created_at || ""))}
                        name={obscureName(review?.user.address || "")}
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{review?.title}</h1>

                <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }, (_, i) => {
                        const isFullStar = i < Math.floor(review?.rating || 0);
                        const isHalfStar = i === Math.floor(review?.rating || 0) && (review?.rating || 0) % 1 !== 0;
                        return (
                            <Icon
                                key={i}
                                className={cn("text-lg sm:text-xl text-yellow-500")}
                                icon={
                                    isFullStar
                                        ? "fluent:star-28-filled"
                                        : isHalfStar
                                            ? "fluent:star-half-28-regular"
                                            : "fluent:star-28-regular"
                                }
                            />
                        );
                    })}
                    <span className="ml-2 text-gray-600 text-sm sm:text-base">
                        {review?.rating?.toFixed(1) || 0} / 5
                    </span>
                </div>

                <div className="leading-relaxed text-gray-700 text-lg">
                    {review?.content}
                </div>
            </div>
        </div>
    );
}
