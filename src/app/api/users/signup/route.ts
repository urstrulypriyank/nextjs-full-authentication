import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import { hashedPassword as hash } from "@/helpers/hashedPassword";
import { sendMail } from "@/helpers/sendMail";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = await reqBody;
    // extracting from reqBdoy json
    console.log(reqBody);

    // intial validation don't trust client
    if (!username && !password && !email) {
      console.log("Something went wrong !!");
      return NextResponse.json(
        { error: "something went wrong" },
        { status: 500 }
      );
    }
    // checking if user exist
    const userFromDb = await User.findOne({ email });
    if (userFromDb)
      return NextResponse.json(
        { error: "user already exist please sign in" },
        { status: 500 }
      );

    // hash passwd
    const hashedPassword = await hash(password);

    // create and save user
    console.log("saving user");
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("saved user", savedUser);
    // send the mail to verify the user
    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.redirect(new URL("/"));
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
