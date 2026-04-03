import { MenuItem } from "../interfaces";

const TC_DOWNLOAD_LINK = "https://aisppur.nexterp.in/nlp/nlp/download-tc";

const navLinks: MenuItem[] = [
  {
    label: "HOME",
    link: "/",
  },
  {
    label: "ABOUT US",
    submenu: [
      {
        label: "WELCOME TO AIS",
        link: "/welcome-to-ais",
      },
      {
        label: "VISION & MISSION",
        link: "/vision-mission",
      },
      {
        label: "PRINCIPAL’S NOTE",
        link: "/principals-note",
      },
      {
        label: "MANDATORY DISCLOSURE (CBSE)",
        link: "/public-disclosure",
      },
    ],
  },
  {
    label: "ADMISSION",
    submenu: [
      {
        label: "ADMISSION PROCESS",
        link: "admission-process",
      },
      {
        label: "FEE STRUCTURE",
        link: "fee-structure",
      },
      {
        label: "TC DOWNLOAD",
        link: TC_DOWNLOAD_LINK,
      },
      {
        label: "ACADEMIC STREAMS (XI & XII)",
        link: "academic-streams",
      },
    ],
  },
  {
    label: "ACADEMICS",
    submenu: [
      {
        label: "FACULTY",
        link: "/faculty",
      },
      {
        label: "CURRICULUM",
        link: "/curriculum",
      },
      {
        label: "ACADEMIC CALENDAR & EVENTS",
        link: "/academic-calendar-events",
      },
      {
        label: "AWARDS",
        link: "/awards",
      },
    ],
  },
  {
    label: "FACILITIES",
    submenu: [
      {
        label: "LABORATORIES",
        link: "/laboratories",
      },
      {
        label: "SPORTS INFRASTRUCTURE",
        link: "/sports-infrastructure",
      },
      {
        label: "SCHOOL TRANSPORT",
        link: "/school-transport",
      },
      {
        label: "LIBRARY",
        link: "/library",
      },
      {
        label: "AI ENABLED CLASSROOM",
        link: "/smart-class",
      },
    ],
  },
  {
    label: "NEWS & EVENTS",
    submenu: [
      {
        label: "SCHOOL CALENDAR",
        link: "/school-calendar",
      },
      {
        label: "NEWS & MEDIA COVERAGE",
        link: "/media-coverage",
      },
      {
        label: "PHOTO GALLERY",
        link: "/image-gallery",
      },
    ],
  },
  {
    label: "FEE PAYMENT",
    link: "https://aisppur.nexterp.in/nlp/nlp/login",
  },
  {
    label: "CAREERS",
    link: "/careers",
  },
  // {
  //   label: "CONTACT US",
  //   link: "/contact-us",
  // },
];

export default navLinks;
