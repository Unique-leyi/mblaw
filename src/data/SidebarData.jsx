import { RxDashboard } from "react-icons/rx";
import { LogoutIcon, ConsultationsIcon, AppointmentsIcon, BlogsIcon } from "../ui/icons";
import { Settings, UsersRound, Mail } from "lucide-react";




export const SidebarData = [
    {
        title: 'Overview',
        icon: <RxDashboard size={25} />,
        link: '/dashboard',
        id: '',
        roles: ['super_admin', 'admin'], 
    },
    {
        title: 'Consultations',
        icon: <ConsultationsIcon w={6} h={6} />,
        link: '/dashboard/consultations',
        id: 'consultations',
        roles: ['super_admin', 'admin'], 
    },


    {
      title: 'Appointments',
      icon: <AppointmentsIcon w={6} h={6} />,
      link: '/dashboard/appointments',
      id: 'appointments',
      roles: ['super_admin', 'admin'], 
    },

    {
      title: 'Blog Management',
      icon: <BlogsIcon w={6} h={6} />,
      link: '/dashboard/blog-management',
      id: 'blog-management',
      roles: ['super_admin', 'admin'], 
    },

    {
        title: 'Clients',
        icon: <UsersRound w={6} h={6} />,
        link: '/dashboard/clients',
        id: 'clients',
        roles: ['super_admin', 'admin'], 
    },
    {
        title: 'Team members',
        icon: <UsersRound w={6} h={6} />,
        link: '/dashboard/team-members',
        id: 'team-members',
        roles: ['super_admin'], 
    },
    {
        title: 'Contact Submissions',
        icon: <Mail w={6} h={6} />,
        link: '/dashboard/contacts',
        id: 'contacts',
        roles: ['super_admin'], 
    },
    {
        title: 'Overview',
        icon: <RxDashboard size={25} />,
        link: '/my-account',
        id: 'my-account-overview',
        roles: ['user'], 
    },
    {
        title: 'My Consultations',
        icon: <ConsultationsIcon w={6} h={6} />,
        link: '/my-account/consultations',
        id: 'my-consultations',
        roles: ['user'], 
    },
    {
        title: 'My Appointments',
        icon: <AppointmentsIcon w={6} h={6} />,
        link: '/my-account/appointments',
        id: 'my-appointments',
        roles: ['user'], 
    },
    {
        title: "Settings",
        icon: <Settings w={6} h={6} />,
        link: '/my-account/settings',
        id: 'my-settings',
        roles: ['user'], 
    },
    
    {
        title: "Settings",
        icon: <Settings w={6} h={6} />,
        link: '/dashboard/settings',
        id: 'settings',
        roles: ['super_admin', 'admin'], 
    },
    {
        title: 'Logout',
        icon: <LogoutIcon w={6} h={6} />,
        link: '/',
        id: 'logout',
        roles: ['super_admin', 'admin', 'user'],  
    }, 
];