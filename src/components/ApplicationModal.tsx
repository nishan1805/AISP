"use client";

import React, { useState } from 'react';
import { Job } from '@/types/supabase';
import { jobApplicationsService } from '@/services/jobApplicationsService';
import { RxCross1 } from "react-icons/rx";
import { HiOutlineCloudUpload } from "react-icons/hi";

interface ApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ApplicationFormData) => void;
}

export interface ApplicationFormData {
  fullName: string;
  phoneNo: string;
  emailId: string;
  address: string;
  about: string;
  resumeFile: File | null;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    phoneNo: '',
    emailId: '',
    address: '',
    about: '',
    resumeFile: null
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resumeFile: file }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      setFormData(prev => ({ ...prev, resumeFile: file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Supabase
      await jobApplicationsService.submit({
        job_id: job.id,
        full_name: formData.fullName,
        phone_no: formData.phoneNo,
        email_id: formData.emailId,
        attachment_url: ''
      });

      // Call parent onSubmit callback
      onSubmit(formData);
      resetForm();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNo: '',
      emailId: '',
      address: '',
      about: '',
      resumeFile: null
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#d6d6d695] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-8 pb-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Apply to Job</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer"
          >
            <RxCross1 />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name*"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phone Number */}
          <div>
            <input
              type="tel"
              name="phoneNo"
              placeholder="Phone No.*"
              value={formData.phoneNo}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="emailId"
              placeholder="Email Id*"
              value={formData.emailId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address*"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* About */}
          <div>
            <textarea
              name="about"
              placeholder="About (Optional)"
              value={formData.about}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume/CV
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col items-center">
                
                <HiOutlineCloudUpload className='w-8 h-8 text-gray-400 mb-2' />
                <p className="text-sm text-gray-600 mb-1">
                  {formData.resumeFile ? formData.resumeFile.name : 'Upload a file or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">PDF, DOC - up to 5 MB</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="mt-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Browse File
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-[#5855eb] hover:bg-[#474cbe] text-white rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;