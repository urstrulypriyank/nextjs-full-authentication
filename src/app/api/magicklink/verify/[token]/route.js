import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";

export async function GET(request, context) {
  try {
    // const reqBody = await request.json();
  const { params } = context;

    const token = params.token;
    console.log(token);
    const user = await User.findOne({
      verifyToke: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });

    user.isVerified = true;
    user.verifyToke = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.redirect(new URL("/redirect/profile", request.url));
  } catch (error) {
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
