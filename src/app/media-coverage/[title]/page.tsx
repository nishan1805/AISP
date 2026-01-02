"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Banner from '@/components/Banner';
import Links from '@/components/Links';
import ImageModal from '@/components/ImageModal';
import { Breadcrumb } from '@/interfaces';
import { newsMediaService } from '@/services/newsMediaService';
import { NewsMedia } from '@/types/supabase';
import Image from 'next/image';
import { IoChevronBack } from 'react-icons/io5';

const MediaDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const title = decodeURIComponent(params.title as string);
    console.log('Media title from params:', title);

    const [newsItems, setNewsItems] = useState<NewsMedia[]>([]);
    const [allImages, setAllImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const breadcrumbs: Breadcrumb[] = [
        { label: 'Home', url: '/' },
        { label: 'Media Coverage', url: '/media-coverage' },
        { label: title, url: '' },
    ];

    useEffect(() => {
        fetchMediaDetails();
    }, [title]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchMediaDetails = async () => {
        try {
            setLoading(true);
            const allGrouped = await newsMediaService.getAllGroupedByTitle();
            console.log('Fetched grouped media data:', allGrouped);

            const mediaData = allGrouped[title] || [];
            setNewsItems(mediaData);

            // Flatten all images from all news items with the same title
            const images = mediaData.flatMap(item => item.images);
            setAllImages(images);
        } catch (error) {
            console.error('Error fetching media details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev < allImages.length - 1 ? prev + 1 : prev
        );
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prev) =>
            prev > 0 ? prev - 1 : prev
        );
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getLatestDate = () => {
        if (newsItems.length === 0) return '';
        const latestNews = newsItems.reduce((latest, current) =>
            new Date(current.created_at) > new Date(latest.created_at) ? current : latest
        );
        return formatDate(latestNews.event_date || latestNews.created_at);
    };

    const renderHeroSection = () => (
        <Banner
            backgroundImage="/images/Section.png"
            pageTitle={title}
            breadcrumbs={breadcrumbs}
        />
    );

    if (loading) {
        return (
            <>
                {renderHeroSection()}
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Loading media coverage...</p>
                    </div>
                </div>
            </>
        );
    }

    if (newsItems.length === 0) {
        return (
            <>
                {renderHeroSection()}
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">Media coverage not found.</p>
                        <button
                            onClick={() => router.push('/media-coverage')}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Back to Media Coverage
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {renderHeroSection()}
            <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
                <Links />

                {/* Back Button */}
                <button
                    onClick={() => router.push('/media-coverage')}
                    className="flex items-center cursor-pointer gap-2 text-[#6366f1] hover:text-[#5855eb] mb-6 transition-colors"
                >
                    <IoChevronBack size={20} />
                    Go back
                </button>

                {/* Media Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <span>{getLatestDate()}</span>
                        <span>•</span>
                        <span>Total Photos: {allImages.length}</span>
                    </div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allImages.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => handleImageClick(index)}
                            className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                            <Image
                                src={image}
                                alt={`${title} - Image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description section */}
                {newsItems[0]?.description && (
                    <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">About this Event</h2>
                        <div
                            className="text-gray-600 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: newsItems[0].description }}
                        />
                    </div>
                )}

                {/* Source Information */}
                {newsItems[0]?.source && (
                    <div className="mt-4 bg-blue-50 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-900 mb-1">Source</h3>
                        <p className="text-blue-700">{newsItems[0].source}</p>
                    </div>
                )}
            </section>

            {/* Image Modal */}
            <ImageModal
                isOpen={isModalOpen}
                images={allImages}
                currentIndex={currentImageIndex}
                onClose={() => setIsModalOpen(false)}
                onNext={handleNextImage}
                onPrevious={handlePreviousImage}
            />
        </>
    );
};

export default MediaDetailsPage;