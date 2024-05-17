import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/db/db";
import User from "@/db/models/user.model";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const { id } = params;
    const user = await User.findOne({ wallet: id.toLowerCase() });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
