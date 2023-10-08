"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  return (
    <div className="flex min-h-screen justify-center items-center w-[50vw] flex-col mx-auto space-y-3 text-xl [&>*]:w-[70%] ">
      <h1 className="text-2xl my-8 text-center underline">
        Forgot Your Pasword
      </h1>
      <h2 className="text-2xl my-8 text-center">Email</h2>
      <div className="[&>*]:flex [&>*]:flex-row items-center [&>*]:w-full [&>*]:py-4 mb-10">
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Ex: mymail@abc.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="outline-none rounded-md flex"
        ></input>
      </div>

      <button
        className={`bg-blue-700 p-2 px-4 rounded-md disabled ${
          isBtnDisabled ? "opacity-40" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
        }}
        disabled={isBtnDisabled}
      >
        Next
      </button>
    </div>
  );
}
