import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const getDataFromToken = async () => {
    try {

        const token = cookies().get("Jivalus_auth_token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decodedToken) return
        return decodedToken.id;
    } catch (error) {
        return ("User not LogedIn");
    }

}