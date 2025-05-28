"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import React from "react";

import { submitData } from "./action";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <Form action={submitData} className="max-w-lg flex flex-col gap-4">
      <Label>
        Name
        <Input name="name" />
      </Label>
      <Label>
        Email
        <Input name="email" />
      </Label>
      <Label>
        Password
        <Input name="password" />
      </Label>

      <Button variant={"outline"} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default page;
