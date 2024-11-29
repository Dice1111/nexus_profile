  "use client";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
  import { BiSolidShow, BiSolidHide } from "react-icons/bi";

  export default function LoginPage() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
      <div className="flex flex-col h-screen items-center justify-center gap-10 px-4 sm:px-8">
        <h1 className="text-2xl font-bold ">Nexus Nova</h1>
        {/* Main Container */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-24 w-full max-w-4xl">
          {/* Left Section */}
          <div className="bg-primary  w-full sm:w-1/2">

            <h1 className="text-2xl flex flex-col items-center font-bold mb-6">Log in</h1>

            {/* Email Input */}
            <div className="w-full mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-light">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded border"
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
                <Button
                  style={{ backgroundColor: "transparent", border: "none" }}
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-2 top-0 text-sm"
                >
                  {passwordVisible ? <BiSolidHide size={20} /> : <BiSolidShow size={20} />}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={() => router.push("/profile")}
              className="w-full mt-4 border-2 items-center justify-center space-x-2 text-base py-3 font-medium hover:scale-105 transition"
            >
              Login
            </Button>

            {/* Forgot Password */}
            <p className="text-sm mt-4 text-center">
              <a href="#" className="hover:underline">
                Forget Password?
              </a>
            </p>
            
          </div>

          <div className="h-full border">

          </div>

          {/* Right Section */}
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
