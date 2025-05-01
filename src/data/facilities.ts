import { FacilityInterface } from "@/interfaces";


const facilities: FacilityInterface[] = [
    {
        title: "AI Enabled Classrooms",
        description: "Our AI-enabled classroom offers personalized learning using advanced technology.",
        image: "/images/F1.webp",
        iconImage: "/images/Online learning.png",
        link:"/smart-class"
    },
    {
        title: "Library",
        description: "The students at our school fulfil their need for extensive information and knowledge at the Library.",
        image: "/images/F2.webp",
        iconImage: "/images/Books.png",
        link:"/library"
    },
    {
        title: "Laboratories",
        description: "There are different laboratories setup for subjects: Computer Science, Physics, Chemistry",
        image: "/images/F3.webp",
        iconImage: "/images/Flask.png",
        link:"/laboratories"
    },
    {
        title: "Sports Infrastructure",
        description: "Our school provides well-equipped sports facilities that encourage physical fitness, teamwork, and competitive spirit among students.",
        image: "/images/F4.webp",
        iconImage: "/images/Books.png",
        link:"/sports-infrastructure"
    },
    {
        title: "School Transport",
        description: "Our reliable school transport system ensures safe and timely travel for students across all major routes in the city.",
        image: "/images/F5.jpeg",
        iconImage: "/images/bus.png",
        link:"/school-transport"
    },
];

export default facilities;