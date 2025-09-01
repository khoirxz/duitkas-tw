import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AppNavbar from "@/components/app-navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import { useAuthStore } from "@/store/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  return (
    <ThemeProvider defaultTheme="system" storageKey="duitkas-theme">
      <SidebarProvider className="font-public">
        <AppNavbar data={user} />
        <AppSidebar />
        <main className={`mt-[4.5rem] bg-[#F7FAFC] dark:bg-[#111111] w-full`}>
          <div className="max-w-[1440px] w-full mx-auto pt-5 md:px-2">
            {children}
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}
