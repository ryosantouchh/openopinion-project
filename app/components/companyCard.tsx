"use client";

import React from "react";
import { Avatar } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

type CompanyCardProps = {
    id: string;
    name: string;
    logoUrl: string;
    avgRating: number;
    reviewCount: number;
    salaryCount: number;
    jobCount: number;
};

export default function CompanyCard({
    id,
    name,
    logoUrl,
    avgRating,
    reviewCount,
    salaryCount,
    jobCount,
}: CompanyCardProps) {
    return (
        <Link href={`/companies/${id}`}>
            <div className="flex h-full w-full items-center justify-center mb-4">
                <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar
                                className="h-16 w-16 border-2 border-gray-200"
                                radius="sm"
                                src={logoUrl}
                                alt="Company Logo"
                            />
                            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                        </div>
                        <div className="flex items-center mt-1 text-yellow-500">
                            <span className="text-xl font-medium mr-1">{avgRating}</span>
                            <Icon
                                className="text-lg sm:text-xl"
                                icon="fluent:star-28-filled"
                            />
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="mt-6 flex justify-around border-t pt-4">
                        {[
                            { count: reviewCount, label: "Reviews" },
                            { count: salaryCount, label: "Salaries" },
                            { count: jobCount, label: "Jobs" },
                        ].map(({ count, label }) => (
                            <div key={label} className="text-center">
                                <p className="text-xl font-semibold text-gray-800">{count}</p>
                                <p className="text-sm text-gray-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
