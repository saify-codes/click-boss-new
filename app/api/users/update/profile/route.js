import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { updateName } from "@/util/db";

export async function POST(req) {
    const { name } = await req.json()
    const { user } = await getServerSession()
    await updateName(user.email, name)
    return NextResponse.json({ msg: 'name changed' })
}