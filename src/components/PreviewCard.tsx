import React from "react";

interface PreviewCardProps {
  children?: React.ReactNode;
  title?: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ children, title }) => (
  <div className="mt-8 w-full flex flex-col items-center">
    {title && <h3 className="text-lg font-semibold mb-4 w-full text-left">{title}</h3>}
    <div
      className="bg-[#D9D9D9] rounded-lg w-full max-w-[800px] h-[1123px] md:h-[1123px] flex items-center justify-center shadow"
      style={{ aspectRatio: '210/297' }}
    >
      {children}
    </div>
  </div>
);

export default PreviewCard;