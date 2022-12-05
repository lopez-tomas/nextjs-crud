import Table from '@/components/Table'
import TableRow from '@/components/Table/Row'
import { FaPlus } from 'react-icons/fa'

const ProductsPage = () => {
  return (
    <>
      <div className='w-full p-4 bg-gray-200'>
        <h1 className='text-md text-gray-700'>
          / <span className='text-2xl'>Productos</span>
        </h1>

        <div className='my-6 px-2 py-4 bg-white-color rounded-md drop-shadow-xl'>
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
        </div>

        <div className='bg-white-color rounded-md'>
          <Table columns={['COD', 'NOMBRE', 'CATEGORÍA', 'STOCK']}>
            <TableRow item={{ cod: 1, name: 'Almendras', category: 'Baldes', quantity: 5 }} />
            <TableRow item={{ cod: 2, name: 'Americana', category: 'Baldes', quantity: 10 }} />
            <TableRow item={{ cod: 3, name: 'Ananá', category: 'Baldes', quantity: 2 }} />
          </Table>
        </div>
      </div>
    </>
  )
}

export default ProductsPage
