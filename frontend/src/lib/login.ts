import { BACKEND_URL, headers, credentials } from '@/lib/index'

export const login = async <T>(
  payload: any
) => {
  try {
    const request = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: headers,
      credentials: credentials,
      body: JSON.stringify(payload)
    })
    const data = await request.json()

    return [null, data.user]
  } catch (error) {
    return [error, null]
  }
}