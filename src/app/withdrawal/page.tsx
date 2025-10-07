'use client';

import React, { useState } from "react";
import Banner from "@/components/Banner";
import SubTitle from "@/components/SubTitle";
import { Breadcrumb } from "@/interfaces";
import WithDrawalFormCard from "@/components/WithDrawalFormCard";
import PreviewCard from "@/components/PreviewCard";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", url: "/" },
  { label: "Admission", url: "/admission" },
  { label: "Admission Process", url: "" },
];

const WithdrawalPage = () => {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [dob, setDob] = useState("");

  // Add logic for fetching TC if needed

  return (
    <>
      <Banner
        backgroundImage="/images/Section.png"
        pageTitle="Withdraw Transfer Certificate"
        breadcrumbs={breadcrumbs}
      />
      <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
        <SubTitle subTitle="Enter Student Details" textAlign="left" />
        <WithDrawalFormCard
          admissionNumber={admissionNumber}
          dob={dob}
          setAdmissionNumber={setAdmissionNumber}
          setDob={setDob}
          onFetch={() => {}}
        />
        <SubTitle subTitle="Transfer Certificate Preview" textAlign="left" />
        <PreviewCard />
      </section>
    </>
  );
};

export default WithdrawalPage;