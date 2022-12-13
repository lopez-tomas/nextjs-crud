import { useRouter } from 'next/router';
import Link from 'next/link'

import { IProduct } from 'src/types'
import { FaPen, FaTimes, FaCheck, FaStar, FaTrashAlt } from 'react-icons/fa'

interface Props {
  href: string;
  item: IProduct;
  canDelete?: boolean;
}

const TableButtons: React.FC<Props> = ({ href, item, canDelete = false }) => {
  const router = useRouter()

  const handleClick = () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/products`
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: item.id, active: item.activo == 1 ? 0 : 1 })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        router.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

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
          <button className='mr-1 p-2 bg-blue-color border-[1px] rounded-md hover:bg-blue-2-color'>
            <FaPen />
          </button>
        </Link>

        <button onClick={handleClick} className={`
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

        <button className={`
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
      </div>

      {canDelete
        ?
          <button className='p-2 bg-red-2-color border-[1px] rounded-md'>
            <FaTrashAlt />
          </button>
        : null
      }
    </td>
  )
}

export default TableButtons
