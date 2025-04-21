import { CiLocationArrow1 } from "react-icons/ci";
export type SiteConfig = typeof siteConfig;
import { AiOutlineDashboard } from "react-icons/ai";
export type Navigation = {
  icon: any;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "VisActor Next Template",
  description: "Template for VisActor and Next.js",
};

export const navigations: Navigation[] = [
  {
    icon: AiOutlineDashboard,
    name: "Dashboard",
    href: "/admin",
  },
  {
    icon: CiLocationArrow1,
    name: "Ticket",
    href: "/admin/users",
  },
];
