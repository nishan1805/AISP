export interface JobListing {
  id: string;
  title: string;
  subject?: string;
  description: string;
  lastDate: string;
  status: 'Regular' | 'Part-Time' | 'Contract';
  requirements: string[];
  whatYoullDo: string[];
  whatWereeLookingFor: string[];
  whatWeOffer: string[];
  howToApply: string[];
}

export const jobListings: JobListing[] = [
  {
    id: 'math-teacher-1',
    title: 'Mathematics Teacher',
    subject: 'Mathematics',
    description: 'Looking for an experienced teacher to join our team',
    lastDate: '18 Jun 2025',
    status: 'Regular',
    requirements: [
      'Bachelor\'s or Master\'s degree in Mathematics or a related discipline.',
      'B.Ed. or equivalent teaching qualification (mandatory).',
      'Minimum 2-5 years of teaching experience in a reputed CBSE/ICSE/State Board school.',
      'Strong communication skills and ability to make mathematical concepts simple and engaging.',
      'Familiarity with digital teaching tools, smart boards, and assessment software preferred.'
    ],
    whatYoullDo: [
      'Deliver engaging Mathematics classes for students (Grades VI-XII) using modern teaching aids and interactive methodologies.',
      'Prepare lesson plans, assignments, and assessments aligned with school curriculum and board requirements.',
      'Conduct remedial sessions to address varied learning needs.',
      'Track student performance, maintain academic records, and share feedback with parents.',
      'Collaborate with other faculty members to plan interdisciplinary and co-curricular activities.',
      'Participate in faculty meetings, workshops, and school events as part of the learning community.'
    ],
    whatWereeLookingFor: [
      'Bachelor\'s or Master\'s degree in Mathematics or a related discipline.',
      'B.Ed. or equivalent teaching qualification (mandatory).',
      'Minimum 2-5 years of teaching experience in a reputed CBSE/ICSE/State Board school.',
      'Strong communication skills and ability to make mathematical concepts simple and engaging.',
      'Familiarity with digital teaching tools, smart boards, and assessment software preferred.'
    ],
    whatWeOffer: [
      'Competitive salary commensurate with qualifications and experience.',
      'Supportive academic environment with opportunities for professional growth and training.',
      'Access to school facilities, teaching resources, and continuous learning workshops.',
      'Leave, health, and staff welfare benefits as per school policy norms.'
    ],
    howToApply: [
      'Submit your CV, cover letter, and (optional) short teaching demo video through the AISSPUR Careers Portal.',
      'Please mention:',
      'Your preferred subject areas and subject specialization.',
      'Classes/grades you have taught.',
      'Availability to join (with notice period, if any).',
      'Shortlisted candidates will be invited for:',
      'Online Demo Class',
      'In-Person Interview',
      'Final Selection & Offer'
    ]
  },
  {
    id: 'science-teacher-1',
    title: 'Science Teacher',
    subject: 'Science',
    description: 'Looking for an experienced teacher to join our team',
    lastDate: '15 Jun 2025',
    status: 'Part-Time',
    requirements: [
      'Bachelor\'s or Master\'s degree in Science or a related discipline.',
      'B.Ed. or equivalent teaching qualification (mandatory).',
      'Minimum 2-3 years of teaching experience in a reputed CBSE/ICSE/State Board school.',
      'Strong laboratory skills and ability to conduct practical sessions.',
      'Knowledge of modern teaching methodologies and digital tools.'
    ],
    whatYoullDo: [
      'Deliver engaging Science classes for students (Grades VI-X) with practical demonstrations.',
      'Prepare lesson plans, lab activities, and assessments aligned with curriculum.',
      'Conduct laboratory sessions and maintain lab equipment.',
      'Track student performance and provide regular feedback.',
      'Participate in science exhibitions and project activities.'
    ],
    whatWereeLookingFor: [
      'Bachelor\'s or Master\'s degree in Science (Physics/Chemistry/Biology).',
      'B.Ed. or equivalent teaching qualification.',
      'Experience in CBSE/ICSE curriculum.',
      'Laboratory management skills.',
      'Excellent communication and interpersonal skills.'
    ],
    whatWeOffer: [
      'Competitive salary package.',
      'Professional development opportunities.',
      'Well-equipped laboratory facilities.',
      'Collaborative work environment.',
      'Health and welfare benefits.'
    ],
    howToApply: [
      'Submit your complete CV and cover letter.',
      'Mention your specialization area (Physics/Chemistry/Biology).',
      'Include details of laboratory experience.',
      'Provide availability and notice period details.',
      'Shortlisted candidates will be called for interview and demo class.'
    ]
  },
  {
    id: 'english-teacher-1',
    title: 'English Teacher',
    subject: 'English',
    description: 'Looking for an experienced teacher to join our team',
    lastDate: '18 Jul 2025',
    status: 'Contract',
    requirements: [
      'Master\'s degree in English Literature or English Language.',
      'B.Ed. or equivalent teaching qualification (mandatory).',
      'Minimum 3-5 years of teaching experience.',
      'Excellent command over English language and literature.',
      'Experience in creative writing and communication skills development.'
    ],
    whatYoullDo: [
      'Teach English Language and Literature to students (Grades VI-XII).',
      'Develop reading, writing, and communication skills.',
      'Organize literary events and competitions.',
      'Prepare students for board examinations.',
      'Conduct remedial classes for weak students.'
    ],
    whatWereeLookingFor: [
      'Master\'s degree in English with B.Ed. qualification.',
      'Strong communication and presentation skills.',
      'Experience in CBSE/ICSE curriculum.',
      'Creative approach to teaching literature.',
      'Ability to inspire students in language learning.'
    ],
    whatWeOffer: [
      'Attractive salary package.',
      'Library and resource access.',
      'Professional growth opportunities.',
      'Supportive academic environment.',
      'Performance-based incentives.'
    ],
    howToApply: [
      'Send your detailed CV with cover letter.',
      'Include sample lesson plans or teaching materials.',
      'Mention your literary interests and specializations.',
      'Provide references from previous employers.',
      'Selected candidates will undergo written test and interview.'
    ]
  },
  {
    id: 'math-teacher-2',
    title: 'Mathematics Teacher',
    subject: 'Mathematics',
    description: 'Looking for an experienced teacher to join our team',
    lastDate: '16 Jun 2025',
    status: 'Regular',
    requirements: [
      'Bachelor\'s or Master\'s degree in Mathematics.',
      'B.Ed. qualification mandatory.',
      'Minimum 2-4 years teaching experience.',
      'Strong analytical and problem-solving skills.',
      'Familiarity with modern teaching aids.'
    ],
    whatYoullDo: [
      'Teach Mathematics to middle and senior school students.',
      'Prepare comprehensive lesson plans and assessments.',
      'Use innovative teaching methods to simplify complex concepts.',
      'Monitor student progress and provide feedback.',
      'Participate in mathematical olympiads and competitions.'
    ],
    whatWereeLookingFor: [
      'Strong mathematical foundation and teaching skills.',
      'Patience and ability to handle diverse learning needs.',
      'Technology integration in teaching.',
      'Excellent classroom management skills.',
      'Commitment to student success.'
    ],
    whatWeOffer: [
      'Competitive compensation package.',
      'Modern classroom facilities.',
      'Continuous professional development.',
      'Collaborative teaching environment.',
      'Recognition and career advancement opportunities.'
    ],
    howToApply: [
      'Submit your CV along with educational certificates.',
      'Include a brief teaching philosophy statement.',
      'Mention your preferred grade levels to teach.',
      'Provide contact details of previous schools.',
      'Participate in teaching demonstration and interview process.'
    ]
  }
];