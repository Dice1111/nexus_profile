// pages/register.js
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useState } from "react";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text px-4">
      <div className="w-full max-w-sm p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Create an account
        </h1>
        <form className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-light">
              What should we call you?
            </label>
            <Input id="username" type="text" className="w-full" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-light">
              What is your email?
            </label>
            <Input id="email" type="email" className="w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-light">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
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
            <p className="text-[10px] my-2 ">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </p>
          </div>
          <Button
            type="submit"
            className="w-full mt-4 border-2 items-center justify-center space-x-2 text-base py-5 font-medium"
          >
            Create an account
          </Button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-lg">
          <span>OR Continue with</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="bg-foreground flex items-center justify-center w-full space-x-2 text-primary p-4 "
          >
            <FaFacebook />
            <span>Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="bg-foreground flex items-center justify-center w-full space-x-2 text-primary"
          >
            <FaGoogle />
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            className="bg-foreground flex items-center justify-center w-full space-x-2 text-primary"
          >
            <FaApple />
            <span>Apple</span>
          </Button>
        </div>

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
