import Image from "next/image";
import ClientSideProfilePage from "./ClientSideHomePage";
import TopCard from "@/public/image/card3.jpg";
import BottomCard from "@/public/image/card5.jpg";
import Logo from "@/public/image/logo-removebg-preview.svg";
import { signInController } from "@/core/_controllers/user/sign-in.controller";

export default async function Home() {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground flex justify-center items-center px-4">
      <div className="flex flex-col items-center md:flex-row gap-8 md:gap-10">
        {/* Left Section */}
        <div className="max-w-md text-center md:text-left flex flex-col gap-6">
          <div className="flex items-center justify-center md:justify-start">
            <div className="w-20 h-14 relative ">
              <Image
                src={Logo}
                alt="Uploaded image"
                className="object-contain"
                fill // Dynamically fills the parent container
                priority
              />
            </div>
          </div>

          <h1 className="text-6xl font-bold ">
            Nexus
            <br />
            Nova.
          </h1>
          <p className="text-sm md:text-lg">
            Customize colors, patterns, and layouts to create a design that
            truly represents your unique style or brand!
          </p>

          {/* Call-to-action button */}
          <ClientSideProfilePage />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 items-center ">
          {/* Top Image */}
          <div className="w-60 h-64  relative">
            <Image
              src={TopCard}
              alt="Uploaded image"
              className="object-cover border border-primary rounded-xl transition-transform duration-300 hover:scale-105"
              fill // Dynamically fills the parent container
              priority
            />
          </div>

          {/* Bottom Image */}
          <div className="w-60 h-64  relative">
            <Image
              src={BottomCard}
              alt="Uploaded image"
              className="object-cover scale-100 border border-primary rounded-xl transition-transform duration-300 hover:scale-105"
              fill // Dynamically fills the parent container
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
