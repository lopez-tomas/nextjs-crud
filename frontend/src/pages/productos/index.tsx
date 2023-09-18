import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'cookies'
import { cookies } from 'next/headers'

import { getData } from '@/lib/getData'
import { validateToken, clearToken } from '@/lib/token'
import AppContext from '@/contexts/AppContext'

import Layout from '@/components/Layout'
import PageContainer from '@/containers/PageContainer'
import Button from '@/components/Button'
import Table from '@/components/Table'
import TableRow from '@/components/Table/Row'
import TableCell from '@/components/Table/Cell'
import TableButtons from '@/components/Table/Buttons'

import Modal from '@/components/Modal'

import type { NextPageWithLayout } from '@/pages/_app'
import type { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { AppContextProps, IEditProduct, IProduct, IUserLog } from 'src/types'
import { FaPlus, FaStar } from 'react-icons/fa'
import { requiredAuthentication } from 'src/HOC/requiredAuthentication'

interface Props {
  user: IUserLog;
  products: IProduct[];
}

const ProductsPage: NextPageWithLayout<Props> = ({ user, products }) => {
  const { state, setUser } = useContext<AppContextProps>(AppContext)
  const router = useRouter()
  setUser!(user)

  // useEffect(() => {
  //   if (state?.user === null) {
      // Cookies.remove('jwt', { path: 'http://localhost:3000' })
  //     router.replace('/login')
  //   }
  // }, [state])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [url, setUrl] = useState('')
  const [httpMethod, setHttpMethod] = useState('')
  const [data, setData] = useState<IEditProduct | null>(null)

  return (
    <PageContainer pretitle='/' title='Productos'>
      <div className='my-6 px-2 py-4 bg-white-color rounded-md drop-shadow-xl'>
        <Link href='/producto'>
          <Button text='Nuevo' primary>
            <FaPlus className='mr-1' />
          </Button>
        </Link>
      </div>

      <div className='bg-white-color rounded-md'>
        <Modal
          modalId='edit-modal'
          isOpen={modalOpen}
          handleClose={() => {
            setModalOpen(!modalOpen)
            setModalMessage('')
            setUrl('')
            setHttpMethod('')
            setData(null)
          }}
          modalMessage={modalMessage}
          url={url}
          method={httpMethod}
          data={data}
        />

        <Table columns={['COD', 'NOMBRE', 'CATEGORÍA']} hasButtons>
          {products?.length > 0
            ?
              products?.map(product => (
                <TableRow key={product.id} item={product}>
                  <TableCell value={product.col1 != null ? product.col1 : ''} />
                  <TableCell value={product.nombre}>
                    {product.destacado == 1
                      ? <FaStar className='ml-2 text-yellow-400' />
                      : null
                    }
                  </TableCell>
                  <TableCell value={product.nombre_categoria} />

                  <TableButtons
                    href='/producto'
                    item={product}
                    canDelete
                    handleModal={() => {
                      setModalOpen(!modalOpen)
                      setModalMessage('')
                      setUrl('')
                      setHttpMethod('')
                      setData(null)
                    }}
                    setMessage={setModalMessage}
                    setUrl={setUrl}
                    setMethod={setHttpMethod}
                    setData={setData}
                  />
                </TableRow>
              ))
            :
              <TableRow>
                <TableCell value='No hay productos' />
              </TableRow>
          }
        </Table>
      </div>
    </PageContainer>
  )
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
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

    try {
      const [userError, user] = await getData(req, 'auth/tokenData')
      const [dataError, data] = await getData(req, 'products')

      return {
        props: {
          user: user.data,
          products: data.products
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req, res } = context
//   // const nextCookiesList = cookies()
//   // const hasToken = nextCookiesList.has('jwt')

//   if (context.req.headers.cookie == undefined) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   try {
//     const [tokenError, token] = await validateToken(req, res)

//     if (token.status === 401) {
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false
//         }
//       }
//     }

//     const [dataError, data] = await getData(req, res, 'products')

//     if (data.status === 401) {
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false
//         }
//       }
//     }

//     return {
//       props: {
//         // user: user,
//         products: data.products
//       }
//     }
//   } catch (err) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   // const cookies = new Cookies(req, res)
//   // const token = cookies.get('jwt')

//   // if (token) {
//   //   const [error, user] = await validateToken(req, res)

//   //   if (error) {
//   //     return {
//   //       redirect: {
//   //         destination: '/login',
//   //         permanent: false
//   //       }
//   //     }
//   //   }

   
//   // }

//   // return {
//   //   redirect: {
//   //     destination: '/login',
//   //     permanent: false
//   //   }
//   // }
// }

export default ProductsPage
