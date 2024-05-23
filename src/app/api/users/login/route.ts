import { connect } from "@/database/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("🚀 ~ Log -> file: route.ts:13 -> POST -> password:", password);
    console.log("🚀 ~ Log -> file: route.ts:13 -> POST -> email:", email);

    // Checking user exists
    const user = await User.findOne({ email: email });
    console.log("🚀 ~ Log -> file: route.ts:16 -> POST -> user:", user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // JWT token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    //create JWT token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log("🚀 ~ Log -> file: route.ts:45 -> POST -> error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
