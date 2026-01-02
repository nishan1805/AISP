"use client";

import React, { useEffect, useState } from "react";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import FacultyCard from "@/components/FacultyCard";
import Links from "@/components/Links";
import FacultyTabs from "@/components/FacultyTabs";
import Banner from "@/components/Banner";
import { Breadcrumb } from "@/interfaces";
import { facultyStaffService } from "@/services/facultyStaffService";
import { FacultyStaff } from "@/types/supabase";

const Faculties: React.FC = () => {
  const [teachingStaff, setTeachingStaff] = useState<FacultyStaff[]>([]);
  const [nonTeachingStaff, setNonTeachingStaff] = useState<FacultyStaff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    try {
      setLoading(true);
      const [teaching, nonTeaching] = await Promise.all([
        facultyStaffService.getByCategory('Teaching'),
        facultyStaffService.getByCategory('Non-Teaching')
      ]);
      setTeachingStaff(teaching);
      setNonTeachingStaff(nonTeaching);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTeachingStaff = () => {
    if (loading) {
      return (
        <div className="p-6 text-center">
          <p className="text-gray-500">Loading teaching staff...</p>
        </div>
      );
    }

    if (teachingStaff.length === 0) {
      return (
        <div className="p-6 text-center">
          <p className="text-gray-500">No teaching staff members found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {teachingStaff.map((member: FacultyStaff, index: number) => (
          <FacultyCard
            key={member.id}
            image={member.image_url || "/images/teacher.webp"}
            index={index}
            name={member.name}
            designation={member.designation}
          />
        ))}
      </div>
    );
  };

  const renderNonTeachingStaff = () => {
    if (loading) {
      return (
        <div className="p-6 text-center">
          <p className="text-gray-500">Loading non-teaching staff...</p>
        </div>
      );
    }

    if (nonTeachingStaff.length === 0) {
      return (
        <div className="p-6 text-center">
          <p className="text-gray-500">No non-teaching staff members found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {nonTeachingStaff.map((member: FacultyStaff, index: number) => (
          <FacultyCard
            key={member.id}
            image={member.image_url || "/images/faculty.png"}
            index={index}
            name={member.name}
            designation={member.designation}
          />
        ))}
      </div>
    );
  };

  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/' },
    { label: 'Academics', url: '/faculty' },
    { label: 'Faculty', url: '/faculty' },
  ];

  return (
    <>
      <Banner
        backgroundImage="/images/Section.png"
        pageTitle="Faculty"
        breadcrumbs={breadcrumbs}
      />
      <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
        <Links />
        <SubTitle subTitle={"Meet"} textAlign="left" />
        <Title title={"Our Faculty"} textAlign="left" />
        <p className="text-[#525252] md:text-[20px] text-[16px] my-4">Welcome to Achievers International School. We strive to provide </p>

        <FacultyTabs
          teachingStaff={renderTeachingStaff()}
          nonTeachingStaff={renderNonTeachingStaff()}
        />
      </section>
    </>
  );
};

export default Faculties;
