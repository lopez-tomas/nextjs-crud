import { getData } from '@/lib/getData'

import type { NextResponse } from 'next/server'
import { IncomingMessage, ServerResponse } from 'http'
import { IncomingMessageWithCookies } from 'src/types'

export const validateToken = async <T>(
  req: NextResponse | IncomingMessageWithCookies,
  res: ServerResponse,
) => {
  const [error, data] = await getData(req as IncomingMessageWithCookies, '/auth/validateToken')

  return [error, data]
}

export const clearToken = async <T>(
  req: NextResponse | IncomingMessageWithCookies,
  res: ServerResponse,
) => {
  const [error, data] = await getData(req as IncomingMessageWithCookies, '/auth/logout')

  return [error, data]
}