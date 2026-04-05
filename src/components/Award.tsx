


import React from "react";
import AwardCard from "./AwardCard";

const data = [
    {
        "image": "/images/1st aw.png",
        "description": "Pioneering Excellence in Education"
    },
    {
        "image": "/images/2nd aw.png",
        "description": "Recognized for Outstanding Growth & Innovation"
    },
    {
        "image": "/images/3rd aw.png",
        "description": "Transforming Learning with Cutting-Edge Technology"
    }
];

const Award: React.FC = () => {
    return (
        <section
            className="relative bg-[#1A1B3D] h-auto lg:h-[550px] flex flex-col justify-end items-center px-6 sm:px-12 lg:px-24 py-[24px] md:py-[64px]"
            style={{
                background: "linear-gradient(0deg, rgba(26, 27, 61, 0.60) 0%, rgba(26, 27, 61, 0.60) 100%), url('/images/award_section.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            {/* Title */}
            <div className="text-center mb-6">
                <h1
                    className=" max-sm:text-[20px] sm:text-[32px] font-[500] relative mb-2 inline-block"
                    style={{
                        background: "linear-gradient(90deg, #FFF 0%, #E1BB1C 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    Awards & Achievements
                    <div className="w-full h-[2px] flex justify-center mt-2 absolute relative"
                        style={{
                            background: "linear-gradient(90deg, #FFF 0%, #E1BB1C 100%)",
                        }}
                    >
                        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#fff] rounded-full"></span>
                        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#E1BB1C] rounded-full"></span>
                    </div>
                </h1>
            </div>

            {/* Awards Section at the End */}
            <div className="w-full flex-grow flex flex-col justify-end items-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6  w-full max-w-6xl justify-items-center">
                    {data.map((item, index) => (
                        <AwardCard key={index} image={item.image} description={item.description} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Award;
