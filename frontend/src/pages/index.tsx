import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'cookies'
// import jwt from 'jsonwebtoken'

import AppContext from '@/contexts/AppContext'

import PageContainer from "@/containers/PageContainer"
import Layout from "@/components/Layout"

import type { ReactElement } from 'react'
import { AppContextProps } from 'src/types'
import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps } from 'next'
import { validateToken } from '@/lib/token'
import { requiredAuthentication } from 'src/HOC/requiredAuthentication'

import useGetUser from '@/hooks/useGetUser'
import { getData } from '@/lib/getData'

const Home: NextPageWithLayout = ({ user }: any) => {
  const { state, setUser } = useContext<AppContextProps>(AppContext)
  // const { userData, userError }: any = useGetUser()
  const router = useRouter()
  setUser!(user)

  // if (user) {
  //   setUser!(user)
  // }

  useEffect(() => {
    if (state?.user === null) {
      setUser!(user)
      // Cookies.remove('jwt', { path: 'http://localhost:3000' })
      // router.replace('/login')
    }
    router.refresh()
  }, [state])

  // console.log(state)

  return (
    <PageContainer pretitle='>' title={`${state?.user?.username}`} />
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = requiredAuthentication(
  async (_ctx) => {
    const { req, res } = _ctx
    const cookies = new Cookies(req, res)
    const token = cookies.get('jwt')

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    // const [dataError, data] = await getData(req, res, 'products')
    try {
      const [userError, user] = await getData(req, 'auth/tokenData')

      return {
        props: {
          user: user.data
        }
      }
    } catch {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  }
)

    // const [dataError, data] = await getData(req, res, 'products')

    // if (dataError) {
    //   return {
    //     props: {
    //       // user: user,
    //       products: []
    //     }
    //   }
    // }

    // return {
    //   props: {
    //     // user: user,
    //     products: data.products
    //   }
    // }
  // }

  // return {
    // statusCode: 200,
  //   redirect: {
  //     destination: '/',
  //     permanent: false
  //   }
  // }
// }

export default Home
