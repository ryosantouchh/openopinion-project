"use client";

import React, { useEffect, useState } from 'react'
import CompanyCard from '../components/companyCard'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/react'
import { buildUrl } from '@/utils/api';

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<any[]>([]);

    const fetchCompanies = async () => {
        const response = await fetch(buildUrl("company"));
        const data = await response.json();
        setCompanies(data);
        console.log(data);
    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Explore Companies</h1>
            <div className="flex items-center gap-2 mb-4">
                <Input
                    placeholder="Search companies"
                    className="max-w-xs"
                />
                <Button>Search</Button>
            </div>
            {companies.map((company) => (
                <CompanyCard
                    key={company.id}
                    id={company.id}
                    name={company.name}
                    logoUrl={company.logoUrl}
                    avgRating={company.avgRating}
                    reviewCount={company.reviewCount}
                    salaryCount={company.salaryCount}
                    jobCount={company.jobCount}
                />
            ))}
        </div>
    )
}

const companies = [
    {
        id: "1",
        name: "Agogo",
        logoUrl: "https://play-lh.googleusercontent.com/EN4vEdLW-Y2CudJ01SiOsa3XOv5MdlO7uOVAmm-FuE6gDmPZZshcQDu-SuEI1RpTG0g",
        avgRating: 4.5,
        reviewCount: 100,
        salaryCount: 100,
        jobCount: 100,
    },
    {
        id: "2",
        name: "BKM",
        logoUrl: "https://datacentrereview.com/wp-content/uploads/2021/02/Amazon.png",
        avgRating: 3,
        reviewCount: 20000,
        salaryCount: 69,
        jobCount: 1,
    },
    {
        id: "3",
        name: "BKM",
        logoUrl: "https://datacentrereview.com/wp-content/uploads/2021/02/Amazon.png",
        avgRating: 3,
        reviewCount: 20000,
        salaryCount: 69,
        jobCount: 1,
    }
]