export interface MenuItem {
    label: string;
    link?: string;
    submenu?: MenuItem[];
  }
export interface FacilityInterface {
  image: string;
  title: string;
  description: string;
  iconImage: string; // Icon as an image instead of an icon component
  link:string
  }
export interface GalleryInterface {
  image: string;
  title: string;
  date: string;
  }
export interface NewsInterface {
  image: string;
  title: string;
  description: string;
  date: string;
  }
export interface Breadcrumb {
    label: string;
    url?: string; 
  }

export interface LinkItem {
    img: string;
    text: string;
    link?: string; // optional link
  }
  