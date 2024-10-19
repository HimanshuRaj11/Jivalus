import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const UpdatUser = await request.json();
        console.log(UpdatUser);




        return NextResponse.json({ Message: "Success", status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}