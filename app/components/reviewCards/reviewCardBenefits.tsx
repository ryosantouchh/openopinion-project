"use client";

import React from "react";
import { User, cn } from "@nextui-org/react";
import Link from 'next/link'
import { Icon } from "@iconify/react/dist/iconify.js";

export type ReviewBenefitsType = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    rating: number;
    title: string;
    content: string;
    createdAt: string;
};

export type ReviewBenefitsProps = React.HTMLAttributes<HTMLDivElement> & ReviewBenefitsType;

export const ReviewCardBenefits = React.forwardRef<HTMLDivElement, ReviewBenefitsProps>(
    ({ children, user, title, content, rating, createdAt, id, ...props }, ref) => (
        <Link href={`/reviews/benefits/${id}`}>
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
                        {Array.from({ length: 5 }, (_, i) => {
                            const isFullStar = i < Math.floor(rating);
                            const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;
                            return (
                                <Icon
                                    key={i}
                                    className={cn(
                                        "text-lg sm:text-xl",
                                        "text-warning",
                                    )}
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