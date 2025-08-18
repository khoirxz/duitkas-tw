import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { useTheme, type Theme } from "./theme-provider";

import { ChevronDown } from "lucide-react";

import { useAuthStore } from "@/store/useAuth";

import { HeadphoneIcon, MenuFriesIcon } from "@/assets/icons/outline";
import { HelpIcon } from "@/assets/icons/solid";

import logoLight from "@/assets/navbar/LogoLight.svg";
import idLang from "@/assets/navbar/id.png";
import enLang from "@/assets/navbar/en.png";
import profileImg from "@/assets/navbar/profile.png";
import { cn } from "@/lib/utils";

const dataLang: { name: string; value: string; icon: string }[] = [
  {
    name: "Indonesia",
    value: "id",
    icon: idLang,
  },
  {
    name: "English",
    value: "en",
    icon: enLang,
  },
];

const themes: { name: string; value: Theme; color: string }[] = [
  {
    name: "Light",
    value: "light",
    color: "#f9f9f9",
  },
  {
    name: "Dark",
    value: "dark",
    color: "#1f1f1f",
  },
  {
    name: "System",
    value: "system",
    color: "#1f1f1f",
  },
];

const AppNavbar: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>("id");
  const { toggleSidebar } = useSidebar();
  const { setTheme, theme } = useTheme();

  const { logout } = useAuthStore();

  return (
    <nav
      className={`fixed top-0 w-full z-30 shadow-lg bg-white max-h-[4.5rem] h-full flex flex-row justify-between items-center px-3`}>
      <div className="flex flex-row gap-2 h-full items-center ">
        <Button size="icon" variant="ghost" onClick={() => toggleSidebar()}>
          <MenuFriesIcon />
        </Button>
        <img src={logoLight} alt="logo" className="h-9 object-contain" />
      </div>
      <div className="flex flex-row gap-5 h-full items-center">
        <div className="hidden md:flex flex-row gap-2">
          <button className="bg-white hover:bg-primary/15 p-1 flex flex-col items-center rounded transition-all">
            <HeadphoneIcon className="w-6 h-6" />
          </button>
          <button className="bg-white hover:bg-primary/15 p-1 flex flex-col items-center rounded transition-all">
            <HelpIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-white hover:bg-primary/15 flex flex-row items-center p-1.5 rounded transition-all">
                <img
                  src={
                    dataLang.find((lang) => lang.value === selectedLang)?.icon
                  }
                  alt={selectedLang}
                  className="w-6 h-6 mr-3"
                />

                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dataLang.map((lang) => (
                <DropdownMenuItem
                  key={lang.name}
                  onClick={() => setSelectedLang(lang.value)}>
                  <img
                    src={lang.icon}
                    alt={lang.name}
                    className="w-6 h-6 mr-3"
                  />
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-white hover:bg-primary/15 flex flex-row gap-2 items-center py-1 px-2 rounded transition-all">
              <img
                src={profileImg}
                alt={"profile"}
                className="h-9 w-9 bg-indigo-400 rounded-full object-contain"
              />
              <div className="hidden md:flex flex-col ml-2 items-start">
                <span className="font-bold">Administrator</span>
                <span className="text-xs font-domine text-black/60">
                  DEMODEV
                </span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-52">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const nextTheme =
                  theme === "light"
                    ? "dark"
                    : theme === "dark"
                    ? "system"
                    : "light";
                setTheme(nextTheme);
              }}>
              Theme :
              {themes.map((theme) => (
                <span
                  key={theme.value}
                  className={cn(
                    themes.find((t) => t.value === theme.value)?.name ===
                      theme.name
                      ? "border-primary border-2"
                      : "border-transparent",
                    "border-2 h-4 w-4 rounded-full cursor-pointer"
                  )}
                  style={{ backgroundColor: theme.color }}></span>
              ))}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              {themes.find((t) => t.value === theme)?.name}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AppNavbar;
