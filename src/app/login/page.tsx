"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

// END OF IMPORTS
export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsBtnDisabled(false);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success!");
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed!", error.message);
      toast.error(error.message);
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <h2 className="text-3xl font-bold my-2">Login</h2>
      <form className="flex flex-col space-y-2 [&>*]:flex [&>*]:flex-col md:w-[40vw]  [&>label]:[&>div]:font-bold  [&>input]:[&>div]:rounded-md md:[&>label]:[&>div]:text-center md:space-y-4 [&>input]:[&>div]:text-black  [&>input]:[&>div]:px-4  [&>input]:[&>div]:p-2  [&>input]:[&>div]:outline-none">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            placeholder="Ex: mymail@abc.com"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          ></input>
        </div>

        <button
          className={`bg-blue-700 p-2 px-4 rounded-md disabled ${
            isBtnDisabled ? "opacity-40" : ""
          }`}
          onClick={() => {
            onLogin();
          }}
          disabled={isBtnDisabled}
        >
          Login
        </button>
        <span className="text-center mt-28 py-5 underline">
          <Link href="/signup">Visit Login Page </Link>
        </span>
      </form>
    </div>
  );
}
