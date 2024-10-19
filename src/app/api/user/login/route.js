import User from "@/lib/models/user.model.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { cookies } from "next/headers";


export async function POST(request, response) {
    try {
        connectDB()

        const reqBody = await request.json()
        const { username, password } = reqBody.loginData;

        if (!username || !password) {
            return NextResponse.json({ message: "Please fill the credentials!", error: true })
        }
        //check if user exists
        const user = await User.findOne({ username })

        if (!user) {
            return NextResponse.json({ message: "Invalid Cridentials!", error: true }, { status: 400 })
        }

        //check if password is correct
        const validPassword = await bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid Cridentials!", error: true }, { status: 400 })
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET)



        cookies().set("Jivalus_auth_token", token, { httpOnly: true })

        return NextResponse.json({ message: "Login Successfull", success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message, error: true }, { status: 500 })
    }
}