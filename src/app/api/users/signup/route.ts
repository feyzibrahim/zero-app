import { connect } from "@/database/config";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("🚀 ~ Log -> file: route.ts:11 -> POST -> reqBody:", reqBody);
    const { email, password, username } = reqBody;

    // Checking user exists
    const exists = await User.findOne({ email: email });
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("🚀 ~ Log -> file: route.ts:28 -> POST -> user:", user);

    return NextResponse.json({ data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
