'use client';

import React from "react";
import Banner from "@/components/Banner";
import Links from "@/components/Links";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import { Breadcrumb } from "@/interfaces";
import FeeTabs from "@/components/FeeTabs";
import FeeTable from "@/components/FeeTable";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about-us" },
  { label: "Fee Structure", url: "" },
];

// Data for New Students tab
const admissionFeesNew = [
  { className: "Playgroup", fee: "2500" },
  { className: "Nursery", fee: "3000" },
  { className: "LKG", fee: "3000" },
  { className: "UKG", fee: "3000" },
  { className: "Std I & II", fee: "4000" },
  { className: "Std III to V", fee: "4000" },
  { className: "Std VI to VIII", fee: "5000" },
  { className: "Std IX & X", fee: "5000" },
  { className: "Std XI & XII (Arts & Commerce)", fee: "5000" },
  { className: "Std XI & XII (Maths)", fee: "5000" },
  { className: "Std XI & XII (Biology)", fee: "5000" },
];

const tuitionFeesNew = [
  { className: "Playgroup", fee: "12500" },
  { className: "Nursery", fee: "14900" },
  { className: "LKG", fee: "15600" },
  { className: "UKG", fee: "16200" },
  { className: "Std I & II", fee: "17800" },
  { className: "Std III to V", fee: "18900" },
  { className: "Std VI to VIII", fee: "19800" },
  { className: "Std IX & X", fee: "27000" },
  { className: "Std XI & XII (Arts & Commerce)", fee: "32000" },
  { className: "Std XI & XII (Maths)", fee: "34500" },
  { className: "Std XI & XII (Biology)", fee: "35000" },
];

// Data for Existing Students tab (matches the image)
const tuitionFeesExisting = [
  { className: "Playgroup", fee: "12500" },
  { className: "Nursery", fee: "14900" },
  { className: "LKG", fee: "15600" },
  { className: "UKG", fee: "16200" },
  { className: "Std I & II", fee: "17800" },
  { className: "Std III to V", fee: "18900" },
  { className: "Std VI to VIII", fee: "19800" },
  { className: "Std IX & X", fee: "27000" },
  { className: "Std XI & XII (Arts & Commerce)", fee: "32000" },
  { className: "Std XI & XII (Maths)", fee: "34500" },
  { className: "Std XI & XII (Biology)", fee: "35000" },
];

const FeeStructurePage = () => (
  <>
    <Banner backgroundImage="/images/Section.png" pageTitle="Fee Structure 2025–26" breadcrumbs={breadcrumbs} />
    <Links />
    <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
      {/* <SubTitle subTitle="" textAlign="left" />
      <Title title="Fee Structure 2025–26" textAlign="left" /> */}
      <FeeTabs
        newStudents={
          <>
            <div className="font-semibold mb-2">A. Admission Fees (One Time)</div>
            <FeeTable title="" rows={admissionFeesNew} />
            <div className="font-semibold mt-8 mb-2">B. Tuition Fees</div>
            <FeeTable title="" rows={tuitionFeesNew} />
          </>
        }
        existingStudents={
          <>
            <div className="font-semibold mb-2">A. Tuition Fees</div>
            <FeeTable title="" rows={tuitionFeesExisting} />
          </>
        }
      />
    </section>
  </>
);

export default FeeStructurePage;