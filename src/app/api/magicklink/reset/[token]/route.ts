import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import {hashedPassword} from "@/helpers/hashedPassword";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { newPassword } = await reqBody;
    const token = await reqBody.token;
    console.log(token);
    const user = await User.findOne({
      forgotPasswordToke: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    const newHashedPassword = await hashedPassword(newPassword);
    user.password = newHashedPassword;
    user.forgotPasswordToke = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.redirect("/login");
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
