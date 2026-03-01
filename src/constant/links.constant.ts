import { LinkItem } from "@/interfaces";
import { getAcademicYearLabel } from "@/utils/academicYear";

const admissionFormLabel = `ADMISSION FORM (${getAcademicYearLabel()})`;

export const linkItems: LinkItem[] = [
    { img: "/videos/New.gif", text: "LATEST UPDATES", link: "" }, 
    { img: "/images/form.png", text: admissionFormLabel, link: "https://aisppur.nexterp.in/nlp/nlp/admission-login" },
    { img: "/images/Family.png", text: "PARENT/STUDENT LOGIN", link: "https://aisppur.nexterp.in/nlp/nlp/login" },
    { img: "/images/money.png", text: "FEE PAYMENT", link: "https://aisppur.nexterp.in/nlp/nlp/login" }, 
  ];
export const SideBarLinkItems: LinkItem[] = [
    { img: "/images/form.png", text: admissionFormLabel, link: "https://aisppur.nexterp.in/nlp/nlp/admission-login" },
    { img: "/images/Family.png", text: "PARENT/STUDENT LOGIN", link: "https://aisppur.nexterp.in/nlp/nlp/login" },
  ];
