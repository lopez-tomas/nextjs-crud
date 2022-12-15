import Link from 'next/link'

import IconButton from '@/components/IconButton'
import { inParagraph, inSpan } from '@/utils/index'
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
      setMessage(inParagraph(inSpan(item.activo == 0 ? 'activar' : 'desactivar'), 'producto', 'M'))
    } else if (dataProp == 'featured') {
      setMessage(inParagraph(inSpan(item.destacado == 0 ? 'destacar' : 'no destacar'), 'producto', 'M'))
    } else {
      setMessage(inParagraph(inSpan('eliminar'), 'producto', 'M'))
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
        <IconButton margin styles='bg-blue-color hover:bg-blue-2-color'>
          <FaPen />
        </IconButton>
      </Link>

      <IconButton
        onClick={() => handleClick('products', 'PATCH', 'active', 'activo')}
        margin
        styles={`${item.activo == 1 ? 'bg-red-color hover:bg-red-2-color' : 'bg-green-color'}`}
      >
        {item.activo == 1
          ? <FaTimes />
          : <FaCheck />
        }
      </IconButton>

      {!canDelete
        ?
          <IconButton
            onClick={() => handleClick('products', 'PATCH', 'featured', 'destacado')}
            styles={`text-black-color
              ${item.destacado == 1
                ? 'bg-yellow-400 border-transparent hover:bg-transparent hover:border-black-color'
                : 'bg-transparent border-black-color hover:bg-yellow-400 hover:border-transparent'
            }`}
          >
            <FaStar />
          </IconButton>
        : null
      }

      {canDelete
        ?
          <IconButton
            onClick={() => handleClick(`products/${item.id}`, 'DELETE')}
            styles={`bg-red-color hover:bg-red-500`}
          >
            <FaTrashAlt />
          </IconButton>
        : null
        // <button  className='p-2 bg-red-2-color border-[1px] rounded-md hover:bg-red-500'>
        //   <FaTrashAlt />
        // </button>
      }
    </td>
  )
}

export default TableButtons
