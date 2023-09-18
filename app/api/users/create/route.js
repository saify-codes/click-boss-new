import { createUser } from "@/util/db"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { name, email, password } = await req.json()
    const response = await createUser(name, email, password)
    return NextResponse.json(response)
}