import Image from 'next/image';
import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { HiOutlinePhone } from 'react-icons/hi';
import { MdOutlineEmail } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { showSideBar } from '@/redux/slices/sidebarSlice';
import Link from 'next/link';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <header className="bg-white text-black py-[15px] max-sm:p-[10px] sm:px-[40px] flex justify-between items-center w-full h-18 shadow-md">
      {/* Left: Logo & Name */}
      <div className="flex space-x-4 max-lg:w-full">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="w-[50] h-[50] max-sm:w-[30px] max-sm:h-[30px]"
          />
        </Link>
        <div>
          <Link href="/">
            <h1 className="max-sm:text-[12px] max-sm:text-bold lg:text-lg xl:text-2xl font-[700] text-[#393A85]">
              ACHIEVERS INTERNATIONAL SCHOOL
            </h1>
          </Link>
          <p className="text-xs text-gray-600">
            Near Indian Oil Petrol Pump, Pratappur (C.G.)
          </p>
        </div>
        <div className="block lg:hidden ml-auto">
          <FaBars
            className="text-[#3F4092] max-sm:text-[18px] text-[25px] cursor-pointer"
            onClick={() => dispatch(showSideBar())}
          />
        </div>
      </div>
      {/* Right: Social Links & Contact */}
      <div className="hidden lg:flex items-center space-x-6">
        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex items-center gap-1">
            <HiOutlinePhone className="xl:text-xl lg:text-md text-[#3F4092]" />
            <span className="text-[#2D2D68] xl:text-[14px] lg:text-[12px] font-[500]">
              7999671694 | 9098418685
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineEmail className="xl:text-xl lg:text-md text-[#3F4092]" />
            <a
              href="mailto:achieversinternationalppur@gmail.com"
              className="text-[#2D2D68] xl:text-[14px] lg:text-[12px] font-[500]"
            >
              achieversinternationalppur@gmail.com
            </a>
          </div>
        </div>
        <div className="flex space-x-3 xl:text-xl lg:md">
          <Link
            href="https://www.facebook.com/achieversinternationalppur/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2D2D68] bg-[#ECECF4] lg:w-8 lg:h-8  xl:w-10 xl:h-10 flex items-center justify-center rounded-[50%] cursor-pointer"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://www.instagram.com/achievers.international.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2D2D68] bg-[#ECECF4] lg:w-8 lg:h-8  xl:w-10 xl:h-10 flex items-center justify-center rounded-[50%] cursor-pointer"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.youtube.com/@Achievers_International_School"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2D2D68] bg-[#ECECF4] lg:w-8 lg:h-8  xl:w-10 xl:h-10 flex items-center justify-center rounded-[50%] cursor-pointer"
          >
            <FaYoutube />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
