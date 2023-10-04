import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { username, password, email } = reqBody;
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
    const userFromDb = User.findOne({ email });
    if (userFromDb)
      return NextResponse.json(
        { error: "user already exist please sign in" },
        { status: 500 }
      );

    // hash passwd
    const salt = await bcryptjs.gensalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // create and save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("saved user", savedUser);
    return NextResponse.json({
      message: "user created sucessfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}