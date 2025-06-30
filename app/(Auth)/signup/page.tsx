"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { displayErrorToast } from "@/components/Box/errorToastBox";
import { displaySuccessToast } from "@/components/Box/successToastBox";
import { SignUpData, signUpSchema } from "@/schema/user/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signUpUserAction } from "./action";

const page = () => {
  const router = useRouter();
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    signUpUserAction,
    initialState
  );

  const [actionTriggered, setActionTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (actionTriggered) {
      if (state.success) {
        router.push("/signin");
        displaySuccessToast({ message: state.message });
      } else {
        displayErrorToast({ message: state.message });
      }
      setActionTriggered(false);
    }
  }, [state.success, actionTriggered]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  return (
    <div className="bg-secondary flex h-screen justify-center xl:justify-end items-center py-10 px-10 relative">
      <div className="w-full md:max-w-2xl  h-full bg-primary rounded-xl flex flex-col p-10 md:p-30 gap-10 items-center justify-center z-20">
        <div className=" flex flex-col gap-2 w-full">
          <h1 className="text-2xl md:text-3xl font-bold">Create an account</h1>
          <p className="text-xs md:text-sm">
            Let's create your digital business card for free
          </p>
        </div>

        <form
          onSubmit={handleSubmit((data) =>
            startTransition(() => {
              formAction(data);
              setActionTriggered(true);
            })
          )}
          noValidate
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Enter your name"
              type="text"
              id="name"
              {...register("name")}
              className="h-11"
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              placeholder="Enter your email address"
              id="email"
              type="email"
              {...register("email")}
              className="h-11"
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              id="password"
              {...register("password")}
              className="h-11"
              disabled={isPending}
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="h-11" variant={"outline"}>
            {isPending ? "Loading" : "Create account"}
          </Button>

          <Button
            type="button"
            className="h-11"
            variant={"secondary"}
            disabled={isPending}
          >
            <span></span>Sign up with Google
          </Button>
          <Button
            type="button"
            className="h-11"
            variant={"secondary"}
            disabled={isPending}
          >
            <span></span>Sign up with Apple
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link className="text hover:underline" href="/signin">
              Sign in now.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
