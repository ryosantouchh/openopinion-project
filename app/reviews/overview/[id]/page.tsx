"use client";

import React from "react";
import { User, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@nextui-org/react";
import { obscureName } from "@/app/utils/name";

export type ReviewOverviewType = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    createdAt: string;
    rating: number;
    title: string;
    content: string;
};

export default function OverviewReviewPage() {
    const { id } = useParams(); // Fetch review ID from URL
    const router = useRouter();

    // Mock Data for Example (Replace with API call)
    const review: ReviewOverviewType = {
        id: id as string,
        user: {
            name: "0xd481830f803157D6C8DFd2D0CBA04DbA91243160",
            avatar: "https://example.com/avatar.jpg",
        },
        createdAt: "2024-01-01",
        rating: 4.5,
        title: "Amazing Experience",
        content: "Working at this company was a wonderful experience. The culture is supportive, and the team is highly collaborative.",
    };

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
                            src: review.user.avatar,
                        }}
                        classNames={{
                            name: "font-medium text-xl text-gray-800",
                            description: "text-sm text-gray-500",
                        }}
                        description={new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        }).format(new Date(review.createdAt))}
                        name={obscureName(review.user.name)}
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{review.title}</h1>

                <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }, (_, i) => {
                        const isFullStar = i < Math.floor(review.rating);
                        const isHalfStar = i === Math.floor(review.rating) && review.rating % 1 !== 0;
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
                        {review.rating.toFixed(1)} / 5
                    </span>
                </div>

                <div className="leading-relaxed text-gray-700 text-lg">
                    {review.content}
                </div>
            </div>
        </div>
    );
}
