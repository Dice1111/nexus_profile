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
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/domain/enum/search-params-handler-service.enum";
import { URL_SORT_IEM, URL_SORT_ORDER } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SortItemsArray {
  label: string;
  value: SORTABLE_ITEMS;
}
interface SortOrderArray {
  label: string;
  value: SORTABLE_ORDERS;
}

const SortItemsArray: SortItemsArray[] = [
  {
    label: "Name",
    value: SORTABLE_ITEMS.FULL_NAME,
  },
  {
    label: "Connected Date",
    value: SORTABLE_ITEMS.CREATED_AT,
  },
];
const SortOrderArray: SortOrderArray[] = [
  {
    label: "Ascending",
    value: SORTABLE_ORDERS.ASC,
  },
  {
    label: "Descending",
    value: SORTABLE_ORDERS.DESC,
  },
];

export function ContactSort() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortedItem = searchParams.get(URL_SORT_IEM);
  const sortedOrder = searchParams.get(URL_SORT_ORDER);

  const handleSubmit = async (formData: FormData) => {
    const sortItemQuery = formData.get(URL_SORT_IEM) as string;
    const sortOrderQuery = formData.get(URL_SORT_ORDER) as string;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SORT_IEM, sortItemQuery.trim());
    newParams.set(URL_SORT_ORDER, sortOrderQuery.trim());
    const newURL = `${pathname}?${newParams.toString()}`;
    router.replace(newURL);
  };

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

        <Form action={handleSubmit} className="pb-2">
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
