"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

import Banner from "@/components/Banner";
import Links from "@/components/Links";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import { photoGalleryService } from "@/services/photoGalleryService"; import { PhotoGallery } from '@/types/supabase'; import { Breadcrumb } from "@/interfaces";

/* ------------------ Breadcrumbs ------------------ */
const breadcrumbs: Breadcrumb[] = [
  { label: "Home", url: "/" },
  { label: "Media Gallery", url: "/image-gallery" },
];

/* ------------------ Types ------------------ */
interface GroupedGallery {
  title: string;
  firstImage: string;
  imageCount: number;
  latestDate: string;
}

/* ------------------ Page ------------------ */
const ImageGalleryPage = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i); // Current year + 5 past years

  const [groupedGalleries, setGroupedGalleries] = useState<GroupedGallery[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState("All Month");
  const [loading, setLoading] = useState(true);

  /* ------------------ Fetch Data ------------------ */
  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const grouped = await photoGalleryService.getAllGroupedByTitle();

      const galleryGroups: GroupedGallery[] = Object.entries(grouped)
        .map(([title, galleries]: [string, PhotoGallery[]]) => {
          const allImages = galleries.flatMap((g) => g.images);
          const latestGallery = galleries.reduce((a, b) =>
            new Date(b.created_at) > new Date(a.created_at) ? b : a
          );

          return {
            title,
            firstImage: allImages[0] || "/images/placeholder.jpg",
            imageCount: allImages.length,
            latestDate: latestGallery.event_date || latestGallery.created_at,
          };
        })
        .sort(
          (a, b) =>
            new Date(b.latestDate).getTime() -
            new Date(a.latestDate).getTime()
        );

      setGroupedGalleries(galleryGroups);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ Helpers ------------------ */
  const handleCardClick = (title: string) => {
    router.push(`/image-gallery/${encodeURIComponent(title)}`);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const filteredGalleries = groupedGalleries.filter((gallery) =>
    gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ------------------ UI ------------------ */
  return (
    <>
      {/* Hero */}
      <Banner
        backgroundImage="/images/Section.png"
        pageTitle="Media Gallery"
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F6F6FF] px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px]">
        <Links />
        <SubTitle subTitle="Moments That Matter!" textAlign="left" />
        <Title title="" textAlign="left" />

        <p className="text-[#525252] text-[16px] md:text-[20px] my-4">
          Explore our collection of memorable moments and events captured at AISSPUR.
        </p>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-[#EEF0FF] rounded-2xl px-6 py-5 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <p className="text-[#8B8BB5] font-medium">
              Total Results:{" "}
              <span className="font-semibold text-[#5A5A89]">
                {filteredGalleries.length}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              {/* Year */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full sm:w-[200px] bg-white px-5 py-3 rounded-full focus:outline-none"
              >
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-[200px] bg-white px-5 py-3 rounded-full focus:outline-none"
              >
                <option>All Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>

              {/* Search */}
              <div className="relative w-full sm:w-[260px]">
                <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search event"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-12 pr-4 py-3 rounded-full focus:outline-none"
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= GALLERY GRID ================= */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading galleries...</p>
        ) : filteredGalleries.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No results found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGalleries.map((gallery, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(gallery.title)}
                className="group cursor-pointer rounded-lg bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-[220px]">
                  <Image
                    src={gallery.firstImage}
                    alt={gallery.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded-md">
                    📷 {gallery.imageCount}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-[18px] font-semibold text-gray-800 mb-3">
                    {gallery.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="bg-[#EEF0FF] text-[#4F46E5] text-sm px-3 py-1 rounded-full">
                      {formatDate(gallery.latestDate)}
                    </span>

                    <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                      View all <MdOutlineArrowOutward />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default ImageGalleryPage;
