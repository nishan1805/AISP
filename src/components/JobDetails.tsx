"use client";

import React from 'react';
import { getJobStatusColor } from '@/utils/jobStatusColor';
import { Job } from '@/types/supabase';
import { PiShareFatBold } from "react-icons/pi";
import Banner from './Banner';
import { Breadcrumb } from '@/interfaces';
import Links from './Links';
import { LuCalendarDays, LuClock3 } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";

interface JobDetailsProps {
    job: Job;
    onBack: () => void;
    onApply: () => void;
}

const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/' },
    { label: 'Careers', url: '/careers' },
    { label: 'Job Details', url: '' },
];

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack, onApply }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <>
            <Banner
                backgroundImage="/images/Section.png"
                pageTitle="Job Details"
                breadcrumbs={breadcrumbs}
            />
            <Links />
            <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">

                <div className="mx-auto">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 pb-6">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                            <button
                                onClick={() => { }}
                                className="flex items-center gap-2 text-[#6366f1] hover:bg-[#5855eb] hover:text-white bg-[#a6a7ff71] px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
                            >
                                Share this job
                                <PiShareFatBold />
                            </button>
                        </div>
                        <div className='flex justify-between mt-8'>
                            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                                {job.subject && (
                                    <div className="flex items-center gap-2 text-[#3E8083] bg-[#F7F7F9] font-medium px-3 py-1 rounded-full border border-[#F7F7F9]">
                                        <IoBookOutline />
                                        <span>{job.subject}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-[#3F4092] bg-[#ECECF4] px-3 py-1 rounded-full border border-[#ECECF4]">
                                    <LuCalendarDays />
                                    <span>Last Date: {formatDate(job.last_date_to_apply)}</span>
                                </div>

                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium ${getJobStatusColor(job.job_type)}`}>
                                    <LuClock3 />
                                    <span>
                                        {job.job_type}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">Posted on: {formatDate(job.created_at)}</p>
                        </div>

                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Job Description */}
                        {job.description && (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
                                <div
                                    className="text-gray-600 leading-relaxed text-sm prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: job.description }}
                                />
                            </section>
                        )}

                        {/* About AISSPUR */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">About AISSPUR</h2>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                At AISSPUR, we are committed to fostering academic excellence and holistic development. Our mission is to nurture inquisitive minds, strong values, and future-ready learners. With a focus on conceptual clarity and innovative pedagogy, AISSPUR teachers guide students toward critical thinking and problem-solving excellence.
                            </p>
                        </section>

                        {job.what_youll_do && job.what_youll_do.length > 0 && (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">What You&apos;ll Do</h2>
                                <ul className="space-y-2 text-sm">
                                    {job.what_youll_do.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* What We're Looking For */}
                        {job.what_were_looking_for && job.what_were_looking_for.length > 0 && (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">What We&apos;re Looking For</h2>
                                <ul className="space-y-2 text-sm">
                                    {job.what_were_looking_for.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* What We Offer */}
                        {job.what_we_offer && job.what_we_offer.length > 0 && (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">What We Offer</h2>
                                <ul className="space-y-2 text-sm">
                                    {job.what_we_offer.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* How to Apply */}
                        {job.how_to_apply && job.how_to_apply.length > 0 && (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Apply</h2>
                                <ul className="space-y-2 text-sm">
                                    {job.how_to_apply.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-200 p-6 flex justify-start items-center gap-4">
                        <button
                            onClick={onBack}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors cursor-pointer"
                        >
                            Back
                        </button>
                        <button
                            onClick={onApply}
                            className="bg-[#5855eb] hover:bg-[#474cbe] text-white px-8 py-2 rounded-md font-medium transition-colors cursor-pointer"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JobDetails;