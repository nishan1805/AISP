import React from "react";

interface InputCardProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const InputCard: React.FC<InputCardProps> = ({ label, value, onChange, placeholder = "", type = "text" }) => (
  <div className="w-full mb-0 flex flex-col justify-center">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded px-3 py-2 h-[44px] transition"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputCard;
