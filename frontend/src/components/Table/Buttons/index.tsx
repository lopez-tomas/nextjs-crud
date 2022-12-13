import Link from 'next/link'
import { IProduct } from 'src/types'
import { FaPen, FaTimes, FaCheck, FaTrashAlt } from 'react-icons/fa'

interface Props {
  href: string;
  item: IProduct;
  canDelete?: boolean;
}

const TableButtons: React.FC<Props> = ({ href, item, canDelete = false }) => {
  return (
    <td className={`
      ${canDelete ? 'flex justify-between' : ''}
      p-2
      text-center
      text-2xs
      text-white-color
    `}>
      <div>
        <Link href={{
            pathname: `${href}`,
            query: { id: `${item.id}` }
          }}
        >
          <button className='mr-1 p-2 bg-blue-color rounded-md hover:bg-blue-2-color'>
            <FaPen />
          </button>
        </Link>
        <button className={`
          p-2
          rounded-md
          ${item.activo == 1 ? 'bg-red-color hover:bg-red-2-color' : 'bg-green-color'}
        `}>
          {item.activo == 1
            ? <FaTimes />
            : <FaCheck />
          }
        </button>
      </div>

      {canDelete
        ?
          <button className='p-2 bg-red-2-color rounded-md'>
            <FaTrashAlt />
          </button>
        : null
      }
    </td>
  )
}

export default TableButtons
