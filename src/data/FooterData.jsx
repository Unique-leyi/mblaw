import React from 'react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";

// VK Icon Component (fallback if not available in react-icons)
export const VkIcon = (props) => (
  <svg 
    width={props.size || "22px"} 
    height={props.size || "22px"} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.785 16.241s.287-.029.435-.18c.135-.135.132-.351.132-.351s-.019-1.105.495-1.269c.505-.155 1.15 1.031 1.837 1.487.518.345.91.269.91.269l1.837-.027s.958-.061.504-.818c-.037-.061-.269-.57-1.384-1.612-1.17-1.096-1.012-.459.395-1.407.849-.575 1.898-1.509 2.068-1.817.169-.308.118-.567-.118-.567h-1.838s-1.353.079-1.561.247c-.169.138-.269.447-.269.447s-.484 1.29-1.125 2.386c-1.354 2.287-1.898 2.406-2.12 2.263-.515-.337-.387-1.356-.387-2.081 0-2.263.346-3.209-.677-3.454-.337-.081-.585-.135-1.449-.143-1.108-.011-1.828.003-2.305.292-.314.193-.557.624-.409.649.181.03.593.111.809.406.282.386.271 1.253.271 1.253s.162 2.408-.377 2.707c-.37.207-.879-.216-1.97-2.263-.559-1.026-.982-2.157-1.378-3.043-.149-.337-.402-.465-.402-.465s-.346-.227-.242-.471c.082-.191.515-.421 1.153-.421h2.071s.515.038.67.236c.136.17.098.495.098.495s-.18 1.092-.405 2.035c-.46 1.938.387 2.285 1.032 1.4.253-.345.774-1.178.774-1.178s.072-.136.169-.197c.097-.061.232-.041.232-.041l2.071.012s.555-.029.648.135c.094.164-.023.505-.023.505z"/>
  </svg>
);

export const footerNavigation = [
  {
    display: "About",
    path: "/about-us",
  },
  {
    display: "Testimonials",
    path: "/testimonials",
  },
  {
    display: "Blog",
    path: "/blog",
  },
  {
    display: "Practice areas",
    path: "/practice-areas",
  },
  {
    display: "Contact us",
    path: "/contact-us",
  },
];

export const footerSocialLinks = [
  {
    name: "VK",
    icon: VkIcon,
    link: "https://vk.com/mblaw",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com/mblaw",
  },
  {
    name: "Telegram",
    icon: FaTelegram,
    link: "https://t.me/mblaw",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://instagram.com/mblaw",
  },
];

export const footerContactInfo = {
  phone: "+1-647-642-2117",
  email: "law.musa@gmail.com",
  address: "8975 McLaughlin Rd S #10, Brampton, ON, Canada",
};

export const footerLanguages = ["En", "Es", "Fr", "De", "Ru"];
