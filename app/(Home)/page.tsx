"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-primary text flex justify-center items-center">
      <div className="max-w-4xl flex flex-col md:flex-row items-center gap-10">
        {/* Left Section */}
        <div className="text-center md:text-left  w-full">
          <h1 className="text-5xl font-bold tracking-tight">
            Nexus 
            <br />
            Nova
            
          </h1>
          <p className="mt-4 text-lg text">
            Customize colors, patterns, and layouts to create a design that
            truly represents your unique style or brand!
          </p>
          <div className="mt-6 space-x-4 ">
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
             className="flex items-center justify-center rounded-md mb-4"
            >
              Sign in
            </Button>
            <a href="#" className="text-sm text-secondary ">
              Don’t have an account?{" "}
              <span className="text-pr hover:underline">Join Now.</span>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 bg-red-300">
          <div className="relative">
            <Image
              src="/image/card3.jpg"
              width={500}
              height={500}
              alt="Uploaded image"
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          <div className="flex flex-col gap-4 bg-red-300">
          <div className="relative">
            <Image
              src="/image/card5.jpg"
              width={500}
              height={500}
              alt="Uploaded image"
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          

        </div>
      </div>
    </div>

    </div>
  );
}
