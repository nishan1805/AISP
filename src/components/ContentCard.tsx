import Image from "next/image";
import React from "react";

interface ContentCardProps {
  alt: string;
  description: React.ReactElement;
  image: string;
  imageLeft?: boolean; // Toggle image position
  principalDetails?: {
    name: string;
    address: string;
  }
}

const ContentCard: React.FC<ContentCardProps> = ({ description, image, alt, imageLeft = false , principalDetails}) => {
  return (
    <div
      className={`flex flex-col md:flex-row  my-6 md:my-10 rounded-lg ${
        imageLeft ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <div className={`w-full md:w-[1/2] flex  ${imageLeft ? "md:justify-end" : "" }  `}>
        <div className="w-[100%] sm:w-[80%] h-full rounded-lg p-2 md:p-4 bg-white shadow-xs">
          <div className={`${principalDetails ? "h-[85%]" : "h-full"} w-full rounded-lg`}>
          <Image
            src={image}
            alt={alt}
            width={400}
            height={300}
            className="w-full h-full object-cover rounded-lg"
          />
          </div>
          {
            principalDetails && (
              <div className="mt-4">
                <h2 className="text-[18px] md:text-[24px] font-semibold text-[#393A85]">{principalDetails.name}</h2>
                <p className="text-[14px] md:text-[18px] text-[#5A5A5A]">{principalDetails.address}</p>
              </div>
            )
          }
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full md:w-[1/2] px-2 sm:px-4 md:px-0 my-4 md:py-0">{description}</div>
    </div>
  );
};

export default ContentCard;
