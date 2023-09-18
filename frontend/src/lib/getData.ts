import Cookies from 'cookies'
import { IncomingMessage, ServerResponse } from 'http'
import { BACKEND_URL, headers, credentials } from '@/lib/index'

export const getData = async <T>(
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string;}>},
  endpoint: string,
  res?: ServerResponse,
  payload?: any
) => {
  const url = payload
    ? `${BACKEND_URL}/${endpoint}?${new URLSearchParams(payload)}`
    : `${BACKEND_URL}/${endpoint}`

  try {
    const request = await fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
        Cookies: req.cookies.jwt ? req.cookies.jwt : ''
      },
      credentials: credentials,
    })
    const data = await request.json()

    return [null, data]
  } catch (error) {
    return [error, null]
  }
}