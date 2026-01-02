import React from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryCardProps {
  image: string;
  title: string;
  date: string;
  imageCount?: number;
  href?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  title,
  date,
  imageCount,
  href
}) => {
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const cardContent = (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image || "/images/logo.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Photo Count Badge */}
        {imageCount && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" />
            </svg>
            {imageCount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>

        {/* Footer with Date and View All */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-medium">{formatDate(date)}</span>
          <span className="text-sm text-blue-600 font-medium">View all &gt;</span>
        </div>
      </div>
    </div>
  );

  // If href is provided, wrap with Link
  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default GalleryCard;
