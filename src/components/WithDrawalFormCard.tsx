import React from "react";
import InputCard from "./InputCard";

interface WithDrawalFormCardProps {
  admissionNumber: string;
  dob: string;
  setAdmissionNumber: (val: string) => void;
  setDob: (val: string) => void;
  onFetch: () => void;
}

const WithDrawalFormCard: React.FC<WithDrawalFormCardProps> = ({ admissionNumber, dob, setAdmissionNumber, setDob, onFetch }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-8 w-full">
    <form className="flex flex-col md:flex-row gap-4 w-full items-center md:items-center lg:items-center">
      <div className="flex-1 w-full flex flex-col justify-center">
        <InputCard
          label="Admission Number"
          value={admissionNumber}
          onChange={e => setAdmissionNumber(e.target.value)}
          placeholder="Enter Admission Number"
        />
      </div>
      <div className="flex-1 w-full flex flex-col justify-center">
        <InputCard
          label="Date of Birth(DOB)"
          value={dob}
          onChange={e => setDob(e.target.value)}
          placeholder="DD/MM/YYYY"
        />
      </div>
      <button
        type="button"
        className="bg-[#23226B] text-white px-6 h-[44px] rounded w-full md:w-auto flex items-center justify-center"
        onClick={onFetch}
      >
        Fetch TC
      </button>
    </form>
  </div>
);

export default WithDrawalFormCard;
