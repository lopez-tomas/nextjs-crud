interface Props {
  columns: string[];
  hasButtons?: boolean;
  children: React.ReactElement[];
}

const Table: React.FC<Props> = ({ columns, hasButtons = false, children }) => {
  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='text-left text-xs text-gray-600'>
          {columns.map((column, index) => (
            <th key={index} className='p-2'>{column}</th>
          ))}
          {hasButtons
            ? <th className='p-2'></th>
            : null
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default Table
