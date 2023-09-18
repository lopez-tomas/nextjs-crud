import { useContext, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// import Cookies from 'js-cookie'
import Cookies from 'cookies'
// import jwt from 'jsonwebtoken'

import { login } from "@/lib/login"

import AppContext from '@/contexts/AppContext'
import LoginLayout from '@/components/LoginLayout'
import FormInput from '@/components/Form/Input'
import Button from '@/components/Button'

import type { NextPageWithLayout } from '@/pages/_app'
import { AppContextProps } from 'src/types'
import type { ReactElement } from 'react'
import { GetServerSideProps } from 'next'

import useGetUser from '@/hooks/useGetUser'
import { getData } from '@/lib/getData'

const LoginPage: NextPageWithLayout = ({ user }: any) => {
  const { state, setUser } = useContext<AppContextProps>(AppContext)
  const [error, setError] = useState<string | null>(null)
  setUser!(user)

  const formRef = useRef(null)
  const router = useRouter()

  // if (user) {
  //   setUser!(user)
  // }

  // useEffect(() => {
    // if (state?.user != null) {
    //   setUser!(useGetUser())
      // router.replace('/')
    // }

    // if (state?.user === null) {
    // Cookies.remove('jwt')
    // }
  // }, [state])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      id: { value: number };
      username: { value: string };
      password: { value: string };
    }

    const data: { username: string, password: string } = {
      username: target.username.value,
      password: target.password.value
    }

    const [loginError, user] = await login(data)
    if (loginError) {
      setError('Usuario y/o contraseña incorrecto.')
    }

    if (!loginError && user) {
      setUser!(user)
      router.push('/')
    }
  }

  return (
    <div className='flex flex-col h-[300px] w-[500px] rounded-md bg-white-color'>
      <h1 className='justify-self-center self-center p-2 text-3xl text-black-color'>Iniciar sesión</h1>

      <Link href='/'>Go Home</Link>

      <form
        ref={formRef}
        onSubmit={e => handleSubmit(e)}
        className='flex flex-col justify-center items-center text-black-color'
      >
        <div className='flex w-[80%]'>
          <label htmlFor='username'>Usuario</label>
          <FormInput type='email' name='username' value='' required />
        </div>

        <div className='flex w-[80%]'>
          <label htmlFor='password'>Contraseña</label>
          <FormInput type='password' name='password' value='' required />
        </div>

        <Button text='Iniciar sesión' submit primary />
      </form>
      {error
        ?
          <div>
            <p>{error}</p>
          </div>
        : null
      }
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context

  const cookies = new Cookies(req, res)
  const token = cookies.get('jwt')

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  try {
    // const user = useGetUser()
    const [userError, user] = await getData(req, 'auth/tokenData')
    // const user = jwt.verify(token, `${process.env.NEXT_PUBLIC_SECRET_KEY}`)

    return {
      props: {
        user: user.data
      }
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
}

export default LoginPage
