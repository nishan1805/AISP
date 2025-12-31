"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import JobDetails from "@/components/JobDetails";
import ApplicationModal, { ApplicationFormData } from "@/components/ApplicationModal";
import SuccessModal from "@/components/SuccessModal";
import { jobsService } from "@/services/jobsService";
import { Job } from "@/types/supabase";
import Links from "@/components/Links";

const JobDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const jobData = await jobsService.getById(id);
      setJob(jobData);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Job not found.</p>
        </div>
      </div>
    );
  }

  const handleApplyNow = () => {
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSubmit = (formData: ApplicationFormData) => {
    setIsApplicationModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleGoToCareers = () => {
    setIsSuccessModalOpen(false);
    router.push("/careers");
  };

  return (
    <>
      <JobDetails
        job={job}
        onBack={() => router.push("/careers")}
        onApply={handleApplyNow}
      />
      <ApplicationModal
        job={job}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onSubmit={handleApplicationSubmit}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        jobTitle={job.title}
        onClose={handleSuccessClose}
        onGoToCareers={handleGoToCareers}
      />
    
    </>
  );
};

export default JobDetailsPage;
