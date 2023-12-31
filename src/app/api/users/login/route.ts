import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import bycrptjs from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { sendMail } from "@/helpers/sendMail";
// import ends
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = await reqBody;
    console.log(reqBody);

    // check if user exist
    const user = await User.findOne({ email });

    // does user exist
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credential" },
        { status: 400 }
      );
    }
    // is password correct
    const isPasswordSame = await bycrptjs.compare(password, user.password);
    if (!isPasswordSame) {
      return NextResponse.json(
        {
          error: "Invalid credential",
        },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
    };
    // create a token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    // if is user is not verified
    if (!user.isVerified) {
      sendMail({ email, emailType: "VERIFY", userId: user._id });
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    const res = NextResponse.json({
      message: "Login Sucessfull!",
      success: true,
    });
    res.cookies.set("token", token, {
      httpOnly: true,
    });

    // at last return res
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
}
