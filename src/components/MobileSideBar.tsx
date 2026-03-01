import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import navLinks from '@/data/navLinks';
import { useDispatch, useSelector } from 'react-redux';
import { hideSideBar } from '@/redux/slices/sidebarSlice';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { LinkItem, MenuItem } from '@/interfaces';
import { MdKeyboardArrowDown } from "react-icons/md";
import { SideBarLinkItems } from '@/constant/links.constant';
const MobileSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isShow } = useSelector((state: RootState) => state.sidebarSlice);
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(true);

  const handleClick = (item: LinkItem) => {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  useEffect(() => {
    if (pathname != '/') {
      setIsHomePage(false);
    } else {
      setIsHomePage(true);
    }
  }, [pathname]);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#3F4092] w-[90%] transform ${isShow ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50 shadow-lg rounded-tl-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Header Icons */}
          <div className="bg-[#fff] p-5 flex flex-col justify-between">
            <div
              className={`flex justify-between items-center ${isHomePage ? '' : 'border-b-2 border-b-[#CAC9FF] py-[15px]'}`}
            >
              <div className="flex space-x-3">
                {[{icon : FaFacebookF , href : "https://www.facebook.com/achieversinternationalppur/"},{icon :  FaInstagram , href : "https://www.instagram.com/achievers_international_school/"}, {icon : FaYoutube , href : "https://www.youtube.com/@Achievers_International_School"}].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2D2D68] bg-[#ECECF4] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <item.icon />
                  </Link>
                ))}
              </div>
              <FaTimes
                className="text-[#2D2D68] text-2xl cursor-pointer"
                onClick={() => dispatch(hideSideBar())}
              />
            </div>
            {/* Extra Information */}
            {!isHomePage && (
              <div className="flex gap-2 text-white text-sm py-2">
                {SideBarLinkItems.slice(0, 2).map((item: LinkItem, index: number) => (
                  <div
                    key={index}
                    className="flex justify-center items-center border-2 gap-2 border-[#CAC9FF] bg-[#EEF] text-[#3B39B5] rounded-lg p-2 w-50 cursor-pointer"
                    onClick={() => handleClick(item)}
                  >
                    <div
                    className='w-6 h-6'
                    >
                    <Image
                      src={item.img}
                      width={30}
                      height={30}
                      alt={item.text}
                      className=''
                    />
                    </div>
                    <p className="text-[10px] font-[700]">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Navigation Links */}
          <ul className="flex flex-col text-white p-5">
            {navLinks.map((item, index) => {
                const isActive = (
                  (item.link && pathname === item.link) ||
                  pathname?.includes(item?.label?.toLocaleLowerCase()) ||
                  (item.submenu && item.submenu.some((subItem: MenuItem) => pathname === subItem.link))
                );
              return (
                <li key={index} className="border-b border-white/30">
                  {item.submenu ? (
                    <button
                      className="w-full flex justify-between items-center py-3 px-2 text-left focus:outline-none text-[14px]"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <div className='flex items-center justify-center w-8 h-8 rounded-full gap-2 bg-[#fff] text-[#3F4092] font-bold'>
                      <MdKeyboardArrowDown
                        className={`transform transition-transform duration-300 text-[20px] text-bold ${openDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                      </div>
                    </button>
                  ) : (
                    <>
                    {
                      item?.label == "FEE PAYMENT" ?
                      (
                      <Link
                        href={item.link || '#'}
                        className={`relative block py-3 px-2 text-[14px] ${
                          isActive ? 'font-semibold' : ''
                        }`}
                        target='_blank'
                        onClick={() => dispatch(hideSideBar())}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                        )}
                      </Link>
                      )
                      :
                      (
                      <Link
                        href={item.link || '#'}
                        className={`relative block py-3 px-2 text-[14px] ${
                          isActive ? 'font-semibold' : ''
                        }`}
                        onClick={() => dispatch(hideSideBar())}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                        )}
                      </Link>
                      )
                    }
                    </>
              
                  )}

                  {/* Submenu with smooth animation */}
                  <ul
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === item.label
                        ? 'max-h-48 opacity-100'
                        : 'max-h-0 opacity-0'
                      }  text-[#fff]`}
                  >
                    {item.submenu?.map((subItem, subIndex) => {
                      const isSubActive = subItem.link && pathname === subItem.link;
                      const isExternalSubItem = subItem.link?.startsWith('http');
                      return (
                      <li
                      key={subIndex}
                      className={`py-2 px-2 text-[14px] ${subIndex !== ((item?.submenu?.length ?? 0) - 1) ? 'border-b border-white/30' : ''} ${
                        isSubActive ? 'bg-[#3F4092] text-white font-semibold' : ''
                      }`}
                      >
                      {isExternalSubItem ? (
                        <a
                          href={subItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => dispatch(hideSideBar())}
                        >
                          {subItem.label}
                        </a>
                      ) : (
                        <Link
                          href={subItem.link || '#'}
                          onClick={() => dispatch(hideSideBar())}
                        >
                          {subItem.label}
                        </Link>
                      )}
                      </li>
                    )})}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
