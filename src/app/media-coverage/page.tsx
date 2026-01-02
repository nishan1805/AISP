"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Banner from '@/components/Banner';
import Links from '@/components/Links';
import SubTitle from '@/components/SubTitle';
import Title from '@/components/Title';
import GalleryCard from '@/components/GalleryCard';
import { Breadcrumb } from '@/interfaces';
import { newsMediaService } from '@/services/newsMediaService';
import { NewsMedia } from '@/types/supabase';

const breadcrumbs: Breadcrumb[] = [
  { label: 'Home', url: '/' },
  { label: 'Media Coverage', url: '/media-coverage' },
];

interface GroupedMedia {
  title: string;
  firstImage: string;
  imageCount: number;
  latestDate: string;
}

/* ------------------ Page ------------------ */
const MediaCoveragePage = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i); // Current year + 5 past years

  const [groupedMedia, setGroupedMedia] = useState<GroupedMedia[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState("All Month");
  const [loading, setLoading] = useState(true);

  /* ------------------ Fetch Data ------------------ */
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const grouped = await newsMediaService.getAllGroupedByTitle();

      const mediaGroups: GroupedMedia[] = Object.entries(grouped)
        .map(([title, newsItems]: [string, NewsMedia[]]) => {
          const allImages = newsItems.flatMap((item) => item.images);
          const latestNews = newsItems.reduce((a, b) =>
            new Date(b.created_at) > new Date(a.created_at) ? b : a
          );

          return {
            title,
            firstImage: allImages[0] || '/images/placeholder.jpg',
            imageCount: allImages.length,
            latestDate: latestNews.event_date || latestNews.created_at,
          };
        })
        .sort(
          (a, b) =>
            new Date(b.latestDate).getTime() -
            new Date(a.latestDate).getTime()
        );

      setGroupedMedia(mediaGroups);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ Handlers ------------------ */
  const handleCardClick = (title: string) => {
    const encodedTitle = encodeURIComponent(title);
    router.push(`/media-coverage/${encodedTitle}`);
  };

  /* ------------------ Computed ------------------ */
  // Filter media based on search query
  const filteredMedia = groupedMedia.filter((media) =>
    media.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ------------------ Render ------------------ */
  const renderHeroSection = () => (
    <Banner
      backgroundImage="/images/Section.png"
      pageTitle="Media Coverage"
      breadcrumbs={breadcrumbs}
    />
  );

  return (
    <>
      {renderHeroSection()}

      <section className="bg-[#F6F6FF] px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px]">
        <Links />
        <SubTitle subTitle="In the News!" textAlign="left" />
        <Title title="" textAlign="left" />

        <p className="text-[#525252] text-[16px] md:text-[20px] my-4">
          Explore our media coverage and news articles featuring AISSPUR events and achievements.
        </p>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-[#EEF0FF] rounded-2xl px-6 py-5 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <p className="text-[#8B8BB5] font-medium">
              Total Results:{" "}
              <span className="font-semibold text-[#5A5A89]">
                {filteredMedia.length}
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
                <option value="All Month">All Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>

              {/* Search */}
              <input
                type="text"
                placeholder="Search event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[300px] bg-white px-5 py-3 rounded-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* ================= MEDIA GRID ================= */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading media coverage...</p>
            </div>
          ) : filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedia.map((media, index) => (
                <div key={index} onClick={() => handleCardClick(media.title)}>
                  <GalleryCard
                    image={media.firstImage}
                    title={media.title}
                    date={media.latestDate}
                    imageCount={media.imageCount}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No media coverage found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MediaCoveragePage;