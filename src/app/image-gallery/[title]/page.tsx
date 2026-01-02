"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";

import Banner from "@/components/Banner";
import Links from "@/components/Links";
import ImageModal from "@/components/ImageModal";
import { photoGalleryService } from "@/services/photoGalleryService";
import { Breadcrumb } from "@/interfaces";
import { PhotoGallery } from "@/types/supabase";

const GalleryDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const title = decodeURIComponent(params.title as string);

    const [galleries, setGalleries] = useState<PhotoGallery[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const breadcrumbs: Breadcrumb[] = [
        { label: "Home", url: "/" },
        { label: "Media Gallery", url: "/image-gallery" },
        { label: title, url: "" },
    ];

    useEffect(() => {
        fetchGallery();
    }, [title]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const grouped = await photoGalleryService.getAllGroupedByTitle();
            const data = grouped[title] || [];
            setGalleries(data);

            const allImgs = data.flatMap((g: PhotoGallery) => g.images);
            setImages(allImgs);
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
        galleries.length > 0
            ? formatDate(galleries[galleries.length - 1].event_date || galleries[galleries.length - 1].created_at)
            : "";

    if (loading) {
        return (
            <>
                <Banner backgroundImage="/images/Section.png" pageTitle={title} breadcrumbs={breadcrumbs} />
                <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
                    Loading gallery...
                </div>
            </>
        );
    }

    return (
        <>
            {/* HERO */}
            <Banner
                backgroundImage="/images/Section.png"
                pageTitle="Media Gallery"
                breadcrumbs={breadcrumbs}
            />

            {/* CONTENT */}
            <section className="bg-[#F6F6FF] px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[40px]">
                <Links />

                {/* BACK */}
                <button
                    onClick={() => router.push("/image-gallery")}
                    className="flex cursor-pointer items-center gap-2 text-[#6366F1] font-medium mb-6"
                >
                    <IoChevronBack size={20} />
                    Go back
                </button>

                {/* HEADER BAR */}
                <div className="bg-[#EEF0FF] rounded-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <p className="text-sm text-gray-600">
                        Total Photos: <span className="font-semibold">{images.length}</span>
                    </p>

                    <div className="text-center">
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                            {title}
                        </h1>
                    </div>

                    <p className="text-sm text-gray-600">{latestDate}</p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img, index) => (
                        <div
                            key={index}
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
            </section>

            {/* MODAL */}
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

export default GalleryDetailsPage;
