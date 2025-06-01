// app/register/page.tsx (or wherever your page is)

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useActionState } from "react";
import { submitData } from "./action"; // server action
import Form from "next/form";

const initialState = {
  success: false,
  message: "",
};

export default function Page() {
  const [state, formAction, isPending] = useActionState(
    submitData,
    initialState
  );

  return (
    <Form action={formAction} className="max-w-lg flex flex-col gap-4">
      <Label>
        Name
        <Input name="name" />
      </Label>
      <Label>
        Email
        <Input name="email" type="email" />
      </Label>
      <Label>
        Password
        <Input name="password" type="password" />
      </Label>

      <Button variant="outline" type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </Button>

      {state?.message && <p>{state.message}</p>}
    </Form>
  );
}
