import { FaMapMarkerAlt, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export const contactDetails = [
    {
        icon: FaMapMarkerAlt,
        content: "Shenley Road, Opposite Sainsbury's, Hemel-Hempstead, Hertfordshire HP2 7AS, United Kingdom",
    },

    {
        icon: FaEnvelope,
        content: "info@mblaw.co.uk",
    }
]


export const socialsLinks = [
    {
        display: "Facebook",
        icon: FaFacebook,
        link: "https://facebook.com/mblaw",
    },

    {
        display: "Instagram",
        icon: FaInstagram,
        link: "https://instagram.com/mblaw",
    },

    {
        display: "LinkedIn",
        icon: FaLinkedin,
        link: "https://linkedin.com/company/mb-law",
    },

    {
        display: "Twitter",
        icon: BsTwitterX,
        link: "https://twitter.com/mblaw",
    },
]

export const NavbarData = [
    {
        id: "",
        display: "Home",
        path: "/",
    },

    {
        id: "about-us",
        display: "About Us",
        path: "/about-us",
    },

    {
        id: "blog",
        display: "Blog",
        path: "/blog",
    },

    {
        id: "practice-areas",
        display: "Practice Areas",
        path: "/practice-areas",
    },

    {
        id: "team",
        display: "Our Team",
        path: "/team",
    },




]