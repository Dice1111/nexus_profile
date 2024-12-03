"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

// Define the Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate using Zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      // Map errors to state
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear errors on successful validation
    setErrors({});
    console.log("Validated Email:", email);
    console.log("Validated Password:", password);

    // Simulate successful login and redirect
    router.push("/profile");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-10 px-4 sm:px-8">
      <h1 className="text-2xl font-bold ">Nexus Nova</h1>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-24 w-full max-w-4xl">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-primary w-full sm:w-1/2" noValidate>
          <h1 className="text-2xl flex flex-col items-center font-bold mb-6">
            Log in
          </h1>

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
              <Button
                style={{ backgroundColor: "transparent", border: "none" }}
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-0 text-sm"
              >
                {passwordVisible ? (
                  <BiSolidHide size={20} />
                ) : (
                  <BiSolidShow size={20} />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full mt-4" variant="outline">
            Login
          </Button>

          {/* Forgot Password */}
          <p className="text-sm mt-4 text-center">
            <a href="#" className="hover:underline">
              Forget Password?
            </a>
          </p>
        </form>

        <div className="h-full border"></div>

        {/* Social Login Section */}
        <div className="bg-primary flex justify-center items-center w-full sm:w-1/2">
          <div className="w-full flex flex-col gap-4">
            <Button className="bg-secondary w-full p-2 flex items-center justify-center rounded text-secondary-foreground hover:bg-gray-200 font-light hover:scale-105 transition">
              <FaGoogle />
              Continue with Google
            </Button>
            <Button className="bg-secondary w-full p-2 flex items-center justify-center gap-2 rounded text-secondary-foreground hover:bg-gray-200 font-light hover:scale-105 transition">
              <FaFacebook />
              Continue with Facebook
            </Button>
            <Button className="bg-secondary w-full p-2 flex items-center justify-center gap-2 rounded text-secondary-foreground hover:bg-gray-200 font-light hover:scale-105 transition">
              <FaApple />
              Continue with Apple
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-center w-full">
        Don’t have an account?{" "}
        <Link className="text hover:underline" href="/signup">
          Join Now.
        </Link>
      </p>
    </div>
  );
}
