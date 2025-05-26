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
import { parseReadonlySearchParams, SearchParams } from "@/lib/url-state";
import { tagOptions } from "@/util/utils";
import { Settings2 } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { URL_PAGE } from "../Pagination/contact-pagination";

export const URL_FILTER = "filter";

interface OldUrlValueProps {
  searchParams: SearchParams;
}

const OldUrlValue = ({ searchParams }: OldUrlValueProps) => {
  return (
    <>
      {Object.entries(searchParams).flatMap(([key, value]) => {
        if (key === URL_PAGE || key === URL_FILTER || value === undefined)
          return [];

        if (Array.isArray(value)) {
          return value
            .filter((v) => v !== undefined)
            .map((v, i) => (
              <input key={`${key}-${i}`} type="hidden" name={key} value={v} />
            ));
        }

        return <input key={key} type="hidden" name={key} value={value} />;
      })}
    </>
  );
};

export function ContactFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterValues = searchParams.getAll(URL_FILTER);
  const parsedSearchParams = parseReadonlySearchParams(searchParams);

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

        <Form action={pathname} className=" px-2 pb-2">
          <OldUrlValue searchParams={parsedSearchParams} />
          <DropdownMenuGroup className="grid gap-1">
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              Filter By
            </DropdownMenuLabel>
            {tagOptions.map((tag) => (
              <label
                key={tag}
                className="flex items-center px-2 py-2 rounded-md text-md capitalize cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
              >
                <input
                  type="checkbox"
                  name={URL_FILTER}
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
