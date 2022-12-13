interface Props {
  value: string;
  children?: React.ReactNode;
}

const TableCell: React.FC<Props> = ({ value, children }) => {
  return (
    <td className='p-2'>
      {children
        ?
          <div className='flex items-center'>
            {value} {children}
          </div>
        : <div>{value}</div>
      }
    </td>
  )
}

export default TableCell
