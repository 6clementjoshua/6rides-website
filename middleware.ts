import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/internal/outbox")) {
        const res = NextResponse.next();
        res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        res.headers.set("Cache-Control", "no-store");
        return res;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/internal/outbox/:path*"],
};
