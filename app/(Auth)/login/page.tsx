'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center  text-white">
      {/* Main Container */}
      <div className=" p-8 rounded-lg flex w-[987px] shadow-lg">
        {/* Left Section */}
        <div className="flex-1 pr-8 border-r border-gray-600">
          <h1 className="text-2xl font-bold mb-6">Log in</h1>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-light">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded border  "
            />
          </div>

          {/* Password Input */}
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
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-2 text-sm text-gray-400"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          {/* <Button className="className="w-full mt-4 border-2 items-center justify-center space-x-2 text-base py-5 font-medium">
            Log in
          </Button> */}

          <Button  className="w-full mt-4 border-2 items-center justify-center space-x-2 text-base py-5 font-medium">
             Login
          </Button>

          {/* Forgot Password */}
          <p className="text-sm  mt-4">
            <a href="#" className=" hover:underline">
              Forget Password?
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 pl-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-6 text-center">Nexus Nova</h1>
          <div className="space-y-4  w-full">
            <button className="w-full p-2 flex items-center justify-center gap-2 rounded bg-white text-black hover:bg-gray-200 font-light">
              <FaGoogle />
              Continue with Google
            </button>
            <button className="w-full p-2 flex items-center justify-center gap-2 rounded bg-white text-black hover:bg-gray-200 font-light">
              <FaFacebook />
              Continue with Facebook
            </button>
            <button className="w-full p-2 flex items-center justify-center gap-2 rounded bg-white text-black hover:bg-gray-200 font-light">
              <FaApple />
              Continue with Apple
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-sm text-center w-full">
        Don’t have an account?{" "}
        <a href="#" className="text-blue-400 hover:underline">
          Join Now.
        </a>
      </p>
    </div>
  );
}
