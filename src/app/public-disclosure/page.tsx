import React from "react";
import Banner from "@/components/Banner";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import { Breadcrumb } from "@/interfaces";
import MandatoryDisclosureCard from "@/components/MandatoryDisclosureCard";
import Links from "@/components/Links";

const breadcrumbs: Breadcrumb[] = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/public-disclosure" },
    { label: "Mandatory Disclosure", url: "/public-disclosure" },
];

const MandatoryDisclosure = () => {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        // { id: 1, title: "Mandatory Public Disclosure", updatedOn: "March 2025" , link: "/pdf/Mandatory-Public-Disclosure.pdf"},
                        { id: 2, title: "Prescribed Textbook List", updatedOn: "March 2025", link: "/pdf/Textbook-list.pdf" },
                        { id: 3, title: "Faculty Details", updatedOn: "March 2025", link: "/pdf/Teacher-Details.pdf" },
                        { id: 4, title: "Fees-Structure-2023-24-Updated", updatedOn: "March 2025", link: "/pdf/Fees-Structure-2023-24-Updated.pdf" },
                        { id: 5, title: "SMC", updatedOn: "March 2025", link: "/pdf/SMC.pdf" },
                        { id: 6, title: "DEO_RECOG_NEW_08_JULY_2024", updatedOn: "March 2025", link: "/pdf/DEO_RECOG_NEW_08_JULY_2024.pdf" },
                        { id: 7, title: "PTA", updatedOn: "March 2025", link: "/pdf/PTA.pdf" },
                        { id: 8, title: "SELF-CERTIFICATION-FINAL", updatedOn: "March 2025", link: "/pdf/SELF-CERTIFICATION-FINAL.pdf" },
                        { id: 9, title: "SAFE-DRINKING-WATER-AND-SANITATION-CERTIFICATE", updatedOn: "March 2025", link: "/pdf/SAFE-DRINKING-WATER-AND-SANITATION-CERTIFICATE.pdf" },
                        { id: 10, title: "FIRE-SAFETY-CERTIFICATE", updatedOn: "March 2025", link: "/pdf/FIRE-SAFETY-CERTIFICATE.pdf" },
                        { id: 11, title: "ACADEMIC-CALENDAR-2023-24", updatedOn: "March 2025", link: "/pdf/ACADEMIC-CALENDAR-2023-24.pdf" },
                        { id: 12, title: "SOCIETY-REG.-CERTIFICATE", updatedOn: "March 2025", link: "/pdf/SOCIETY-REG.-CERTIFICATE.pdf" },
                        { id: 13, title: "BUILDING-SAFETY-CERTIFICATE", updatedOn: "March 2025", link: "/pdf/BUILDING-SAFETY-CERTIFICATE.pdf" },
                        { id: 14, title: "CBSE-UPGRADATION-GRANT-LETTER", updatedOn: "March 2025", link: "/pdf/CBSE-UPGRADATION-GRANT-LETTER.pdf" },
                        { id: 15, title: "NOC-DEO", updatedOn: "March 2025", link: "/pdf/NOC-DEO.pdf" },
                    ].map((item) => (
                        <MandatoryDisclosureCard key={item.id} title={item.title} updatedOn={item.updatedOn} link={item.link} />
                    ))}
                </div>
            </section>
        </>

    );
};

export default MandatoryDisclosure;
