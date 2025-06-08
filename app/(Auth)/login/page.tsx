"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { signInUserAction } from "./action";

// Define the Zod schema for validation
// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
// });

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    signInUserAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/profile");
    }
  }, [state.success, router]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   // Validate using Zod
  //   const result = loginSchema.safeParse({ email, password });

  //   if (!result.success) {
  //     const fieldErrors: { email?: string; password?: string } = {};
  //     result.error.errors.forEach((err) => {
  //       if (err.path[0] === "email") fieldErrors.email = err.message;
  //       if (err.path[0] === "password") fieldErrors.password = err.message;
  //     });
  //     setErrors(fieldErrors);
  //     return;
  //   }

  //   setErrors({});
  // };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-10 bg-primary sm:p-4 ">
      <h1 className="text-2xl font-bold">Nexus Nova</h1>
      <div className="flex flex-col sm:flex-row justify-center  gap-10 sm:w-full  ">
        {/* Form Section */}
        <Form
          action={formAction}
          className="bg-primary sm:w-[400px] w-96"
          noValidate
        >
          <h1 className="text-2xl text-center font-bold">Log in</h1>

          {/* Email Input */}
          <div className="w-full mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-light">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full p-2 rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-light">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full p-2 rounded border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center p-0 bg-transparent"
              >
                {passwordVisible ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <Button type="submit" className="h-11" variant={"outline"}>
            {isPending ? "Loading" : "Create account"}
          </Button>

          {state.message && (
            <p
              className={`text-sm ${
                state.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {state.message}
            </p>
          )}

          {/* Forgot Password */}
          <p className="text-sm mt-4 text-center">
            <a href="#" className="hover:underline">
              Forget Password?
            </a>
          </p>
        </Form>

        {/* <div className="h-full border hidden sm:block "></div> */}

        {/* Social Login Section */}
        {/* <div className="bg-primary flex flex-col gap-5 justify-center sm:w-[400px]">
          <Button className="bg-secondary  p-2 flex items-center justify-center rounded text-secondary-foreground hover:bg-gray-200 font-light hover:scale-105 transition">
            <FaGoogle />
            Continue with Google
          </Button>
          <Button className="bg-secondary p-2 flex items-center justify-center gap-2 rounded text-secondary-foreground hover:bg-gray-200 font-light hover:scale-105 transition">
            <FaFacebook />
            Continue with Facebook
          </Button>
          <Button className="bg-secondary  p-2 flex items-center justify-center gap-2 rounded text-secondary-foreground hover:bg-gray-200 font-light hover:scale-105 transition">
            <FaApple />
            Continue with Apple
          </Button>
        </div> */}
      </div>

      {/* Footer */}
      <p className="text-xs text-center">
        Don’t have an account?{" "}
        <Link className="text hover:underline" href="/signup">
          Join Now.
        </Link>
      </p>
    </div>
  );
}
