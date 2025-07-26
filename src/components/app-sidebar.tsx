import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

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
import { router } from "@/routes";
import { useSidebar } from "./hook-sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  return (
    <Sidebar className="mt-[4.5rem] pt-5">
      <SidebarContent>
        <SidebarMenu>
          {router
            .filter((item) => item.show)
            .map((item) => (
              <Items key={item.name} item={item} />
            ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

type ItemsProps = {
  item: (typeof router)[number];
};

function Items({ item }: ItemsProps) {
  const { isActive } = useSidebar();
  const hasChildren = item.children && item.children.length > 0;
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);

  // handlers
  const handleToggleSubmenu = () => setSubmenuOpen((prev) => !prev);

  const activeParent = (children: (typeof router)[number]) => {
    return children.children?.some((child) => isActive(child.path));
  };

  const active = isActive(item.path);

  return (
    <>
      {item.parent ? (
        <Collapsible
          open={submenuOpen}
          onOpenChange={handleToggleSubmenu}
          className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild className="px-3 py-4 rounded-none">
              <SidebarMenuButton className="px-3 py-4 rounded-none h-full relative">
                {activeParent(item) ? (
                  <span className="absolute left-0 top-0 w-2 h-full bg-amber-500 rounded-tr-lg rounded-br-lg"></span>
                ) : null}

                <div className="relative flex flex-row items-center ">
                  <span className="flex flex-row items-center space-x-3 ml-2">
                    {activeParent(item)
                      ? item.icon?.active
                      : item.icon?.inactive}
                    <span
                      className={`${
                        activeParent(item) && "font-bold text-blue-700"
                      }`}>
                      {item.name}
                    </span>
                  </span>
                </div>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {hasChildren &&
                item.children?.map((item) => {
                  const childActive = isActive(item.path);

                  return (
                    <SidebarMenuSub key={item.name}>
                      <SidebarMenuSubItem>
                        <Button
                          variant="link"
                          className="w-full h-full px-3 py-3 rounded-none justify-start">
                          <Link
                            to={item.path}
                            className={
                              cn(childActive && "font-bold text-blue-700") +
                              " text-sm"
                            }>
                            {item.name}
                          </Link>
                        </Button>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  );
                })}
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ) : (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild className="px-3 py-4 rounded-none">
            <div className="relative flex flex-row items-center h-full">
              {active && (
                <span className="absolute left-0 top-0 w-2 h-full bg-amber-500 rounded-tr-lg rounded-br-lg"></span>
              )}
              <Link
                to={item.path}
                className="flex flex-row items-center space-x-3 ml-2">
                {active ? item.icon?.active : item.icon?.inactive}
                <span className={`${active && "font-bold text-blue-700"}`}>
                  {item.name}
                </span>
              </Link>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </>
  );
}
