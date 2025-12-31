"use client";

import React, { useState } from "react";

interface FacultyTabsProps {
  teachingStaff: React.ReactNode;
  nonTeachingStaff: React.ReactNode;
}

const FacultyTabs: React.FC<FacultyTabsProps> = ({ teachingStaff, nonTeachingStaff }) => {
  const [activeTab, setActiveTab] = useState<"teaching" | "nonTeaching">("teaching");

  return (
    <div className="mb-8">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-3 text-lg font-medium relative transition-colors duration-200 ${
            activeTab === "teaching"
              ? "text-[#6366f1] border-b-3 border-[#6366f1]"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("teaching")}
        >
          Teaching Staff
          {activeTab === "teaching" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#6366f1] rounded-t"></div>
          )}
        </button>
        <button
          className={`px-6 py-3 text-lg font-medium relative transition-colors duration-200 ml-8 ${
            activeTab === "nonTeaching"
              ? "text-[#6366f1] border-b-3 border-[#6366f1]"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("nonTeaching")}
        >
          Non-Teaching Staff
          {activeTab === "nonTeaching" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#6366f1] rounded-t"></div>
          )}
        </button>
      </div>
      <div className="mt-6">
        {activeTab === "teaching" ? teachingStaff : nonTeachingStaff}
      </div>
    </div>
  );
};

export default FacultyTabs;