import { IProduct } from '../../../types'
import TableButtons from '@/components/Table/Buttons';

interface Props {
  item: IProduct;
  hasButtons?: boolean;
  children: React.ReactNode | React.ReactNode[]
}

const TableRow: React.FC<Props> = ({ item, hasButtons = true, children }) => {
  return (
    <tr className={`
      text-gray-700
      ${item.destacado == 1 ? 'font-bold' : ''}
      odd:bg-gray-100
    `}>
      {children}

      {hasButtons
        ? <TableButtons href='/producto' item={item} />
        : null
      }
    </tr>
  )
}

export default TableRow