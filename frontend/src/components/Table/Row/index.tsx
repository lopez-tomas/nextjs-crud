import { IProduct } from '../../../types'
import TableButtons from '@/components/Table/Buttons';

interface Props {
  item: IProduct;
  hasButtons?: boolean;
}

const TableRow: React.FC<Props> = ({ item, hasButtons = true }) => {
  return (
    <tr className={`
      text-gray-700
      ${item.destacado == 1 ? 'font-bold' : ''}
      odd:bg-gray-100
    `}>
      <td className='p-2'>{item.id}</td>
      <td className='p-2'>{item.nombre}</td>
      <td className='p-2'>{item.nombre_categoria}</td>
      <td className='p-2'>{item.cantidad}</td>
      {hasButtons
        ? <TableButtons href='/producto' item={item} />
        : null
      }
    </tr>
  )
}

export default TableRow