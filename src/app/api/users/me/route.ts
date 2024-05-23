import { getDataFromToken } from "@/helpers/getUserDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/config";
import User from "@/models/user";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne(
      { _id: userId },
      { password: 0, isAdmin: 0 }
    );

    return NextResponse.json({
      message: "User found",
      data: user,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
