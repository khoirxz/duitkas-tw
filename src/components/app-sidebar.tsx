import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";

// Menu items.
const items = [
  {
    title: "Beranda",
    url: "#",
    icon: Home,
  },
  {
    title: "Akun",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Perencanaan Dana",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Transaksi",
    url: "#",
    icon: Search,
  },
  {
    title: "Laporan",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="mt-[4.5rem] pt-5">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="px-3 py-4 rounded-none">
                <div className="relative flex flex-row items-center h-full">
                  {item.title === "Beranda" && (
                    <span className="absolute left-0 top-0 w-2 h-full bg-amber-500 rounded-tr-lg rounded-br-lg"></span>
                  )}
                  <a
                    href={item.url}
                    className="flex flex-row items-center space-x-3 ml-2">
                    <item.icon
                      className={`${
                        item.title === "Beranda" && "text-blue-700"
                      } w-4 h-4`}
                    />
                    <span
                      className={`${
                        item.title === "Beranda" && "font-bold text-blue-700"
                      }`}>
                      {item.title}
                    </span>
                  </a>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="px-3 py-4 rounded-none">
                <SidebarMenuButton className="px-3 py-4 rounded-none h-full">
                  <div className="relative flex flex-row items-center ">
                    <span className="flex flex-row items-center space-x-3 ml-2">
                      <Calendar className="w-4 h-4" />
                      <span>Perencanaan Dana</span>
                    </span>
                  </div>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <Button variant="link">Create</Button>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
