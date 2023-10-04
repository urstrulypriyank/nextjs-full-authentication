"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
// END OF IMPORTS

const SignUpForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [confirmPasswd, setConfirmPasswd] = useState("");
  const [isBtnDisabale, setIsBtnDisable] = useState(true);
  const onSignUp = async () => {};

  useEffect(() => {
    if (
      user.email.length &&
      user.username.length &&
      user.password.length &&
      user.password === confirmPasswd
    )
      setIsBtnDisable(false);
    else setIsBtnDisable(true);
  }, [user, confirmPasswd]);

  return (
    <form className="flex flex-col space-y-2 [&>*]:flex [&>*]:flex-col md:w-[40vw]  [&>label]:[&>div]:font-bold  [&>input]:[&>div]:rounded-md md:[&>label]:[&>div]:text-center md:space-y-4 [&>input]:[&>div]:text-black  [&>input]:[&>div]:px-2  [&>input]:[&>div]:p-2  [&>input]:[&>div]:outline-none">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          placeholder="Ex: Priyank"
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        ></input>
      </div>
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
      <div>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          id="confirmpassword"
          value={confirmPasswd}
          onChange={(e) => {
            setConfirmPasswd(e.target.value);
          }}
        ></input>
      </div>

      <button
        className={`bg-blue-700 p-2 px-4 rounded-md disabled ${
          isBtnDisabale ? "opacity-40" : ""
        }`}
        disabled={isBtnDisabale}
      >
        SignUp
      </button>

      <span className="text-center mt-28 py-5 underline">
        <Link href="/login">Visit Signup Page</Link>
      </span>
    </form>
  );
};

export default SignUpForm;
