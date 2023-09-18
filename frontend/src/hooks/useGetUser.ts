import { useState, useEffect } from 'react'
import { NextRequest, NextResponse } from 'next/server'
import { getData } from '@/lib/getData'
import { IUserLog } from 'src/types'

const useGetUser = () => {
  const [user, setUser] = useState<IUserLog | null>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/auth/tokenData', {
          credentials: 'include',
        })
        const { user: userData } = await response.json()

        setUser(userData)
      } catch (err) {
        setError(err)
      }
    }

    getUser()
  }, [])

  return {
    user,
    error
  }
}

export default useGetUser
