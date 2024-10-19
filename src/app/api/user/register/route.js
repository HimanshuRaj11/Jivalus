
import connectDB from "@/lib/db";
import User from "@/lib/models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { registerData } = await request.json();
        console.log(registerData);

        const { username, email, firstName, lastName, password } = registerData
        await connectDB()

        const user = await User.findOne({ email })
        // check User is exist or not
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // create user
        const salt = 10;
        const hashPassword = await bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, email, firstName, lastName, password: hashPassword })

        const tokenData = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET)
        console.log(token);

        cookies().set("Jivalus_auth_token", token, { httpOnly: true })

        //send verification email
        // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({ message: `Hii! ${firstName}, Wellcome to JIVALUS` })
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error })
    }
}

// bcrypt.compareSync("B4c0/\/", hash);