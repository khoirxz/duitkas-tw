import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AppNavbar from "@/components/app-navbar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="font-public">
      <AppNavbar />
      <AppSidebar />
      <main
        className={`mt-[4.5rem] max-w-[1440px] w-full mx-auto pt-5 md:px-2`}>
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
