"use client";

import { useState } from "react";

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
import { CONTACT_TAG_TYPE } from "@prisma/client";

interface TagAndNoteProps {
  tag: CONTACT_TAG_TYPE;
  note: string | null;
  onSaveChanges: (updatedTag: CONTACT_TAG_TYPE, updatedNote: string) => void;
}

export default function TagAndNote({
  tag,
  note,
  onSaveChanges,
}: TagAndNoteProps) {
  const tagOptions = Object.values(CONTACT_TAG_TYPE) as CONTACT_TAG_TYPE[];

  const [newTag, setNewTag] = useState<CONTACT_TAG_TYPE>(tag);
  const [newNote, setNewNote] = useState<string>(note || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSaveChanges(newTag, newNote);
    setIsEditing(false);
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
          className="flex-1"
        >
          Cancel
        </Button>
        <Button variant="outline" onClick={handleSave} className="flex-1">
          Save
        </Button>
      </div>
    </div>
  );
}
