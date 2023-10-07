import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
connect();
export async function GET(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const token = await reqBody.token;
    console.log(token);
    const user = User.findOne({
      verifyToke: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });

    user.isVerified = true;
    user.verifyToke = undefined;
    user.verifyTokenExpiry = undefined;
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
