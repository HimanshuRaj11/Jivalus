import { NextResponse } from 'next/server'
import { cookies } from "next/headers";

export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = cookies().get("Jivalus_auth_token")?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/',
        "/:username*/edit",
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}