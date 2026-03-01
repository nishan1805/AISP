import React from 'react'
import { Breadcrumb } from '@/interfaces'
import Links from '@/components/Links'
import Banner from '@/components/Banner';
import SubTitle from '@/components/SubTitle';
import Title from '@/components/Title';
import StreamTableGrid from '@/components/StreamTableGrid';

const breadcrumbs: Breadcrumb[] = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/admission/academic-streams-xi-xii" },
    { label: "Academic Streams (XI & XII)", url: "" },
];

const biologySubjects = [
    { id: 1, name: "English" },
    { id: 2, name: "Chemistry" },
    { id: 3, name: "Physics" },
    { id: 4, name: "Biology" },
    { id: 5, name: "Physical Education" },
];

const commerceSubjects = [
    { id: 1, name: "English" },
    { id: 2, name: "Accountancy" },
    { id: 3, name: "Economics" },
    { id: 4, name: "Business Study" },
    { id: 5, name: "Physical Education" },
];

const artsSubjects = [
    { id: 1, name: "English" },
    { id: 2, name: "Hindi" },
    { id: 3, name: "Physics" },
    { id: 4, name: "Chemistry" },
    { id: 5, name: "Physical Education" },
];

const AcademicStreams = () => {
    return (
        <>
            <Banner backgroundImage="/images/Section.png" pageTitle="Academic Streams" breadcrumbs={breadcrumbs} />
            <Links/>
            <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
                <SubTitle subTitle="Academic Streams for" textAlign="left" />
                <Title title="Class XI & XII" textAlign="left" />
                <div className="flex flex-col gap-8 mt-8">
                    <StreamTableGrid streamName="Biology" subjects={biologySubjects} />
                    <StreamTableGrid streamName="Commerce" subjects={commerceSubjects} />
                    <StreamTableGrid streamName="Mathematics" subjects={artsSubjects} />
                </div>
            </section>
        </>
    )
}

export default AcademicStreams
