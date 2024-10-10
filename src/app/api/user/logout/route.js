import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(response) {
    try {
        await cookies().delete("Jivalus_auth_token");
        return NextResponse.json({ message: "logout Success", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}