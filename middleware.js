export { default } from "next-auth/middleware"
export const config = {
    matcher: ["/",
        "/chat",
        "/profile",
        "/instruction",
        "/users",
    ]
}