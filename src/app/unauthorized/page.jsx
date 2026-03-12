import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">401 - Unauthorized</h1>
      <p className="mb-4">You don't have permission to access this page.</p>
      <Link href="/" className="text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
}