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
import { URL_FILTER, validTags } from "@/lib/utils";

import { Settings2 } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ContactFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterValues = new Set(searchParams.getAll(URL_FILTER));

  const handleSubmit = async (formData: FormData) => {
    const queries = formData.getAll(URL_FILTER) as string[];
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(URL_FILTER);
    queries.forEach((query) => {
      if (query.trim()) {
        newParams.append(URL_FILTER, query.trim());
      }
    });
    const newURL = `${pathname}?${newParams.toString()}`;
    router.replace(newURL);
  };

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
          Filter
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Form action={handleSubmit} className=" px-2 pb-2">
          <DropdownMenuGroup className="grid gap-1">
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              Filter By
            </DropdownMenuLabel>
            {validTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center px-2 py-2 rounded-md text-md capitalize cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
              >
                <input
                  type="checkbox"
                  name={URL_FILTER}
                  value={tag}
                  defaultChecked={filterValues.has(tag)}
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
