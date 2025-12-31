"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { photoGalleryService } from "@/services/photoGalleryService";
import { PhotoGallery } from "@/types/supabase";

const GalleryDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId as string;
  const [gallery, setGallery] = useState<PhotoGallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [eventId]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await photoGalleryService.getById(eventId);
      setGallery(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6FF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E2879]"></div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6FF]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Gallery not found.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-[#6366f1] font-medium hover:underline"
          >
            &lt; Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6FF]">
      {/* Banner/Header can be added here if needed */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => router.back()} className="text-[#6366f1] font-medium">&lt; Go back</button>
          <h2 className="text-xl font-bold text-gray-900">{gallery.title}</h2>
          <span className="text-gray-500">{formatDate(gallery.event_date)}</span>
        </div>
        {gallery.description && (
          <p className="text-gray-600 mb-4">{gallery.description}</p>
        )}
        <div className="mb-4 text-gray-700 font-medium">Total Photos: {gallery.images.length}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {gallery.images.map((src, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer" onClick={() => setPreviewIndex(idx)}>
              <img src={src} alt={gallery.title} className="w-full h-40 object-cover" />
            </div>
          ))}
        </div>
      </div>
      {/* Photo Preview Modal (pseudo-code) */}
      {/* {previewIndex !== null && (
        <PhotoPreviewModal
          photos={gallery.images}
          currentIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )} */}
    </div>
  );
};

export default GalleryDetailsPage;
