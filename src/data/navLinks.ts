import { MenuItem } from "../interfaces";

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
        label: "WITHDRAWAL",
        link: "withdrawal",
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
        link: "/news-events/school-calendar",
      },
      {
        label: "MEDIA COVERAGE",
        link: "/news-events/media-coverage",
      },
      {
        label: "IMAGE GALLERY",
        link: "/news-events/image-gallery",
      },
    ],
  },
  {
    label: "FEE PAYMENT",
    link: "https://aisppur.nexterp.in/nlp/nlp/login",
  },
  {
    label: "CAREER OPPORTUNITY",
    link: "/career-opportunity",
  },
  // {
  //   label: "CONTACT US",
  //   link: "/contact-us",
  // },
];

export default navLinks;