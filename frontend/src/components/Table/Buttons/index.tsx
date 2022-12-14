import Link from 'next/link'

import { IProduct, IEditProduct } from 'src/types'
import { FaPen, FaTimes, FaCheck, FaStar, FaTrashAlt } from 'react-icons/fa'

interface Props {
  href: string;
  item: IProduct;
  canDelete?: boolean;
  handleModal: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<IEditProduct | null>>;
}

const TableButtons: React.FC<Props> = ({
  href,
  item,
  canDelete = false,
  handleModal,
  setMessage,
  setUrl,
  setMethod,
  setData,
}) => {
  const handleClick = async (
    url: string,
    method: string,
    dataProp?: keyof IEditProduct,
    prop?: keyof IProduct
  ) => {
    handleModal()

    if (dataProp == 'active') {
      setMessage(`¿Quieres ${item.activo == 1 ? 'desactivar' : 'activar'} este producto?`)
    } else if (dataProp == 'featured') {
      setMessage(`¿Quieres ${item.destacado == 0 ? 'destacar' : 'dejar de destacar'} este producto?`)
    } else {
      setMessage('¿Quieres eliminar este producto?')
    }

    setUrl(`${url}`)
    setMethod(`${method}`)

    if (method == 'DELETE' || method == 'delete') {
      setData({ id: item.id })
    } else {
      setData({ id: item.id, [dataProp!]: item[prop!] == 1 ? 0 : 1 })
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

      <button
        onClick={() => handleClick('products', 'PATCH', 'active', 'activo')}
        className={`
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
        <button
          onClick={() => handleClick('products', 'PATCH', 'featured', 'destacado')}
          className={`
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
        <button onClick={() => handleClick(`products/${item.id}`, 'DELETE')} className='p-2 bg-red-2-color border-[1px] rounded-md hover:bg-red-500'>
          <FaTrashAlt />
        </button>
      }
    </td>
  )
}

export default TableButtons
