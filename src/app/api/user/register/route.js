
import connectDB from "@/lib/db";
import User from "@/lib/models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { username, email, firstName, lastName, password } = await request.json();
        await connectDB()

        const user = await User.findOne({ email })
        // check User is exist or not
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // create user
        const salt = 10;
        const hashPassword = await bcrypt.hashSync(password, salt);
        await User.create({ username, email, firstName, lastName, password: hashPassword }).then((res) => {
            return NextResponse.json({ message: "User Created", res }, { status: 201 })
        })

        //send verification email
        // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({ message: "User Signed In" })
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error })
    }
}

// bcrypt.compareSync("B4c0/\/", hash);