"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { photoGalleryService } from "@/services/photoGalleryService";
import { PhotoGallery } from "@/types/supabase";

const years = [2025, 2024, 2023, 2022, 2021];
const months = ["All Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const MediaGalleryPage = () => {
  const router = useRouter();
  const [year, setYear] = useState(years[0]);
  const [month, setMonth] = useState(months[0]);
  const [search, setSearch] = useState("");
  const [galleries, setGalleries] = useState<PhotoGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const data = await photoGalleryService.getAll();
      setGalleries(data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
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

  // Filter galleries based on search, year, and month
  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = search === "" || 
      gallery.title.toLowerCase().includes(search.toLowerCase()) ||
      gallery.description?.toLowerCase().includes(search.toLowerCase());

    const galleryYear = gallery.event_date ? new Date(gallery.event_date).getFullYear() : null;
    const matchesYear = !galleryYear || galleryYear === year;

    const galleryMonth = gallery.event_date ? new Date(gallery.event_date).toLocaleString('en-US', { month: 'long' }) : null;
    const matchesMonth = month === "All Month" || !galleryMonth || galleryMonth === month;

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
          <div className="font-medium text-gray-700">Total Results: {filteredGalleries.length}</div>
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
          ) : filteredGalleries.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No galleries found
            </div>
          ) : (
            filteredGalleries.map((gallery) => (
              <div
                key={gallery.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer border border-[#ECECF4] transition-all"
                onClick={() => router.push(`/media-coverage/${gallery.gallery_id || gallery.id}`)}
              >
                <div className="relative">
                  <img 
                    src={gallery.images[0] || '/images/gallery-placeholder.jpg'} 
                    alt={gallery.title} 
                    className="w-full h-48 object-cover rounded-t-2xl" 
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg font-semibold">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                      <rect x="7" y="7" width="10" height="10" rx="1" strokeWidth="2" stroke="currentColor" fill="none"/>
                    </svg>
                    {gallery.images.length}
                  </div>
                </div>
                <div className="p-6">
                  <div className="font-semibold text-gray-900 mb-3 text-xl">{gallery.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#ECECF4] text-[#3F4092] px-4 py-1 rounded-full text-base font-semibold">
                      {formatDate(gallery.event_date)}
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