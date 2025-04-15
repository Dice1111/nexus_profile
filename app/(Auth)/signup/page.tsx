"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { z } from "zod";

// Zod schema for validation
const signUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(30, "Username cannot exceed 30 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/\d/, "Password must include at least one number")
    .regex(/[@$!%*?&]/, "Password must include at least one special character"),
});

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate form data with Zod
    const result = signUpSchema.safeParse({ username, email, password });

    if (!result.success) {
      const fieldErrors: {
        username?: string;
        email?: string;
        password?: string;
      } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "username") fieldErrors.username = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password" && !fieldErrors.password) {
          fieldErrors.password = err.message; // Capture only the first password error
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Clear errors and proceed
    setErrors({});
    console.log("Validated data:", { username, email, password });
    alert("Account created successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text px-4">
      <div className="w-full max-w-sm p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Create an account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-light">
              What should we call you?
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              className={`w-full ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-light">
              What is your email?
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              className={`w-full ${
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
                className={`w-full ${
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
            <p className="text-sm my-2 ">
              Please include one uppercase letter, one number and one special
              character.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-4 border-2 items-center justify-center space-x-2 text-base py-5 font-medium"
          >
            Create an account
          </Button>
        </form>

        {/* <div className="flex items-center justify-center space-x-2 text-lg">
          <span>OR Continue with</span>
        </div> */}

        {/* Social Login Buttons */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="bg-foreground flex items-center justify-center w-full space-x-2 text-primary p-4y hover:scale-105 transition"
          >
            <FaFacebook />
            <span>Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="bg-foreground flex items-center justify-center w-full space-x-2 text-primary hover:scale-105 transition"
          >
            <FaGoogle />
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            className="bg-foreground flex items-center justify-center w-full space-x-2 text-primary hover:scale-105 transition"
          >
            <FaApple />
            <span>Apple</span>
          </Button>
        </div> */}

        <p className="text-center text-sm">
          Already Have an Account?{" "}
          <a href="/login" className="hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
