import { FaPen, FaTrashAlt } from 'react-icons/fa'

const TableButtons = () => {
  return (
    <td className='p-2 text-center text-2xs text-white-color'>
      <button className='mr-1 p-2 bg-blue-color rounded-md hover:bg-blue-2-color'>
        <FaPen />
      </button>
      <button className='p-2 bg-red-color rounded-md hover:bg-red-2-color'>
        <FaTrashAlt />
      </button>
    </td>
  )
}

export default TableButtons
