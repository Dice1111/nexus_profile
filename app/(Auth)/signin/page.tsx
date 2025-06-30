"use client";

import { displayErrorToast } from "@/components/Box/errorToastBox";
import { displaySuccessToast } from "@/components/Box/successToastBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInData, signInSchema } from "@/schema/user/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signInUserAction } from "./action";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signInUserAction, {
    success: false,
    message: "",
  });

  const [actionTriggered, setActionTriggered] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (actionTriggered) {
      if (state.success) {
        router.push("/profile");
        displaySuccessToast({ message: state.message });
      } else {
        displayErrorToast({ message: state.message });
      }
      setActionTriggered(false);
    }
  }, [state.success, actionTriggered]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-primary p-4 sm:p-0">
      <h2 className="mb-6 text-center text-2xl font-bold">Log in</h2>

      <form
        onSubmit={handleSubmit((data) =>
          startTransition(() => {
            formAction(data);
            setActionTriggered(true);
          })
        )}
        noValidate
        className="w-full max-w-sm bg-primary flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            {...register("email")}
            className="h-11"
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
            className="h-11"
            disabled={isPending}
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          variant="outline"
          className="h-11 w-full"
        >
          {isPending ? "Loading..." : "Log in"}
        </Button>

        <div className="flex flex-col gap-2">
          <p className="text-center text-sm">
            <Link href="#" className="hover:underline">
              Forgot Password?
            </Link>
          </p>
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="hover:underline">
              Join Now.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
