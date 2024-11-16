"use client";

import XIcon from "@/public/icons/xIcon";
import CheckIcon from "@/public/icons/checkIcon";
import MinusIcon from "@/public/icons/minusIcon";
import React from "react";
import { User } from "@nextui-org/react";
import Link from 'next/link'
import HealthInsuranceIcon from "@/public/icons/healthInsuranceIcon";
import StockPlanIcon from "@/public/icons/stockPlan";
import LAndDIcon from "@/public/icons/lAndDIcon";
import VacationIcon from "@/public/icons/vacationIcon";

export type ReviewBenefitsType = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    health_insurance: number;
    stock_plan: number;
    stock_options: number;
    annual_leave: number;
    l_and_d: number;
    createdAt: string;
};

export type ReviewBenefitsProps = React.HTMLAttributes<HTMLDivElement> & ReviewBenefitsType;

const BenefitItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: number }) => (
    <div className="mt-4 w-full px-4">
        <div className="flex gap-2 items-center justify-between px-4">
            <Icon />
            <p className="font-semibold">{label}</p>
            {GetBenefitSymbol(value)}
        </div>
    </div>
);

export const ReviewCardBenefits = React.forwardRef<HTMLDivElement, ReviewBenefitsProps>(
    ({ user, health_insurance, stock_plan, stock_options, annual_leave, l_and_d, createdAt, id, ...props }, ref) => (
        // <Link href={`/reviews/benefits/${id}`}>
        <div ref={ref} {...props} className="border-b pb-4 mb-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    <User
                        avatarProps={{
                            src: user.avatar,
                        }}
                        classNames={{
                            name: "font-medium text-lg",
                            description: "text-small text-gray-500",
                        }}
                        description={new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        }).format(new Date(createdAt))}
                        name={user.name}
                    />
                </div>
            </div>
            <BenefitItem icon={HealthInsuranceIcon} label="Health Insurance" value={health_insurance} />
            <BenefitItem icon={StockPlanIcon} label="Stock Plan" value={stock_plan} />
            <BenefitItem icon={StockPlanIcon} label="Stock Options" value={stock_options} />
            <BenefitItem icon={VacationIcon} label="Annual Leave" value={annual_leave} />
            <BenefitItem icon={LAndDIcon} label="L&D" value={l_and_d} />
        </div>
        // </Link>
    ),
);

export const GetBenefitSymbol = (val: number) => {
    switch (val) {
        case 0:
            return <XIcon />;
        case 1:
            return <CheckIcon />;
        case 2:
            return <MinusIcon />;
        default:
            return null;
    }
}