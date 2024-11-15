"use client";

import { Avatar, Button, Tab, Tabs } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ReviewCardOverview, ReviewOverviewType } from "@/app/components/reviews/reviewCardOverview";
import { ReviewCardInterview, ReviewInterviewType } from "@/app/components/reviews/reviewCardInterview";
import { ReviewSalaryType } from "@/app/components/reviews/reviewCardSalary";
import { ReviewBenefitsType, ReviewCardBenefits } from "@/app/components/reviews/reviewCardBenefits";

export default function CompanyDetailsPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [overviewReviews, setOverviewReviews] = useState<ReviewOverviewType[]>([]);
    const [interviewReviews, setInterviewReviews] = useState<ReviewInterviewType[]>([]);
    const [salaryReviews, setSalaryReviews] = useState<ReviewSalaryType[]>([]);
    const [benefitsReviews, setBenefitsReviews] = useState<ReviewBenefitsType[]>([]);
    useEffect(() => {
        const fetchReviews = async () => {
            if (activeTab === "overview") {
                const reviews = await fetchOverviewReviews(id as string);
                setOverviewReviews(reviews);
            } else if (activeTab === "interviews") {
                const reviews = await fetchInterviewReviews(id as string);
                setInterviewReviews(reviews);
            } else if (activeTab === "salaries") {
                const reviews = await fetchSalaryReviews(id as string);
                setSalaryReviews(reviews);
            } else if (activeTab === "benefits") {
                const reviews = await fetchBenefitsReviews(id as string);
                setBenefitsReviews(reviews);
            }
        };

        fetchReviews();
    }, [activeTab, id]);

    return (
        <div>
            {/* Company Banner */}
            <div
                className="h-32 w-full bg-cover bg-center"
                style={{ backgroundColor: "lime" }}
            />
            <div className="pb-4 px-4">
                {/* Company Details */}
                <Avatar
                    className="h-16 w-16 mb-4 translate-y-[-50%]"
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/1063907?v=4"
                    alt="Company Logo"
                />
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Agogo</h2>
                    <Button>Review</Button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <p className="text-xl font-medium mr-4">Overall Rating</p>
                        <span className="text-xl font-medium mr-1">4.5</span>
                        <Icon icon="solar:star-bold" className="text-yellow-500" />
                    </div>
                </div>

                {/* Tabs with Reviews */}
                <Tabs
                    variant="underlined"
                    className="w-full mt-6"
                    aria-label="Dynamic tabs"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key.toString())}
                >
                    <Tab key="overview" title="Overview">
                        {overviewReviews.length > 0 ? (
                            overviewReviews.map((review) => (
                                <ReviewCardOverview key={review.id} {...review} />
                            ))
                        ) : (
                            <p>No overview reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="interviews" title="Interviews">
                        {interviewReviews.length > 0 ? (
                            interviewReviews.map((review) => (
                                <ReviewCardInterview key={review.id} {...review} />
                            ))
                        ) : (
                            <p>No interview reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="salaries" title="Salaries">
                        {salaryReviews.length > 0 ? (
                            salaryReviews.map((review) => (
                                <div key={review?.id}>Salary Review Placeholder</div>
                            ))
                        ) : (
                            <p>No salary reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="benefits" title="Benefits">
                        {benefitsReviews.length > 0 ? (
                            benefitsReviews.map((review) => (
                                <ReviewCardBenefits key={review?.id} {...review} />
                            ))
                        ) : (
                            <p>No benefits reviews available.</p>
                        )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

async function fetchOverviewReviews(companyId: string): Promise<ReviewOverviewType[]> {
    return [
        {
            id: "1",
            user: { name: "User 1", avatar: "https://example.com/avatar1.jpg" },
            createdAt: "2023-11-10",
            rating: 4,
            title: "Great place!",
            content: "Had an amazing experience.",
        },
        {
            id: "2",
            user: { name: "User 2", avatar: "https://example.com/avatar2.jpg" },
            createdAt: "2023-10-20",
            rating: 3,
            title: "Good, but...",
            content: "Decent place, could be better.",
        },
    ];
}

async function fetchInterviewReviews(companyId: string): Promise<ReviewInterviewType[]> {
    return [
        {
            id: "1",
            user: { name: "Candidate 1", avatar: "https://example.com/avatar3.jpg" },
            createdAt: "2023-09-15",
            difficulty: "Hard",
            title: "Challenging interview",
            content: "It was a tough process, but I learned a lot.",
        },
    ];
}

async function fetchSalaryReviews(companyId: string): Promise<[]> {
    return [

    ];
}

async function fetchBenefitsReviews(companyId: string): Promise<[]> {
    return [];
}
