"use client";

import React from 'react';
import Image from 'next/image';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface ImageModalProps {
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    images,
    currentIndex,
    onClose,
    onNext,
    onPrevious
}) => {
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowLeft') {
            onPrevious();
        } else if (e.key === 'ArrowRight') {
            onNext();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black bg-opacity-50"
            >
                <IoClose size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            {images.length > 1 && currentIndex > 0 && (
                <button
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full bg-black bg-opacity-50"
                >
                    <IoChevronBack size={24} />
                </button>
            )}

            {/* Next Button */}
            {images.length > 1 && currentIndex < images.length - 1 && (
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full bg-black bg-opacity-50"
                >
                    <IoChevronForward size={24} />
                </button>
            )}

            {/* Main Image */}
            <div className="relative max-w-5xl max-h-[90vh] mx-4">
                <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[90vh] object-contain"
                    priority
                />
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-96 overflow-x-auto px-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (index < currentIndex) {
                                    for (let i = currentIndex; i > index; i--) {
                                        onPrevious();
                                    }
                                } else if (index > currentIndex) {
                                    for (let i = currentIndex; i < index; i++) {
                                        onNext();
                                    }
                                }
                            }}
                            className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${index === currentIndex
                                ? 'border-white'
                                : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageModal;