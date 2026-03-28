"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { newsMediaService } from "@/services/newsMediaService";
import { NewsMedia } from "@/types/supabase";
import Image from "next/image";

const months = ["All Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface GroupedNews {
  title: string;
  image: string;
  latestDate: string;
  description?: string;
}

const MediaGalleryPage = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(months[0]);
  const [search, setSearch] = useState("");
  const [newsItems, setNewsItems] = useState<GroupedNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const groupedData = await newsMediaService.getAllGroupedByTitle();

      const normalized: GroupedNews[] = Object.entries(groupedData).map(([title, items]) => {
        const typedItems = items as NewsMedia[];
        const allImages = typedItems.flatMap((item) => item.images || []);
        const latestItem = typedItems.reduce((latest, current) =>
          new Date(current.created_at) > new Date(latest.created_at) ? current : latest
        );

        return {
          title,
          image: allImages[0] || "/images/news.png",
          latestDate: latestItem.event_date || latestItem.created_at,
          description: latestItem.description || "",
        };
      });

      normalized.sort((a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime());
      setNewsItems(normalized);
    } catch (error) {
      console.error('Error fetching news media:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter news based on search, year, and month
  const filteredNews = newsItems.filter((item) => {
    const matchesSearch = search === "" || 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    const itemYear = item.latestDate ? new Date(item.latestDate).getFullYear() : null;
    const matchesYear = !itemYear || itemYear === year;

    const itemMonth = item.latestDate ? new Date(item.latestDate).toLocaleString('en-US', { month: 'long' }) : null;
    const matchesMonth = month === "All Month" || !itemMonth || itemMonth === month;

    return matchesSearch && matchesYear && matchesMonth;
  });

  return (
    <div className="min-h-screen bg-[#F6F6FF]">
      {/* Banner/Header */}
      <div className="bg-cover bg-center h-56 flex items-center justify-center" style={{ backgroundImage: 'url(/images/Section.png)' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Media Gallery</h1>
          <div className="text-white text-sm">Home / Admission / Media Gallery</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters/Search */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="font-medium text-gray-700">Total Results: {filteredNews.length}</div>
          <select value={year} onChange={e => setYear(Number(e.target.value))} className="px-4 py-2 rounded border">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={month} onChange={e => setMonth(e.target.value)} className="px-4 py-2 rounded border">
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search event"
            className="px-4 py-2 rounded border flex-1 min-w-[200px]"
          />
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E2879]"></div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No news/media found
            </div>
          ) : (
            filteredNews.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer border border-[#ECECF4] transition-all"
                onClick={() => router.push(`/media-coverage/news/${encodeURIComponent(item.title)}`)}
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={192}
                    className="h-48 w-full rounded-t-2xl object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="font-semibold text-gray-900 mb-3 text-xl">{item.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#ECECF4] text-[#3F4092] px-4 py-1 rounded-full text-base font-semibold">
                      {formatDate(item.latestDate)}
                    </span>
                    <span className="text-base text-[#3F4092] font-semibold cursor-pointer flex items-center gap-1">
                      View all 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Map section can be added here if needed */}
    </div>
  );
};

export default MediaGalleryPage;
