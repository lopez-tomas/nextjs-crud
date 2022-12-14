import Link from 'next/link'
import PageContainer from '@/containers/PageContainer'
import Button from '@/components/Button'
import Table from '@/components/Table'
import TableRow from '@/components/Table/Row'
import TableCell from '@/components/Table/Cell'

import { IProduct } from 'src/types'
import { NextPage } from 'next'
import { FaPlus, FaStar } from 'react-icons/fa'

interface Props {
  products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
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
        {products?.length > 0
          ?
            <Table columns={['COD', 'NOMBRE', 'CATEGORÍA']} hasButtons>
              {products?.map(product => (
                <TableRow key={product.id} href='/producto' item={product} hasButtons canDelete>
                  <TableCell value={product.col1 != null ? product.col1 : ''} />
                  <TableCell value={product.nombre}>
                    {product.destacado == 1
                      ? <FaStar className='ml-2 text-yellow-400' />
                      : null
                    }
                  </TableCell>
                  <TableCell value={product.nombre_categoria} />
                </TableRow>
              ))
              }
            </Table>
          :
            <h1>No se encontaron registros.</h1>
        }
      </div>
    </PageContainer>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
  const data = await res.json()

  return {
    props: {
      products: data.products
    }
  }
}

export default ProductsPage
