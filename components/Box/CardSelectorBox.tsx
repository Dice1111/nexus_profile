"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardWithTitleAndID } from "@/core/_domain/types/card-repository.types";
import { URL_CARD_ID } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface CardSelectorBoxProps {
  data: CardWithTitleAndID[];
}

export function CardSelectorBox({ data }: CardSelectorBoxProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCardId = searchParams.get(URL_CARD_ID) ?? undefined;
  const firstCardId = data.length > 0 ? data[0].id : undefined;

  // What should the Select show initially?
  const initialValue = currentCardId ?? firstCardId;

  const cardOptions = useMemo(
    () => data.map((card) => ({ id: card.id, title: card.title })),
    [data]
  );

  const handleChangeCard = (id: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(URL_CARD_ID, id);
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Select defaultValue={initialValue} onValueChange={handleChangeCard}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a card" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cards</SelectLabel>
          {cardOptions.map((card) => (
            <SelectItem key={card.id} value={card.id}>
              {card.title}
            </SelectItem>
          ))}
          <SelectItem value={"a0d1a8d4-2d9a-4618-b096-05a418a9cf42"}>
            apple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
