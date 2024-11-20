"use client";

import React, { useEffect, useState } from 'react';
import CompanyCard from './components/companyCard';
import { Input } from '@nextui-org/input';
import { Button, Skeleton } from '@nextui-org/react';
import { buildUrl } from '@/utils/api';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(buildUrl("company"));
      const data = await response.json();

      data.forEach((company: any) => {
        const { overview, salary, interview, benefit } = company.review_score;
        const avgRating = [overview, salary, interview, benefit].every(score => score.rating)
          ? (overview.rating + salary.rating + interview.rating + benefit.rating) / 4
          : 0;
        company.avgRating = avgRating;
      });

      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Companies</h1>
      <div className="flex items-center gap-2 mb-4">
        {loading ? (
          <>
            <Skeleton className="h-10 w-64 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </>
        ) : (
          <>
            <Input placeholder="Search companies" className="max-w-xs" />
            <Button>Search</Button>
          </>
        )}
      </div>
      <div>
        {loading ? (
          <div>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-40 w-full rounded-lg mb-4"
              />
            ))}
          </div>
        ) : (
          companies.map((company) => (
            <CompanyCard
              key={company.id}
              id={company.id}
              name={company.name}
              logourl={company.logourl}
              avgRating={company.avgRating}
              reviewCount={company.reviewCount}
              salaryCount={company.salaryCount}
              jobCount={company.jobCount}
            />
          ))
        )}
      </div>
    </div>
  );
}
