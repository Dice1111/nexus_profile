import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-secondarty hover:text-blue-500  text-xl underline"
      >
        Go back to the homepage
      </Link>
    </div>
  );
}
