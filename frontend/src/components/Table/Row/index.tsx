import { IProduct } from '../../../types'
import TableButtons from '@/components/Table/Buttons';

interface Props {
  href: string;
  item: IProduct;
  hasButtons?: boolean;
  canDelete?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

const TableRow: React.FC<Props> = ({ href, item, hasButtons = false, canDelete = false, children }) => {
  return (
    <tr className={`
      text-gray-700
      ${item.destacado == 1 ? 'font-bold' : ''}
      ${item.activo == 0 ? 'text-gray-400' : ''}
      odd:bg-gray-100
    `}>
      {children}

      {hasButtons
        ? <TableButtons href={href} item={item} canDelete={canDelete} />
        : null
      }
    </tr>
  )
}

export default TableRow