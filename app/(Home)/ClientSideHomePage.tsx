"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function ClientSideProfilePage() {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push("/signin")}
        size="lg"
        variant="outline"
      >
        Sign in
      </Button>
      <div className="mt-4">
        <Link href="/signup" className="text-sm text-secondary underline">
          Don’t have an account? <span>Join Now.</span>
        </Link>
      </div>
    </div>
  );
}
