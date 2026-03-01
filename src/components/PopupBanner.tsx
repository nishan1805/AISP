"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const POPUP_TARGET_URL =
  "https://youtu.be/2Kd5xD_wfns?si=JFTVWANuAtXxvRS-";

const PopupBanner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/65 p-4">
      <div className="relative w-full max-w-[92vw] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[640px]">
        <button
          type="button"
          aria-label="Close popup banner"
          className="absolute right-2 top-2 z-10 rounded-full bg-white/95 p-2 text-black shadow-md"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        <a
          href={POPUP_TARGET_URL}
          className="block overflow-hidden rounded-lg"
          aria-label="Open popup banner link"
        >
          <Image
            src="/images/pop_up_banner.jpeg"
            alt="Achievers International School popup banner"
            width={1200}
            height={800}
            className="mx-auto h-auto max-h-[88vh] w-full object-contain"
            priority
          />
        </a>
      </div>
    </div>
  );
};

export default PopupBanner;
