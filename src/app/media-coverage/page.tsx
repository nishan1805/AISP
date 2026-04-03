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
import { newsMediaService } from "@/services/newsMediaService";
import { NewsMedia } from "@/types/supabase";
import { Breadcrumb } from "@/interfaces";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", url: "/" },
  { label: "News & Media Coverage", url: "/media-coverage" },
];

const months = [
  "All Month",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface GroupedNews {
  title: string;
  firstImage: string;
  imageCount: number;
  latestDate: string;
}

const MediaGalleryPage = () => {
  const router = useRouter();

  const [groupedNews, setGroupedNews] = useState<GroupedNews[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Year");
  const [selectedMonth, setSelectedMonth] = useState("All Month");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsMedia();
  }, []);

  const fetchNewsMedia = async () => {
    try {
      setLoading(true);
      const groupedData = await newsMediaService.getAllGroupedByTitle();

      const normalized: GroupedNews[] = Object.entries(groupedData)
        .map(([title, items]) => {
          const typedItems = items as NewsMedia[];
          const allImages = typedItems.flatMap((item) => item.images || []);
          const latestItem = typedItems.reduce((latest, current) =>
            new Date(current.created_at) > new Date(latest.created_at) ? current : latest
          );

          return {
            title,
            firstImage: allImages[0] || "/images/news.png",
            imageCount: allImages.length,
            latestDate: latestItem.event_date || latestItem.created_at,
          };
        })
        .sort(
          (a, b) =>
            new Date(b.latestDate).getTime() -
            new Date(a.latestDate).getTime()
        );

      setGroupedNews(normalized);
    } catch (error) {
      console.error("Error fetching news media:", error);
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

  const years = Array.from(
    new Set(
      groupedNews
        .map((item) => new Date(item.latestDate))
        .filter((date) => !Number.isNaN(date.getTime()))
        .map((date) => date.getFullYear())
    )
  ).sort((a, b) => b - a);

  const filteredNews = groupedNews.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const itemDate = new Date(item.latestDate);
    const hasValidDate = !Number.isNaN(itemDate.getTime());

    const matchesYear =
      selectedYear === "All Year" ||
      (hasValidDate && itemDate.getFullYear().toString() === selectedYear);

    const matchesMonth =
      selectedMonth === "All Month" ||
      (hasValidDate && itemDate.toLocaleString("en-US", { month: "long" }) === selectedMonth);

    return matchesSearch && matchesYear && matchesMonth;
  });

  return (
    <>
      <Banner
        backgroundImage="/images/Section.png"
        pageTitle="News & Media Coverage"
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F6F6FF] px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px]">
        <Links />
        <SubTitle subTitle="Stories In Focus" textAlign="left" />
        <Title title="" textAlign="left" />

        <p className="text-[#525252] text-[16px] md:text-[20px] my-4">
          Catch highlights of AISSPUR in news and media coverage.
        </p>

        <div className="bg-[#EEF0FF] rounded-2xl px-6 py-5 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-[#8B8BB5] font-medium">
              Total Results: <span className="font-semibold text-[#5A5A89]">{filteredNews.length}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full sm:w-[200px] bg-white px-5 py-3 rounded-full focus:outline-none"
              >
                <option value="All Year">All Year</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-[200px] bg-white px-5 py-3 rounded-full focus:outline-none"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

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

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading coverage...</p>
        ) : filteredNews.length === 0 ? (
          <div className="bg-white border border-[#E4E6F5] rounded-2xl py-16 text-center">
            <p className="text-[#5A5A89] text-lg font-medium">No news or media found for selected filters.</p>
            <p className="text-[#8B8BB5] text-sm mt-1">Try a different year, month, or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNews.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                onClick={() => router.push(`/media-coverage/news/${encodeURIComponent(item.title)}`)}
                className="group cursor-pointer rounded-lg bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-[220px]">
                  <Image
                    src={item.firstImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded-md">
                    {item.imageCount} Photos
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-[18px] font-semibold text-gray-800 mb-3">{item.title}</h3>

                  <div className="flex items-center justify-between">
                    <span className="bg-[#EEF0FF] text-[#4F46E5] text-sm px-3 py-1 rounded-full">
                      {formatDate(item.latestDate)}
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

export default MediaGalleryPage;
