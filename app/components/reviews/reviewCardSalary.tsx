"use client";

import React from "react";
import { User, Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

export type ReviewSalaryType = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    createdAt: string;
    salary: number;
};

export type ReviewSalaryProps = React.HTMLAttributes<HTMLDivElement> & ReviewSalaryType;

export const ReviewCardSalary = React.forwardRef<HTMLDivElement, ReviewSalaryProps>(
    ({ children, user, salary, createdAt, ...props }, ref) => (
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
                    <Chip>{salary}</Chip>
                </div>
            </div>
            <div className="mt-4 w-full">
                <p className="font-medium text-default-900">{salary}</p>
            </div>
        </div>
    ),
);