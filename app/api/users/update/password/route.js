import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { updatePassword, userExistsWithEmailPass } from "@/util/db";

export async function POST(req) {
    const { currentPassword, newPassword } = await req.json()
    const { user: { email } } = await getServerSession()
    const isMatched = await userExistsWithEmailPass(email, currentPassword)
    let msg = ""
    let status = false
    if (isMatched) {
        msg = "password updated"
        status = true
        updatePassword(email, newPassword)
    } else msg = "password invalid"
    return NextResponse.json({ status, msg })
}