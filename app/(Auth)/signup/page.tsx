// pages/register.js
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";

export default function Register() {
  return (
    <div className="flex h-screen items-center justify-center bg-primary text-white">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create an account</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              What should we call you?
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full border border-2 focus:outline-none focus:ring-0 "
              />
          </div>
          <div>
          <label htmlFor="email" className="block text-sm font-medium">
              What's your email?
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full border-2 border-white focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Create a password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full"
            />
            <p className="text-xs text-gray-400 mt-1">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </p>
          </div>
          <Button type="submit" className="w-full mt-4">
            Create an account
          </Button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <span className="block h-px w-16 bg-gray-600"></span>
          <span>OR Continue with</span>
          <span className="block h-px w-16 bg-gray-600"></span>
        </div>

        <div className="flex justify-between space-x-4">
          <Button
            variant="outline"
            className="flex items-center justify-center w-full space-x-2"
          >
            <FaFacebook />
            <span>Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center w-full space-x-2"
          >
            <FaGoogle />
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center w-full space-x-2"
          >
            <FaApple />
            <span>Apple</span>
          </Button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Already Have an Account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
