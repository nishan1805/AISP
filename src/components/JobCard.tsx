"use client";

import React from 'react';
import { getJobStatusColor } from '@/utils/jobStatusColor';
import { Job } from '@/types/supabase';
import { FiArrowUpRight } from "react-icons/fi";
import { LuCalendarDays, LuClock3 } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";

interface JobCardProps {
    job: Job;
    onApply?: (jobId: string) => void;
    href?: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply, href }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
            {/* Header with title and apply button */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                {onApply ? (
                    <button
                        onClick={() => onApply(job.id.toString())}
                        className="text-[#6366f1] hover:bg-[#5855eb] hover:text-white bg-[#a6a7ff71] px-4 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                        Apply
                        <FiArrowUpRight className="text-lg font-bold" />
                    </button>
                ) : (
                    href ? (
                        <a
                            href={href}
                            className="text-[#6366f1] hover:bg-[#5855eb] hover:text-white bg-[#a6a7ff71] px-4 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                            Apply
                            <FiArrowUpRight className="text-lg font-bold" />
                        </a>
                    ) : null
                )}
            </div>
            {/* Description */}
            <div
                className="text-gray-600 text-base mb-4 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description || '' }}
            />

            {/* Tags/Badges */}
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
        </div>
    );
};

export default JobCard;