import React from "react";
import Head from "next/head";
import Banner from "@/components/Banner";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import ContentCard from "@/components/ContentCard";
import { Breadcrumb } from "@/interfaces";
import Links from "@/components/Links";

const breadcrumbs: Breadcrumb[] = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/principals-note" },
    { label: "Principal’s Note", url: "/principals-note" },
];

const PrincipalsNote = () => {
    return (
        <>
            <Head>
                <title>Principal&apos;s Note - Achievers International School</title>
            </Head>
            <Banner backgroundImage="/images/Section.png" pageTitle="Principal&apos;s Note" breadcrumbs={breadcrumbs} />
            <Links />
            <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
                <SubTitle subTitle="Welcome from," textAlign="left" />
                <Title title="The Principal" textAlign="left" />
                <ContentCard
                    image="/images/principal.jpeg"
                    alt="Principal&apos;s Note"
                    imageLeft={true}
                    principalDetails={
                        {
                            name: "Dr. Rakesh Mohan Mishra",
                            address: "Principal, Achievers International School",
                        }
                    }
                    description={
                        <>
                            <p className="mb-4 text-[18px] text-[#000] text-justify">Dear Parents, Students, and Esteemed Community Members,</p>
                            <p className="mb-4 text-[18px] text-[#000] text-justify">With great pleasure and honour, I welcome you to Achievers International School, where our commitment to excellence and holistic development sets the foundation for our student&apos;s success. As the Principal, I am privileged to lead a community that believes in nurturing every child&apos;s unique talents and aspirations. Our mission is to provide an environment where academic rigour harmoniously blends with character-building, creativity, and critical thinking.</p>
                            <p className="mb-4 text-[18px] text-[#000] text-justify">At Achievers International, we take pride in being pioneers of AI-integrated classrooms. Our recognition as the No. 1 CBSE school in the region is a testament to our pursuit of innovation. Our dedicated educators strive to instil a lifelong love for learning, empowering students to explore their passions, embrace challenges, and develop resilience. We recognise that education goes beyond textbooks, and we offer a rich curriculum balanced with extracurricular activities to encourage holistic growth.</p>
                            <p className="mb-4 text-[18px] text-[#000] text-justify">We also believe that a strong partnership between school and home is crucial for our students&apos; success. Your involvement and support are invaluable as we work together to create a nurturing and stimulating environment.</p>
                        </>
                    }
                />
                <div className="px-2 sm:px-4 md:px-0">
                    <p className="mb-4 text-[18px] text-[#000] text-justify">This website serves as a comprehensive resource for information about our school&apos;s programs, policies, and upcoming events. We invite you to explore its various sections and stay connected with our vibrant school community.</p>
                    <p className="mb-4 text-[18px] text-[#000] text-justify">As we embark on this journey together, let us remember that education is a shared endeavour—one that shapes confident individuals and compassionate citizens.</p>
                    <p className="mb-4 text-[18px] text-[#000] text-justify">Warm regards,
                        <p><strong>Principal </strong></p></p>
                </div>
            </section>
        </>
    );
};

export default PrincipalsNote;
