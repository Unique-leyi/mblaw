import { FaMapMarkerAlt, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export const contactDetails = [
    {
        icon: FaMapMarkerAlt,
        content: "Shenley Road, Opposite Sainsbury's, Hemel-Hempstead, Hertfordshire HP2 7AS, United Kingdom ",
    },

    {
        icon: FaEnvelope,
        content: "support@mightyskyconcepts.co.uk  ",
    }
]


export const socialsLinks = [

    {
        display: "Facebook",
        icon: FaFacebook,
        link: "https://facebook.com",
    },

    {
        display: "Instagram",
        icon: FaInstagram,
        link: "https://instagram.com",
    },


    {
        display: "LinkedIn",
        icon: FaLinkedin,
        link: "https://linkedin.com/mightyskytechnologies",
    },

    {
        display: "Twitter",
        icon: BsTwitterX,
        link: "https://twitter.com/mightyskytech",
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
        id: "team",
        display: "Our Team",
        path: "/team",
    },

    {
        id: "plans",
        display: "Plans",
        path: "/plans",
    },

    {
        id: "hospital-network",
        display: "Hospital Network",
        path: "/hospital-network",
    },


]