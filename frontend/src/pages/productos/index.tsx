import Link from 'next/link'
import Table from '@/components/Table'
import TableRow from '@/components/Table/Row'
import { IProduct } from '../../types'
import { NextPage } from 'next'
import { FaPlus } from 'react-icons/fa'

interface Props {
  products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
  return (
    <>
      <div className='h-90vh overflow-auto w-full p-4 bg-gray-200'>
        <h1 className='text-md text-gray-700'>
          / <span className='text-2xl'>Productos</span>
        </h1>

        <div className='my-6 px-2 py-4 bg-white-color rounded-md drop-shadow-xl'>
          <Link href='/producto'>
            <button className='
              flex
              items-center
              p-2
              bg-primary-color
              text-white-color
              rounded-md
              hover:bg-tertiary-color
            '>
              <FaPlus className='mr-1' /> Nuevo
            </button>
          </Link>
        </div>

        <div className='bg-white-color rounded-md'>
          {products?.length > 0
              ?
                <Table columns={['COD', 'NOMBRE', 'CATEGORÍA', 'STOCK']}>
                  {products?.map(product => (
                    <TableRow key={product.id} item={product} />
                  ))
                  }
                </Table>
              :
                <h1>No se encontaron registros.</h1>
          }
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL!)
  const data = await res.json()

  return {
    props: {
      products: data.products
    }
  }
}

export default ProductsPage
