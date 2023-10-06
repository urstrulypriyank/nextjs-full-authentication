"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function URLRedirect({
  params,
}: {
  params: { urlSlug: String };
}) {
  const [seconds, setSeconds] = useState(3);
  const router = useRouter();
  const { urlSlug } = params;
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  if (seconds === 0) {
    router.push("/profile");
  }
  return (
    <div className="flex min-h-screen justify-center items-center text-3xl">
      <h2>
        Redirecting to the {urlSlug} within {seconds} s
      </h2>
    </div>
  );
}
