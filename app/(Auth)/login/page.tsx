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
      <div className="flex flex-col h-screen items-center justify-center px-4 sm:px-8">
        <h1 className="text-2xl font-bold mb-6">Nexus Nova</h1>
        {/* Main Container */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-8 w-full max-w-4xl p-4 ">
          {/* Left Section */}
          <div className="bg-primary p-6  w-full sm:w-1/2 sm:border-r">

            <h1 className="text-2xl font-bold mb-6">Log in</h1>

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
              className="w-full mt-4 border-2 items-center justify-center space-x-2 text-base py-3 font-medium"
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

          {/* Right Section */}
          <div className="flex justify-center p-6 items-center w-full sm:w-1/2">
            <div className="space-y-4 min-w-full sm:min-w-72">
              <Button className="bg-foreground w-full p-2 flex items-center justify-center rounded text-black hover:bg-gray-200 font-light">
                <FaGoogle />
                Continue with Google
              </Button>
              <Button className="bg-foreground w-full p-2 flex items-center justify-center gap-2 rounded text-black hover:bg-gray-200 font-light">
                <FaFacebook />
                Continue with Facebook
              </Button>
              <Button className="bg-foreground w-full p-2 flex items-center justify-center gap-2 rounded text-black hover:bg-gray-200 font-light">
                <FaApple />
                Continue with Apple
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="absolute bottom-6 text-sm text-center w-full">
          Don’t have an account?{" "}
          <Link className="text-blue-400 hover:underline" href="/signup">
            Join Now.
          </Link>
        </p>
      </div>
    );
  }
