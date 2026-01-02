"use client";

import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import { Breadcrumb } from "@/interfaces";
import MandatoryDisclosureCard from "@/components/MandatoryDisclosureCard";
import Links from "@/components/Links";
import { mandatoryDisclosureService } from "@/services/mandatoryDisclosureService";
import { MandatoryDisclosure as MandatoryDisclosureType } from "@/types/supabase";

const breadcrumbs: Breadcrumb[] = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/public-disclosure" },
    { label: "Mandatory Disclosure", url: "/public-disclosure" },
];

const MandatoryDisclosure = () => {
    const [disclosures, setDisclosures] = useState<MandatoryDisclosureType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDisclosures();
    }, []);

    const fetchDisclosures = async () => {
        try {
            setLoading(true);
            const data = await mandatoryDisclosureService.getAll();
            // console.log('Fetched mandatory disclosures:', data);
            setDisclosures(data);
        } catch (error) {
            console.error('Error fetching mandatory disclosures:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <Banner backgroundImage="/images/Section.png" pageTitle="Mandatory Disclosure" breadcrumbs={breadcrumbs} />
            <Links />
            <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
                <SubTitle subTitle="Important Information" textAlign="left" />
                <Title title="Mandatory Disclosure (CBSE)" textAlign="left" />
                <p className="text-[16px] md:text-[18px] font-medium leading-[27px] text-[var(--Gray-600,#525252)] font-inter my-8">
                    As per CBSE Appendix IX, this section provides all mandatory public disclosures including details on affiliation, infrastructure, faculty, and academic resources. The information is regularly updated and made accessible to ensure transparency for all stakeholders.
                </p>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E2879]"></div>
                    </div>
                ) : disclosures.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No disclosures available
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {disclosures.map((item) => (
                            <MandatoryDisclosureCard
                                key={item.id}
                                title={item.title}
                                updatedOn={formatDate(item.updated_at)}
                                link={item.file_url || '#'}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>

    );
};

export default MandatoryDisclosure;
