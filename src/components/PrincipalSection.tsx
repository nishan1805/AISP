import React from 'react';
import CustomizeSlider from './CustomizeSlider';
import { MdOutlineArrowOutward } from "react-icons/md";
import news from '@/data/news';
import Image from 'next/image';
import Link from 'next/link';

const PrincipalSection: React.FC = () => {
    const principalMessage = `It is with great pleasure and honor that I welcome you to Achievers International School, where our commitment to excellence and holistic development sets the foundation for our students' success. As the Principal, I am privileged to lead a community...`;
    const maxLength = 150; // Set max content length before "Read More" appears
    const showReadMore = principalMessage.length > maxLength;

    return (
        <section className="px-6 sm:px-12 max-sm:px-[16px] lg:px-24 py-12"
        style={{
            background: "linear-gradient(0deg, rgba(26, 27, 61, 0.60) 0%, rgba(26, 27, 61, 0.60) 100%), url('/images/PricipalBG.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
        >
            <div className="flex flex-col lg:flex-row items-start lg:gap-[96px] ">
                {/* Left Section - Principal Message */}
                <div className="w-full lg:w-1/2">
                    <h2 className="max-sm:text-[20px] sm:text-[32px] font-[500] text-[#fff] mb-8">Principal’s Message</h2>
                    <div className=' bg-[#fff] rounded-lg shadow-sm '>
                    <div className="relative w-full h-[350px] rounded-t-lg overflow-hidden shadow-lg">
                        {/* Principal Image */}
                        <Image
                            src={'/images/principal.png'}
                            layout="fill"
                            objectFit="cover"
                            alt="Principal"
                        />
                        {/* Overlay for Name & Designation */}
                        <div className="absolute bottom-0 left-0 w-[max-content] bg-[#3F4092] text-white p-4 rounded-tr-lg">
                            <p className="text-lg font-semibold">Mr. Ashok Tiwari</p>
                            <p className="max-sm:text-xs text-sm">Principal, Achievers International School, Pratappur</p>
                        </div>
                    </div>

                    {/* Principal Message */}
                    <div className="mt-4 p-4">
                        <p className="text-gray-700 leading-6">
                            {showReadMore ? `${principalMessage.substring(0, maxLength)}...` : principalMessage}
                        </p>

                        {showReadMore && (
                            <Link href="/principals-note">
                                <span className="text-blue-600 font-medium mt-2 inline-block hover:underline">
                                    Read More →
                                </span>
                            </Link>
                        )}
                    </div>

                    </div>
                </div>

                {/* Right Section - News & Events Slider */}
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                    <CustomizeSlider
                        data={news}
                        header={"Media Coverage"}
                        source="news"
                        slidesToShow={1}
                        isNavigationShow={true}
                        isViewAllBtnShow={false}
                        viewAllPageLink={"/"}
                    />
                    {/* View More Link */}
                    <div className="mt-4">
                        <a
                            href={"/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center w-30 gap-1 text-[#fff] text-sm hover:underline p-2 rounded-sm bg-[#7A7A7A]"
                        >
                            View More
                            <MdOutlineArrowOutward />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrincipalSection;
