"use client";
import React from 'react';
import { FaCheck } from "react-icons/fa6";

interface SuccessModalProps {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
  onGoToCareers: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  jobTitle, 
  onClose, 
  onGoToCareers 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#d6d6d695] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 text-center flex flex-col items-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 bg-[#01A100] rounded-full flex items-center justify-center">
            <FaCheck className="text-5xl text-[#fff]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Thank you for applying to AISSPUR. Your application for <span className="font-semibold">{jobTitle} (Regular)</span> has 
          been received. We&apos;ll review your profile and contact you if shortlisted.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onGoToCareers}
            className="px-4 py-2 bg-[#5855eb] hover:bg-[#474cbe] text-white rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            Go to Careers Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;