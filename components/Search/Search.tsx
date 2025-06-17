"use client";

import { URL_PAGE, URL_SEARCH } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";

function SearchBase({ initialQuery }: { initialQuery: string }) {
  const [inputValue, setInputValue] = useState(initialQuery);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const query = formData.get(URL_SEARCH) as string;
    setInputValue(query);

    const newParams = new URLSearchParams(searchParams);
    if (query.trim() === "") {
      newParams.delete(URL_SEARCH);
    } else {
      newParams.set(URL_SEARCH, query.trim());
    }
    newParams.delete(URL_PAGE);
    const newURL = `${pathname}?${newParams.toString()}`;
    router.replace(newURL);
  };

  return (
    <Form
      className="flex flex-row items-center justify-between relative w-full md:max-w-md"
      action={handleSubmit}
    >
      <div className="relative w-full">
        <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 h-4 w-4 -translate-y-1/2 " />
        <Input
          name={URL_SEARCH}
          type="text"
          placeholder="Search Contact"
          className="h-12 bg-secondary text-primary px-10"
          defaultValue={inputValue}
        />
        {/* <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {shouldSuspend && <SearchBarLoadingSpinner />}
        </div> */}
      </div>
    </Form>
  );
}

export function SearchFallback() {
  return <SearchBase initialQuery="" />;
}

export default function Search() {
  const query = useSearchParams().get("search") ?? "";
  return <SearchBase initialQuery={query} />;
}
