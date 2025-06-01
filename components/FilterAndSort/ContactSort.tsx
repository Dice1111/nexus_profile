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
import {
  parseReadonlySearchParams,
  SearchParams,
  URL_PAGE,
  URL_SORT_IEM,
  URL_SORT_ORDER,
} from "@/lib/url-state";

import { ArrowUpDown } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const SortItemsArray = [
  {
    label: "Name",
    value: "firstName",
  },
  {
    label: "Connected Date",
    value: "createdAt",
  },
];
const SortOrderArray = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
];

interface OldUrlValueProps {
  searchParams: SearchParams;
}

const OldUrlValue = ({ searchParams }: OldUrlValueProps) => {
  return (
    <>
      {Object.entries(searchParams).flatMap(([key, value]) => {
        if (
          key === URL_PAGE ||
          key === URL_SORT_IEM ||
          key === URL_SORT_ORDER ||
          value === undefined
        ) {
          return [];
        }

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

export function ContactSort() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortedItem = searchParams.get(URL_SORT_IEM);
  const sortedOrder = searchParams.get(URL_SORT_ORDER);

  const parsedSearchParams = parseReadonlySearchParams(searchParams);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowUpDown />
          Sort
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[270px]"
        side="bottom"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuLabel className="text-lg font-semibold">
          Sort
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Form action={pathname} className="pb-2">
          <OldUrlValue searchParams={parsedSearchParams} />
          <DropdownMenuGroup className="grid gap-1 p-2">
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              Sort By
            </DropdownMenuLabel>
            {SortItemsArray.map((item, index) => (
              <label
                key={item.value}
                className="flex items-center px-2 py-2 rounded-md text-md capitalize cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
              >
                <input
                  type="radio"
                  name={URL_SORT_IEM}
                  value={item.value}
                  defaultChecked={
                    sortedItem ? sortedItem === item.value : index === 1
                  }
                  className="mr-3 h-5 w-5 accent-primary"
                />
                {item.label}
              </label>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="grid gap-1  p-2">
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              Order By
            </DropdownMenuLabel>

            {SortOrderArray.map((order, index) => (
              <label
                key={order.value}
                className="flex items-center px-2 py-2 rounded-md text-md capitalize cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
              >
                <input
                  type="radio"
                  name={URL_SORT_ORDER}
                  value={order.value}
                  defaultChecked={
                    sortedOrder ? sortedOrder === order.value : index === 1
                  }
                  className="mr-3 h-5 w-5 accent-primary"
                />
                {order.label}
              </label>
            ))}
          </DropdownMenuGroup>
          <div className="flex justify-between gap-2 px-2">
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
