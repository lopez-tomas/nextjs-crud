import Cookies from 'cookies'

import { clearToken, validateToken } from '@/lib/token'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ServerResponse } from 'http'
import type { NextURL } from 'next/dist/server/web/next-url'
import { IncomingMessageWithCookies } from 'src/types'

export default async function middleware(req: any, res: ServerResponse) {
  // const cookies = new Cookies(req as IncomingMessageWithCookies, res)
  const token = req.cookies.get('jwt')
  // const url: NextURL = (req as NextRequest).nextUrl.clone()

  if (token === undefined) {
    return NextResponse.redirect(new URL('/login'), req.url)
  }

  // if (token === undefined) return NextResponse.redirect(new URL('/login'), req.url)

  if (token) {
    if (req.nextUrl.pathname.includes('/login')) {
      try {
        await validateToken(req as IncomingMessageWithCookies, res)
        return NextResponse.redirect(new URL('/'), req.url)
      } catch (err) {
        return NextResponse.next()
      }
    }
  }
  // if (url.pathname == '/login') {
  //   if (token) {
      // await clearToken(req as IncomingMessageWithCookies, res)

      // try {
      //   await validateToken(req as IncomingMessageWithCookies, res)

      //   url.pathname = '/'
      //   return NextResponse.redirect(url)
      // } catch (err) {
      //   url.pathname = '/login'
      //   return NextResponse.redirect(url)
        // return NextResponse.next()
      // }
      // return NextResponse.next()
    // }

  //   return NextResponse.next()
  // }

  try {
    await validateToken(req as IncomingMessageWithCookies, res)

    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL('/login'), req.url)
  }

  // if (
  //   url.pathname == '/' ||
  //   url.pathname == '/productos' ||
  //   url.pathname == '/producto'
  // ) {
  //   if (token === undefined) {
  //     url.pathname = '/login'
  //     return NextResponse.redirect(url)
  //   }

  //   try {
  //     await validateToken(req as IncomingMessageWithCookies, res)

  //     return NextResponse.next()
  //   } catch (err) {
  //     url.pathname = '/login'
  //     return NextResponse.redirect(url)
  //   }
  // }

  // return NextResponse.next()
}

export const config = {
  matcher: [
    // '/',
    // '/productos/:path*',
    // '/login'
  ]
}