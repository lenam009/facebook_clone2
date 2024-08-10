// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     // if (request.nextUrl.pathname.startsWith('/home')) {
//     //     return NextResponse.redirect(new URL('/', request.url));
//     // }

//     // const token = await getToken({ req });
//     // const isAuthenticated = !!token;

//     const isAdmin = true;
//     const isAuthentication = true;

//     if (!isAuthentication) {
//         if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/admin') {
//             return NextResponse.redirect(new URL('/login', request.url));
//         }
//     } else {
//         if (isAdmin && ['/', '/login'].includes(request.nextUrl.pathname)) {
//             return NextResponse.redirect(new URL('/admin', request.url));
//         } else if (!isAdmin && ['/admin', '/login'].includes(request.nextUrl.pathname)) {
//             return NextResponse.redirect(new URL('/', request.url));
//         }
//     }

//     // //  @ts-expect-error
//     return NextResponse.next();
// }

//..........................................................................

import { withAuth } from 'next-auth/middleware';

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: '/login',
    },
});

export const config = { matcher: ['/profile', '/profile/:slug', '/'] };
