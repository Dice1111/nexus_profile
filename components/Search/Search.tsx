"use client";

import { useBackpressure } from "@/lib/custom_hooks/use-backpressure";
import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SearchBarLoadingSpinner from "../Loading/SearchBarLoadingSpinner";
import { Input } from "../ui/input";
import { URL_SEARCH, URL_PAGE } from "@/lib/url-state";

function SearchBase({ initialQuery }: { initialQuery: string }) {
  const [inputValue, setInputValue] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { triggerUpdate, formRef, shouldSuspend } = useBackpressure();

  const handleSubmit = async (formData: FormData) => {
    const query = formData.get(URL_SEARCH) as string;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SEARCH, query.trim());
    newParams.delete(URL_PAGE);
    const newURL = `${pathname}?${newParams.toString()}`;
    await triggerUpdate(newURL);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, []);

  return (
    <Form
      ref={formRef}
      className="flex flex-row items-center justify-between relative w-full md:max-w-md"
      action={handleSubmit}
    >
      <div className="relative w-full">
        <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 h-4 w-4 -translate-y-1/2 " />
        <Input
          name={URL_SEARCH}
          ref={inputRef}
          onChange={handleInputChange}
          type="text"
          id={URL_SEARCH}
          value={inputValue}
          placeholder="Search Contact"
          className="h-12 bg-secondary text-primary px-10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {shouldSuspend && <SearchBarLoadingSpinner />}
        </div>
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
