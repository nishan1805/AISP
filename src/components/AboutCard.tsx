import Image from 'next/image';
import React from 'react';
import Tag from './Tag';
import Link from 'next/link';

interface AboutCardProps {
    imageSrc: string;
    subtitle: string;
    title: string;
    paragraphs: string[];
}

const AboutCard: React.FC<AboutCardProps> = ({ imageSrc, subtitle, title, paragraphs }) => {
    return (
        <section className="max-sm:px-[16px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[24px] md:py-[50px]">
            <div className="flex flex-col lg:flex-row lg:gap-[120px] md:gap-[50px] max-sm:gap-[20px]">
                <div className="w-full lg:w-1/2 ">
                    <Image
                     src={imageSrc} 
                     alt={title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                </div>
                <div className="w-full lg:w-1/2  max-h-[max-content] pt-[32px] sm:pt-[64px] md:pt-0">
                    <Tag label={subtitle} textColor='text-[#393A85]' backgroundColor='bg-[#EEF]' />
                    <h2 className="text-[#111] max-sm:text-[20px] sm:text-[32px] font-[500] my-4">{title}</h2>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-[#2E2E2E] mb-3 text-justify leading-8 max-md:text-[16px] md:text-[18px]">{paragraph}</p>
                    ))}
                    <Link href="/welcome-to-ais">
                        <span className="text-blue-600 font-medium mt-2 inline-block hover:underline">
                            Read More →
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutCard;

