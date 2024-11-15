import React from 'react'
import CompanyCard from '../components/companyCard'

export default function CompaniesPage() {
    return (
        <div>
            CompaniesPage
            <CompanyCard
                name="Agogo"
                logoUrl="https://play-lh.googleusercontent.com/EN4vEdLW-Y2CudJ01SiOsa3XOv5MdlO7uOVAmm-FuE6gDmPZZshcQDu-SuEI1RpTG0g"
                avgRating={4.5}
                reviewCount={100}
                salaryCount={100}
                jobCount={100}
            />
        </div>
    )
}
