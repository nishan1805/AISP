import { FacilityInterface } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const backgroundColors = ["bg-purple-100", "bg-green-100"];

interface FacilityCardProps extends FacilityInterface {
  index: number;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ image, title, description, iconImage, link, index }) => {
  const bgColor = backgroundColors[index % backgroundColors.length];

  return (
    <div className="relative bg-white rounded-xl shadow-xs">
      {/* Facility Image (Main Image) */}
      <div className="w-full h-[300px] relative">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Content Section (Overlapping Bottom) */}
      <div className={`absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-[90%] ${bgColor} rounded-xl shadow-sm mx-auto min-h-[140px] p-4`}>
        <div className="flex items-center gap-3">
          {/* Icon Image (Next to Title) */}
          <div className="w-8 h-8 relative bg-[#fff] p-[8px] rounded-[4px] flex items-center justify-center">
            <Image src={iconImage} alt="icon" width={24} height={24} className="object-contain" />
          </div>

          <h2 className="font-semibold text-[16px] lg:text-[20px] text-[#424242]">{title}</h2>
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        <Link href={link}>
          <span className="text-blue-600 font-medium mt-2 inline-block hover:underline">
            Read More →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FacilityCard;
