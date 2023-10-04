"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
// END OF IMPORTS
export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

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

        <button className="bg-blue-700 p-2 px-4 rounded-md ">Login</button>
        <span className="text-center mt-28 py-5 underline">
          <Link href="/signup">Visit Login Page </Link>
        </span>
      </form>
    </div>
  );
}
