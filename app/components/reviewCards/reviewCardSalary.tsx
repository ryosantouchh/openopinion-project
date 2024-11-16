"use client";

import React from "react";
import { User, Chip } from "@nextui-org/react";
import Link from 'next/link'
export type ReviewSalaryType = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    created_at: string;
    salary: number;
    role: string;
};

export type SalaryRangeProps = {
    role: string;
    salaries: number[];
};

export type ReviewSalaryProps = React.HTMLAttributes<HTMLDivElement> & ReviewSalaryType;

export const ReviewCardSalary = React.forwardRef<HTMLDivElement, ReviewSalaryProps>(
    ({ children, user, salary, role, created_at, id, ...props }, ref) => (
        <Link href={`/reviews/salaries/${id}`}>
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
                            }).format(new Date(created_at))}
                            name={user.name}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <Chip>${salary.toLocaleString()}</Chip>
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <p className="font-medium text-default-900">{role}</p>
                </div>
            </div>
        </Link>
    ),
);

export const SalaryRangeCard: React.FC<SalaryRangeProps> = ({ role, salaries }) => {
    if (!salaries || salaries.length === 0) return null;

    const minSalary = Math.min(...salaries);
    const maxSalary = Math.max(...salaries);

    return (
        <div className="p-4 border rounded-md shadow-sm mb-4">
            <h3 className="text-lg font-semibold">{role}</h3>
            <p className="mt-2 text-default-800">
                Salary Range:{" "}
                <span className="font-medium text-green-600">
                    ${minSalary.toLocaleString()} - ${maxSalary.toLocaleString()}
                </span>
            </p>
        </div>
    );
};
