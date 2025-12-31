"use client";

import React, { useState, useEffect } from 'react';
import SubTitle from '../../components/SubTitle';
import Title from '../../components/Title';
import Links from '@/components/Links';
import JobCard from '@/components/JobCard';
import Banner from '@/components/Banner';
import { Breadcrumb } from '@/interfaces';
import { jobsService } from '@/services/jobsService';
import { Job } from '@/types/supabase';

const breadcrumbs: Breadcrumb[] = [
  { label: 'Home', url: '/' },
  { label: 'Careers', url: '/careers' },
  { label: 'Job Listings', url: '' },
];

const CareersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsService.getAll();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeroSection = () => (
    <Banner
      backgroundImage="/images/Section.png"
      pageTitle="Careers"
      breadcrumbs={breadcrumbs}
    />
  );

  return (
    <>
      {renderHeroSection()}
      <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
        <Links />
        <SubTitle subTitle="Be part of our School!" textAlign="left" />
        <Title title="" textAlign="left" />
        <p className="text-[#525252] md:text-[20px] text-[16px] my-4">
          We provide a supportive environment, professional development and competitive benefits. See current openings below:
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md bg-white">
            <input
              type="text"
              placeholder="Explore jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                // Use Next.js Link for navigation
                href={`/careers/job-details/${job.id}`}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CareersPage;