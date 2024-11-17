"use client";

import { Avatar, Button, Tab, Tabs } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ReviewCardOverview, ReviewOverviewType } from "@/app/components/reviewCards/reviewCardOverview";
import { ReviewCardInterview, ReviewInterviewType } from "@/app/components/reviewCards/reviewCardInterview";
import { ReviewCardSalary, ReviewSalaryType, SalaryRangeCard } from "@/app/components/reviewCards/reviewCardSalary";
import { ReviewBenefitsType, ReviewCardBenefits } from "@/app/components/reviewCards/reviewCardBenefits";
import { Difficulty } from "@/app/consts/difficulty";
import Link from "next/link";
import { getImageUrl } from "@/app/utils/name";
import { buildUrl } from "@/utils/api";

export default function CompanyDetailsPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [company, setCompany] = useState<any>(null);
    const [overviewReviews, setOverviewReviews] = useState<ReviewOverviewType[]>([]);
    const [interviewReviews, setInterviewReviews] = useState<ReviewInterviewType[]>([]);
    const [salaryReviews, setSalaryReviews] = useState<ReviewSalaryType[]>([]);
    const [benefitsReviews, setBenefitsReviews] = useState<ReviewBenefitsType[]>([]);

    const fetchCompany = async () => {
        try {
            const response = await fetch(buildUrl(`company?companyId=${id}`));
            if (!response.ok) throw new Error('Failed to fetch company data');
            const data = await response.json();
            console.log(data)
            setCompany(data);
        } catch (error) {
            console.error('Error fetching company:', error);
            alert('Unable to load company details. Please try again later.');
        }
    };


    const fetchReviews = async () => {
        try {
            let reviews;
            if (activeTab === "overview") {
                reviews = await fetchOverviewReviews(id as string);
                console.log(reviews)
                setOverviewReviews(reviews);
            } else if (activeTab === "interviews") {
                reviews = await fetchInterviewReviews(id as string);
                setInterviewReviews(reviews);
            } else if (activeTab === "salaries") {
                reviews = await fetchSalaryReviews(id as string);
                setSalaryReviews(reviews);
            } else if (activeTab === "benefits") {
                reviews = await fetchBenefitsReviews(id as string);
                setBenefitsReviews(reviews);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchCompany();
        fetchReviews();
    }, [activeTab, id]);

    useEffect(() => {
    }, [overviewReviews, salaryReviews, interviewReviews, benefitsReviews])

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
                    className="h-16 w-16 translate-y-[-20%]"
                    radius="sm"
                    src={company?.logourl || "https://avatars.githubusercontent.com/u/1063907?v=4"}
                    alt="Company Logo"
                />
                <div className="flex items-end justify-between">
                    <div className="flex flex-col items-start">
                        <h2 className="text-2xl font-bold text-gray-800">{company?.name}</h2>
                        <div className="flex items-center">
                            <p className="text-xl font-medium mr-4">Overall Rating</p>
                            <span className="text-xl font-medium mr-1">4.5</span>
                            <Icon icon="fluent:star-28-filled" className="text-yellow-500" />
                        </div>
                    </div>
                    <Button color="primary"
                        as={Link}
                        href="/reviews/create"
                    >
                        Write a Review
                    </Button>
                </div>

                {/* Tabs with Reviews */}
                <Tabs
                    variant="underlined"
                    className="w-full mt-6 mb-1"
                    aria-label="Dynamic tabs"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key.toString())}
                >
                    <Tab key="overview" title="Overview">
                        {overviewReviews.length > 0 ? (
                            overviewReviews.map((review) => (
                                <ReviewCardOverview key={review.record_id} {...review} />
                            ))
                        ) : (
                            <p>No overview reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="interviews" title="Interviews">
                        {interviewReviews.length > 0 ? (
                            interviewReviews.map((review) => (
                                <ReviewCardInterview key={review.record_id} {...review} />
                            ))
                        ) : (
                            <p>No interview reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="salaries" title="Salaries">
                        {salaryReviews.length > 0 ? (
                            <>
                                <SalaryRangeCard role="Software Engineer" salaries={[100000, 200000]} />
                                <SalaryRangeCard role="Product Manager" salaries={[80000, 150000]} />
                            </>
                        ) : (
                            <p>No salary reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="benefits" title="Benefits">
                        {benefitsReviews.length > 0 ? (
                            benefitsReviews.map((review) => (
                                <ReviewCardBenefits key={review?.record_id} {...review} />
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
    const response = await fetch(buildUrl(`overview?companyId=${companyId}`));
    const data = await response.json();
    // console.log("Overview Reviews:", data);

    if (data?.user?.address) {
        data.user.avatar = getImageUrl(data.user.address);
    }
    return data;

    // return [
    //     {
    //         id: "1",
    //         user: { name: "0x123bhj1dasd123bh1j23", avatar: getImageUrl("0x123bhj1dasd123bh1j23") },
    //         created_at: "2023-11-10",
    //         rating: 4.5,
    //         title: "Great place!",
    //         content: "Had an amazing experience.",
    //     },
    //     {
    //         id: "2",
    //         user: { name: "0x12312312312", avatar: getImageUrl("0x12312312312") },
    //         created_at: "2023-10-20",
    //         rating: 2,
    //         title: "Good, but...",
    //         content: "Decent place, could be better.",
    //     },
    // ];
}

async function fetchInterviewReviews(companyId: string): Promise<ReviewInterviewType[]> {
    const response = await fetch(buildUrl(`interview?companyId=${companyId}`));
    const data = await response.json();
    console.log(data);
    return data;

    // return [
    //     {
    //         id: "1",
    //         user: { name: "Candidate 1", avatar: getImageUrl("Candidate 1") },
    //         created_at: "2023-09-15",
    //         difficulty: Difficulty.VERY_EASY,
    //         title: "Challenging interview",
    //         content: "It was a tough process, but I learned a lot.",
    //     },
    //     {
    //         id: "2",
    //         user: { name: "Candidate 2", avatar: getImageUrl("Candidate 2") },
    //         created_at: "2023-09-15",
    //         difficulty: Difficulty.EASY,
    //         title: "Challenging interview",
    //         content: "It was a tough process, but I learned a lot.",
    //     },
    //     {
    //         id: "3",
    //         user: { name: "Candidate 3", avatar: getImageUrl("Candidate 3") },
    //         created_at: "2023-09-15",
    //         difficulty: Difficulty.MEDIUM,
    //         title: "Challenging interview",
    //         content: "It was a tough process, but I learned a lot.",
    //     },
    //     {
    //         id: "4",
    //         user: { name: "Candidate 4", avatar: getImageUrl("Candidate 4") },
    //         created_at: "2023-09-15",
    //         difficulty: Difficulty.HARD,
    //         title: "Challenging interview",
    //         content: "It was a tough process, but I learned a lot.",
    //     },
    //     {
    //         id: "5",
    //         user: { name: "Candidate 5", avatar: getImageUrl("Candidate 5") },
    //         created_at: "2023-09-15",
    //         difficulty: Difficulty.VERY_HARD,
    //         title: "Challenging interview",
    //         content: "It was a tough process, but I learned a lot.",
    //     },
    // ];
}

async function fetchSalaryReviews(companyId: string): Promise<ReviewSalaryType[]> {
    const response = await fetch(buildUrl(`salary?companyId=${companyId}`));
    const data = await response.json();
    console.log(data);
    return data;

    // return [
    //     {
    //     id: "1",
    //         user: { name: "Salary 1", avatar: getImageUrl("Salary 1") },
    //     created_at: "2023-09-15",
    //         salary: 100000,
    //             role: "Software Engineer",
    //         },
    // {
    //     id: "2",
    //         user: { name: "Salary 2", avatar: getImageUrl("Salary 2") },
    //     created_at: "2023-09-15",
    //         salary: 200000,
    //             role: "Software Engineer",
    //         },
    //     ];
}

async function fetchBenefitsReviews(companyId: string): Promise<ReviewBenefitsType[]> {
    const response = await fetch(buildUrl(`benefits?companyId=${companyId}`));
    const data = await response.json();
    console.log(data);
    return data;

    // return [
    // {
    //     id: "1",
    //         user: { name: "0x123bhj1dasd123bh1j23", avatar: getImageUrl("0x123bhj1dasd123bh1j23") },
    //     created_at: "2023-11-10",
    //         health_insurance: 1,
    //             stock_plan: 2,
    //                 stock_options: 0,
    //                     annual_leave: 1,
    //                         l_and_d: 2,
    //     },
    // {
    //     id: "2",
    //         user: { name: "0x12312312312", avatar: getImageUrl("0x12312312312") },
    //     created_at: "2023-10-20",
    //         health_insurance: 1,
    //             stock_plan: 1,
    //                 stock_options: 1,
    //                     annual_leave: 1,
    //                         l_and_d: 1,
    //     },
    // ];
}
