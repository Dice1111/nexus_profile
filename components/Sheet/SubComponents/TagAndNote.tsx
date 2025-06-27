"use client";

import { startTransition, useActionState, useEffect, useState } from "react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import PillShapeTag from "../../Tag/PillShapeTag";
import { ChevronDownIcon } from "lucide-react";

import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-repository.enum";
import {
  IUpdateTagOrNoteActionState,
  updateTagOrNoteAction,
} from "@/app/(Dashboard)/contact/connection/action";
import { IUpdateTagOrNoteData } from "@/schema/contact/update-contact-or-delete.schema";
import { displayErrorToast } from "@/components/Box/errorToastBox";
import { displaySuccessToast } from "@/components/Box/successToastBox";

interface TagAndNoteProps {
  contactId: number;
  tag: CONTACT_TAG_ENUM;
  note: string | null;
}
const updateTagOrNoteActionState: IUpdateTagOrNoteActionState = {
  success: false,
  message: "",
};

export default function TagAndNote({ contactId, tag, note }: TagAndNoteProps) {
  const tagOptions = Object.values(CONTACT_TAG_ENUM) as CONTACT_TAG_ENUM[];

  const [newTag, setNewTag] = useState<CONTACT_TAG_ENUM>(tag);
  const [newNote, setNewNote] = useState<string>(note || "");
  const [isEditing, setIsEditing] = useState(false);

  const [updateState, updateAction, isPendingUpdate] = useActionState(
    updateTagOrNoteAction,
    updateTagOrNoteActionState
  );

  const [isUpdateActionTriggered, setIsUpdateActionTriggered] = useState(false);

  useEffect(() => {
    if (isUpdateActionTriggered && !isPendingUpdate) {
      if (updateState.success) {
        displaySuccessToast({ message: updateState.message });
      } else if (!updateState.success) {
        displayErrorToast({ message: updateState.message });
      }
      setIsUpdateActionTriggered(false);
    }
  }, [isUpdateActionTriggered, updateState, isPendingUpdate]);

  const handleSave = () => {
    if (contactId) {
      const data: IUpdateTagOrNoteData = { contactId };
      if (newTag !== tag) data.tag = newTag;
      if (newNote !== note) data.note = newNote;

      if (!data.note && !data.tag) {
        return;
      }
      startTransition(() => {
        updateAction(data);
        setIsUpdateActionTriggered(true);
      });
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-4 text-primary-foreground">
        <div className="space-y-2">
          <p className="text-sm">Tag</p>
          <PillShapeTag tag={tag} />
        </div>
        <div className="space-y-2">
          <p className="text-sm">Note</p>
          <p>{note || "No notes available"}</p>
        </div>
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="w-full"
          >
            Edit Tag and Notes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-primary-foreground">Edit Tag</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 w-full justify-between text-primary-foreground"
            >
              <span className="capitalize">{newTag}</span>
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            {tagOptions.map((tagName) => (
              <DropdownMenuItem
                key={tagName}
                onClick={() => setNewTag(tagName)}
                className="capitalize hover:bg-gray-100 cursor-pointer"
              >
                {tagName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <p className="mb-2 text-sm text-primary-foreground">Edit Notes</p>
        <Input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter notes for this contact"
        />
      </div>

      <div className="mt-6 flex gap-4">
        <Button
          variant="outline"
          onClick={() => setIsEditing(false)}
          disabled={isPendingUpdate}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
          disabled={isPendingUpdate}
          className="flex-1"
        >
          {isPendingUpdate ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
