"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInData, signInSchema } from "@/schema/user/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { signInUserAction } from "./action";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signInUserAction, {
    success: false,
    message: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/profile");
      toast("Log in Success", {
        duration: 1000,
        style: { backgroundColor: "green" },
      });
    } else {
    }
  }, [state.success, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-primary p-4 sm:p-0">
      <h2 className="mb-6 text-center text-2xl font-bold">Log in</h2>

      <form
        onSubmit={handleSubmit((data) =>
          startTransition(() => formAction(data))
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

        {state.message && (
          <p
            className={`text-center text-sm ${
              state.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}

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
