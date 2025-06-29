"use client";

import { fetchUserSettingDataAction } from "@/app/(Dashboard)/setting/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRight, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition, useEffect, useMemo } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { IoBarChart, IoSettings } from "react-icons/io5";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useUserTriggerStore } from "@/state_management/user.state";
import { useActionState } from "react";

const navData = {
  teams: [
    {
      name: "NexusNova",
      logo: GalleryVerticalEnd,
      plan: "User Dashboard",
    },
  ],
  navMain: [
    {
      title: "Profile",
      url: "/profile",
      icon: BsFillPersonVcardFill,
    },
    {
      isCollapsible: true,
      title: "Contact",
      icon: IoMdContacts,
      subItems: [
        {
          title: "Connection",
          url: "/contact/connection",
        },
        {
          title: "Request",
          url: "/contact/request",
        },
      ],
    },
    {
      title: "Overview",
      url: "/overview",
      icon: IoBarChart,
    },
    {
      title: "Setting",
      url: "/setting",
      icon: IoSettings,
    },
  ],
};

export default function DashboardSideBar() {
  const [activeTeam] = React.useState(navData.teams[0]);
  const router = useRouter();

  const [userSettingState, userSettingAction, isPending] = useActionState(
    fetchUserSettingDataAction,
    undefined
  );

  const shouldRefetchUser = useUserTriggerStore(
    (state) => state.shouldRefetchUser
  );
  const resetTrigger = useUserTriggerStore((state) => state.resetTrigger);

  useEffect(() => {
    if (shouldRefetchUser || !userSettingState) {
      startTransition(() => {
        userSettingAction();
      });
      if (shouldRefetchUser) resetTrigger();
    }
  }, [shouldRefetchUser]);

  const handleSignout = () => {
    router.push("/login");
  };

  const navItems = useMemo(() => {
    return navData.navMain.map((item) =>
      item.isCollapsible ? (
        <Collapsible key={item.title} defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span className="text-md">{item.title}</span>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.subItems.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <Link href={subItem.url}>
                      <SidebarMenuButton tooltip={subItem.title}>
                        <span>{subItem.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ) : (
        <SidebarMenuItem key={item.title}>
          <Link href={item.url ?? "/"}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span className="text-md">{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )
    );
  }, []);

  return (
    <Sidebar collapsible="icon" className="shadow-xl">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <activeTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{navItems}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {isPending || !userSettingState ? (
                    <div className="w-full flex justify-center items-center py-2">
                      <LoadingSpinner className="border-primary w-5 h-5" />
                    </div>
                  ) : (
                    <>
                      <Avatar className="h-8 w-8 rounded-lg bg-background">
                        <AvatarImage
                          src={userSettingState.data.image ?? undefined}
                          alt={userSettingState.data.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg bg-background text-foreground">
                          {userSettingState.data.name
                            ?.slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {userSettingState.data.name}
                        </span>
                        <span className="truncate text-xs">
                          {userSettingState.data.email}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {!isPending && userSettingState && (
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-primary text-sidebar-primary-foreground"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={userSettingState.data.image ?? undefined}
                          alt={userSettingState.data.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg bg-background text-foreground">
                          {userSettingState.data.name?.[0] ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {userSettingState.data.name}
                        </span>
                        <span className="truncate text-xs">
                          {userSettingState.data.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={handleSignout}
                    className="flex justify-center items-center border border-primary-foreground rounded-lg py-2 px-2 hover:bg-accent"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
