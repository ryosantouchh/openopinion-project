"use client";

import React from "react";
import { User, Chip } from "@nextui-org/react";
import Link from 'next/link'
import { getChipColor } from "@/app/utils/chip";
import { Difficulty } from "@/app/consts/difficulty";
export type ReviewInterviewType = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    createdAt: string;
    difficulty: Difficulty;
    title: string;
    content: string;
};

export type ReviewInterviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewInterviewType;


export const ReviewCardInterview = React.forwardRef<HTMLDivElement, ReviewInterviewProps>(
    ({ children, user, title, content, createdAt, difficulty, id, ...props }, ref) => (
        <Link href={`/reviews/interview/${id}`}>
            <div ref={ref} {...props} className="border-b pb-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User
                            avatarProps={{
                                src: user.avatar,
                            }}
                            classNames={{
                                name: "font-medium",
                                description: "text-small",
                            }}
                            description={new Intl.DateTimeFormat("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            }).format(new Date(createdAt))}
                            name={user.name}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <Chip className={getChipColor(difficulty)}>{difficulty}</Chip>
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <p className="font-medium text-default-900">{title}</p>
                    <p className="mt-2 text-default-500">{content || children}</p>
                </div>
            </div>
        </Link>
    ),
);