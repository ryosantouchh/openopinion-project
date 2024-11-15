"use client";

import React from "react";
import { Avatar } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CompanyCard() {
    return (
        <div className="flex h-full w-full items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Header Section */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className="h-16 w-16 border-2 border-gray-200"
                            radius="sm"
                            src="https://play-lh.googleusercontent.com/EN4vEdLW-Y2CudJ01SiOsa3XOv5MdlO7uOVAmm-FuE6gDmPZZshcQDu-SuEI1RpTG0g"
                            alt="Company Logo"
                        />
                        <h2 className="text-2xl font-bold text-gray-800">Agogo</h2>
                    </div>
                    <div className="flex items-center mt-1 text-yellow-500">
                        <span className="text-xl font-medium mr-1">4.5</span>
                        <Icon
                            className="text-lg sm:text-xl"
                            icon="solar:star-bold"
                        />
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mt-6 flex justify-around border-t pt-4">
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-800">400</p>
                        <p className="text-sm text-gray-500">Reviews</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-800">400</p>
                        <p className="text-sm text-gray-500">Salaries</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-800">400</p>
                        <p className="text-sm text-gray-500">Jobs</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
