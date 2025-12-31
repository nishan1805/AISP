// Latest Updates Types
export interface LatestUpdate {
  id: number;
  title: string;
  description?: string;
  file_url?: string;
  visibility: boolean;
  status: 'New' | 'Posted' | 'Deleted';
  created_at: string;
  updated_at: string;
}

// Photo Gallery Types
export interface PhotoGallery {
  id: number;
  gallery_id?: string;
  title: string;
  description?: string;
  event_date?: string;
  images: string[];
  status: 'New' | 'Posted' | 'Deleted';
  visibility: boolean;
  created_at: string;
  updated_at: string;
}

// News Media Types
export interface NewsMedia {
  id: number;
  post_id?: string;
  title: string;
  description?: string;
  event_date?: string;
  source?: string;
  images: string[];
  status: 'New' | 'Posted' | 'Deleted';
  visibility: boolean;
  created_at: string;
  updated_at: string;
}

// Mandatory Disclosure Types
export interface MandatoryDisclosure {
  id: number;
  doc_id?: string;
  title: string;
  description?: string;
  file_url?: string;
  status: 'New' | 'Posted' | 'Deleted';
  visibility: boolean;
  created_at: string;
  updated_at: string;
}

// Jobs Types
export interface Job {
  id: number;
  job_id?: string;
  title: string;
  subject: string;
  description?: string;
  last_date_to_apply: string;
  job_type: 'Regular' | 'Part-Time' | 'Guest' | 'Contract';
  requirements?: string[];
  what_youll_do?: string[];
  what_were_looking_for?: string[];
  what_we_offer?: string[];
  how_to_apply?: string[];
  visibility: boolean;
  status: 'Open' | 'Closed';
  created_at: string;
  updated_at: string;
}

// Job Applications Types
export interface JobApplication {
  id: number;
  job_id: number;
  applicant_sno?: string;
  full_name: string;
  phone_no: string;
  email_id: string;
  applied_on: string;
  attachment_url?: string;
  status: 'New' | 'Shortlisted' | 'Interviewed' | 'Rejected' | 'Selected';
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Faculty Staff Types
export interface FacultyStaff {
  id: number;
  doc_id: string;
  name: string;
  designation: string;
  category: 'Teaching' | 'Non-Teaching';
  image_url?: string;
  visibility: boolean;
  created_at: string;
  updated_at: string;
}
