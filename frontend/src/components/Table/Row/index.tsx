import TableButtons from '@/components/Table/Buttons';

interface Props {
  item: any;
  hasButtons?: boolean;
}

const TableRow: React.FC<Props> = ({ item, hasButtons = true }) => {
  return (
    <tr className='text-gray-700 odd:bg-gray-100'>
      <td className='p-2'>{item.cod}</td>
      <td className='p-2'>{item.name}</td>
      <td className='p-2'>{item.category}</td>
      <td className='p-2'>{item.quantity}</td>
      {hasButtons
        ? <TableButtons />
        : null
      }
    </tr>
  )
}

export default TableRow