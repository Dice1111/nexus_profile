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
import { ALL_CARDS, URL_CARD_ID } from "@/lib/utils";
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

  // What should the Select show initially?
  const initialValue = currentCardId ?? ALL_CARDS;

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
          <SelectItem value={ALL_CARDS}>All Cards</SelectItem>
          {cardOptions.map((card) => (
            <SelectItem key={card.id} value={card.id}>
              {card.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
