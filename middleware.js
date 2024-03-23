import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about-us",
    "/courses",
    "/register/(.*)",
    "/videos",
    "/sri-paaduka",
    "/sri-upasaka",
    "/contact-us",
    "/quotes",
    "/events",
    "/about-sadhguru",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
