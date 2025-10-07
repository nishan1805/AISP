import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { LuClock5 } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import Script from 'next/script';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div
        className="w-full flex flex-col items-center bg-cover bg-center px-6 sm:px-10 max-sm:px-[16px] py-[32px] lg:px-[100px]"
        style={{
          backgroundImage:
            "linear-gradient(to top,rgba(35, 35, 80, 0.67), rgba(35, 35, 80, 0.67)), url(/images/footer.png)",
        }}
      >
        {/* Logo and School Name */}
        {/* <div className="flex flex-col items-center text-center">
          <Image
            src="/images/school Logo 1.png"
            alt="Achievers International School"
            width={200}
            height={200}
            className="w-20 h-20 mb-2"
          />
          <h2 className="text-xl font-bold">ACHIEVERS INTERNATIONAL SCHOOL</h2>
          <p className="text-gray-300">Pratappur (C.G.)</p>
        </div> */}

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 w-full justify-between max-w-[1440px] mx-auto">

          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/school Logo 1.png"
              alt="Achievers International School"
              width={200}
              height={200}
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-xl font-bold">ACHIEVERS INTERNATIONAL SCHOOL</h2>
            <p className="text-gray-300 mt-2">Pratappur, Chhattisgarh</p>
          </div>
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Achievers International School is a premier CBSE institution
              dedicated to fostering academic excellence and holistic growth.
              As the first AI-integrated classrooms in the region and ranked
              No.1, we provide an innovative & dynamic learning environment
              where students thrive academically, socially, & personally.
            </p>
            <div className="flex space-x-4 mx-auto my-4">
              <a
                href="https://www.facebook.com/achieversinternationalppur/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/achievers_international_school/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@Achievers_International_School"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="flex items-center space-x-2">
              <HiOutlinePhone />
              <p className="text-gray-300 text-sm">
                7999671694 | 9098418685
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <MdOutlineEmail />
              <p className="text-gray-300 text-sm">
                achieversinternationalpur@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <LuClock5 />
              <p className="text-gray-300 text-sm">
                Mon - Sat | 09:00 AM - 03:00 PM
              </p>
            </div>
            <div className="flex  space-x-2 mt-4">
              <FaLocationDot className="lg:text-2xl text-xl" />
              <p className="text-gray-300 text-sm">
                Near Indian Oil Petrol Pump, Ambikapur Road, Pratappur, Surajpur, Chhattisgarh - 497223
              </p>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-x-4">
              <Link
                target="_blank"
                href="https://www.cbse.gov.in/"
                className="text-gray-300 text-sm"
              >
                CBSE Official Website
              </Link>
              <Link
                target="_blank"
                href="https://results.cbse.nic.in/"
                className="text-gray-300 text-sm mt-4"
              >
                CBSE Results Portal
              </Link>
              <Link
                target="_blank"
                href="https://ncert.nic.in/"
                className="text-gray-300 text-sm mt-4"
              >
                NCERT Official Website
              </Link>
              <Link
                target="_blank"
                href="https://rte.cg.nic.in/"
                className="text-gray-300 text-sm mt-4"
              >
                RTE Chhattisgarh Portal
              </Link>
              {/* Visitor Counter Scripts */}
              <Script
                strategy="afterInteractive"
                src="https://www.freevisitorcounters.com/auth.php?id=f3551327eb5c02b93d5bba87a9c30c325e6985d6"
              />
              <Script
                strategy="afterInteractive"
                src="https://www.freevisitorcounters.com/en/home/counter/1335321/t/2"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="md:flex md:justify-between border-t-2 border-[#6566A8]  w-full max-w-[1440px] mt-6 pt-4 text-center text-white text-sm">
          <p>
            Copyright © 2025 Achievers International School. All rights
            reserved.
          </p>
          <p className="mt-1">Powered By Achievers International School</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
