"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tagOptions } from "@/util/utils";
import { Settings2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Form from "next/form";
import Link from "next/link";

export function ContactFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterValues = searchParams.getAll("filter");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings2 />
          Filter
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[270px]"
        side="bottom"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuLabel className="text-lg font-semibold">
          Filter by Tags
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Form action={pathname} className="mt-4 px-2 pb-2">
          <DropdownMenuGroup className="grid gap-2">
            {tagOptions.map((tag) => (
              <label
                key={tag}
                className="flex items-center px-2 py-2 rounded-md border text-md capitalize cursor-pointer
               bg-secondary text-secondary-foreground"
              >
                <input
                  type="checkbox"
                  name="filter"
                  value={tag}
                  defaultChecked={filterValues.includes(tag)}
                  className="mr-3 h-5 w-5 accent-primary"
                />
                {tag}
              </label>
            ))}
          </DropdownMenuGroup>

          <div className="flex justify-between gap-2 mt-4">
            <DropdownMenuItem asChild>
              <Button type="submit" variant={"outline"} className="flex-1">
                Apply
              </Button>
            </DropdownMenuItem>

            <Link href={pathname} className="flex-1">
              <DropdownMenuItem asChild>
                <Button variant="outline" className="w-full">
                  Reset
                </Button>
              </DropdownMenuItem>
            </Link>
          </div>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
