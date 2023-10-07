"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Page() {
  const [res, setRes] = useState({
    success: false,
  });
  const router = useRouter();
  useEffect(() => {
    let fetchData = async () => {
      const response: any = await axios.get("/api/users/logout");
      setRes(response);
      router.push("/redirect/login");
    };
    fetchData();
  }, []);
  if (res?.success)
    return (
      <div className="flex min-h-screen text-3xl justify-center items-center">
        Loging you out...
      </div>
    );
  return (
    <div className="flex min-h-screen text-3xl justify-center items-center">
      LogOut SuccessFully
    </div>
  );
}
