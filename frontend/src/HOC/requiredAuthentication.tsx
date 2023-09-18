import Cookies from 'cookies'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { validateToken } from '@/lib/token';

export function requiredAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx

    const cookies = new Cookies(req, res)
    const token = cookies.get('jwt')

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    } else {
      try {
        await validateToken(req, res)
      } catch (err) {
        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        }
      }
    }

    return await gssp(ctx)
  }
}