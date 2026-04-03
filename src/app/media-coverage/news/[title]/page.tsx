"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";

import Banner from "@/components/Banner";
import Links from "@/components/Links";
import ImageModal from "@/components/ImageModal";
import { newsMediaService } from "@/services/newsMediaService";
import { Breadcrumb } from "@/interfaces";
import { NewsMedia } from "@/types/supabase";

const MediaDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const title = decodeURIComponent(params.title as string);

  const [mediaItems, setMediaItems] = useState<NewsMedia[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", url: "/" },
    { label: "News & Media Coverage", url: "/media-coverage" },
    { label: title, url: "" },
  ];

  useEffect(() => {
    fetchMediaDetails();
  }, [title]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMediaDetails = async () => {
    try {
      setLoading(true);
      const grouped = await newsMediaService.getAllGroupedByTitle();
      const data = grouped[title] || [];
      setMediaItems(data);

      const allImages = data.flatMap((item: NewsMedia) => item.images || []).filter(Boolean);
      setImages(allImages);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const latestDate =
    mediaItems.length > 0
      ? formatDate(mediaItems[mediaItems.length - 1].event_date || mediaItems[mediaItems.length - 1].created_at)
      : "";

  if (loading) {
    return (
      <>
        <Banner backgroundImage="/images/Section.png" pageTitle={title} breadcrumbs={breadcrumbs} />
        <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
          Loading media...
        </div>
      </>
    );
  }

  return (
    <>
      <Banner
        backgroundImage="/images/Section.png"
        pageTitle="News & Media Coverage"
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F6F6FF] px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px]">
        <Links />

        <button
          onClick={() => router.push("/media-coverage")}
          className="flex cursor-pointer items-center gap-2 text-[#6366F1] font-medium mb-6"
        >
          <IoChevronBack size={20} />
          Go back
        </button>

        <div className="bg-[#EEF0FF] rounded-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <p className="text-sm text-gray-600">
            Total Photos: <span className="font-semibold">{images.length}</span>
          </p>

          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h1>
          </div>

          <p className="text-sm text-gray-600">{latestDate}</p>
        </div>

        {images.length === 0 ? (
          <div className="bg-white border border-[#E4E6F5] rounded-2xl py-16 text-center">
            <p className="text-[#5A5A89] text-lg font-medium">No images available for this media item.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <div
                key={`${img}-${index}`}
                onClick={() => {
                  setActiveIndex(index);
                  setModalOpen(true);
                }}
                className="bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <ImageModal
        isOpen={modalOpen}
        images={images}
        currentIndex={activeIndex}
        onClose={() => setModalOpen(false)}
        onNext={() => setActiveIndex((i) => Math.min(i + 1, images.length - 1))}
        onPrevious={() => setActiveIndex((i) => Math.max(i - 1, 0))}
      />
    </>
  );
};

export default MediaDetailsPage;
