import React, { useState } from "react";

interface FeeTabsProps {
  newStudents: React.ReactNode;
  existingStudents: React.ReactNode;
}

const FeeTabs: React.FC<FeeTabsProps> = ({ newStudents, existingStudents }) => {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new");

  return (
    <div className="mb-8">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "new"
              ? "border-b-2 border-[#2F2F80] text-[#2F2F80]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("new")}
        >
          New Students
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "existing"
              ? "border-b-2 border-[#2F2F80] text-[#2F2F80]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("existing")}
        >
          Existing Students
        </button>
      </div>
      <div className="mt-6">
        {activeTab === "new" ? newStudents : existingStudents}
      </div>
    </div>
  );
};

export default FeeTabs;