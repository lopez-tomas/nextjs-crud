import { IProduct } from '../../../types'

interface Props {
  item?: IProduct;
  children: React.ReactNode | React.ReactNode[];
}

const TableRow: React.FC<Props> = ({ item, children }) => {
  return (
    <tr className={`
      text-gray-700
      ${item?.destacado == 1 ? 'font-bold' : ''}
      ${item?.activo == 0 ? 'text-gray-400' : ''}
      odd:bg-gray-100
    `}>
      {children}
    </tr>
  )
}

export default TableRow