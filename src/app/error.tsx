"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface Props {
  text?: string;
}

const ErrorPage = ({ text }: Props) => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 p-4">
      <Alert variant="destructive" className="items-start max-w-md w-full mb-8">
        <AlertTitle className="flex items-center text-lg font-bold">
          Something went wrong {text}
        </AlertTitle>
        <AlertDescription className="mt-2 text-gray-700">
          We couldn't process your request. Please try again or return to the
          dashboard.
        </AlertDescription>
      </Alert>
      <div className="flex gap-2">
        <Button onClick={() => window.location.reload()}>Retry</Button>
        <Link href="/">
          <Button variant="outline">Go to dashboard </Button>
        </Link>
      </div>
      <footer className="mt-12 text-xs text-gray-400">Error code: 500</footer>
    </main>
  );
};

export default ErrorPage;
