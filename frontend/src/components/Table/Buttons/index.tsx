import Link from 'next/link'
import { useRouter } from 'next/router';
import useEditItem from '@/utils/useEditItem'

import { IProduct, IEditProduct } from 'src/types'
import { FaPen, FaTimes, FaCheck, FaStar, FaTrashAlt } from 'react-icons/fa'

interface Props {
  href: string;
  item: IProduct;
  canDelete?: boolean;
}

const TableButtons: React.FC<Props> = ({ href, item, canDelete = false }) => {
  const router = useRouter()

  const handleClick = async (dataProp: keyof IEditProduct, prop: keyof IProduct) => {
    let method = 'PATCH'
    let data: IEditProduct = {
      id: item.id,
      [dataProp]: item[prop] == 1 ? 0 : 1
    }

    const id = await useEditItem('products', method, data)
    if (id) {
      router.reload()
    }
  }

  const handleDelete = async () => {
    const id = await useEditItem(`products/${item.id}`, 'DELETE', { id: item.id })
    if (id) {
      router.reload()
    }
  }

  return (
    <td className={`
      p-2
      text-2xs
      text-right
      text-white-color
    `}>
      <Link href={{
          pathname: `${href}`,
          query: { id: `${item.id}` }
        }}
      >
        <button className='mr-1 p-2 bg-blue-color border-[1px] rounded-md hover:bg-blue-2-color'>
          <FaPen />
        </button>
      </Link>

      <button onClick={() => handleClick('active', 'activo')} className={`
        mr-1
        p-2
        border-[1px]
        rounded-md
        ${item.activo == 1 ? 'bg-red-color hover:bg-red-2-color' : 'bg-green-color'}
      `}>
        {item.activo == 1
          ? <FaTimes />
          : <FaCheck />
        }
      </button>

      {!canDelete &&
        <button onClick={() => handleClick('featured', 'destacado')} className={`
          p-2
          border-[1px]
          text-black-color
          rounded-md
          ${item.destacado == 1
            ?
              'bg-yellow-400 border-transparent hover:bg-transparent hover:border-black-color'
            :
              'bg-transparent border-black-color hover:bg-yellow-400 hover:border-transparent'
          }
        `}>
          <FaStar />
        </button>
      }

      {canDelete &&
        <button onClick={handleDelete} className='p-2 bg-red-2-color border-[1px] rounded-md hover:bg-red-500'>
          <FaTrashAlt />
        </button>
      }
    </td>
  )
}

export default TableButtons
