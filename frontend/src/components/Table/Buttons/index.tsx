import Link from 'next/link'
import { IProduct } from 'src/types'
import { FaPen, FaTrashAlt } from 'react-icons/fa'

interface Props {
  href: string;
  itemId: IProduct['id'];
}

const TableButtons: React.FC<Props> = ({ href, itemId }) => {
  return (
    <td className='p-2 text-center text-2xs text-white-color'>
      <Link href={{
          pathname: `${href}`,
          query: { id: `${itemId}` }
        }}
      >
        <button className='mr-1 p-2 bg-blue-color rounded-md hover:bg-blue-2-color'>
          <FaPen />
        </button>
      </Link>
      <button className='p-2 bg-red-color rounded-md hover:bg-red-2-color'>
        <FaTrashAlt />
      </button>
    </td>
  )
}

export default TableButtons
