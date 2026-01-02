'use client';
import { hideLatestUpdatesModal } from '@/redux/slices/sidebarSlice';
import { RootState } from '@/redux/store';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { latestUpdatesService } from '@/services/latestUpdatesService';
import { LatestUpdate } from '@/types/supabase';

const LatestUpdatesModal = () => {
    const dispatch = useDispatch();
    const { isLatestUpdatesModalOpen } = useSelector((state: RootState) => state.sidebarSlice);
    const [animateIn, setAnimateIn] = useState(false);
    const [updates, setUpdates] = useState<LatestUpdate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLatestUpdatesModalOpen) {
            setTimeout(() => setAnimateIn(true), 50);
            fetchUpdates();
        }
    }, [isLatestUpdatesModalOpen]);

    const fetchUpdates = async () => {
        try {
            setLoading(true);
            const data = await latestUpdatesService.getAll();
            console.log('Fetched latest updates:', data);
            setUpdates(data);
        } catch (error) {
            console.error('Error fetching latest updates:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const isNew = (dateString: string) => {
        const updateDate = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - updateDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7; // Show "NEW" badge for updates within 7 days
    };

    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex justify-end rounded-lg shadow-lg overflow-hidden max-w-[400px]">
            <div
                className={`bg-white h-[450px] w-full max-w-full shadow-lg transform transition-transform duration-300 ease-in-out ${animateIn ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="bg-[#2E2879] text-white px-5 py-3 flex justify-between items-center">
                    <h2 className="text-lg font-semibold tracking-wider">LATEST UPDATES</h2>
                    <button
                        onClick={() => dispatch(hideLatestUpdatesModal())}
                        className="text-white text-xl font-bold"
                    >
                        <FaTimes className="text-[#fff] text-2xl cursor-pointer" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-4 py-6 max-h-[calc(450px-64px)] overflow-y-auto space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2E2879]"></div>
                        </div>
                    ) : updates.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            No updates available
                        </div>
                    ) : (
                        updates.map((update) => (
                            <div key={update.id} className="flex justify-between border-b pb-2">
                                <div className="w-[80%]">
                                    <p className="text-sm font-medium text-gray-800">{update.title}</p>
                                    {update.description && (
                                        <p className="text-xs text-gray-600 mt-1">{update.description}</p>
                                    )}
                                    <div className="text-xs text-gray-500 mt-1">
                                        {formatDate(update.created_at)}
                                        {update.file_url && (
                                            <>
                                                <span className="mx-1">|</span>
                                                <a
                                                    href={update.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 font-semibold hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {isNew(update.created_at) && (
                                    <div>
                                        <div className="flex justify-center items-center w-10 h-5 text-[10px] bg-orange-500 text-white font-bold rounded-sm">
                                            NEW
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
};

export default LatestUpdatesModal;
