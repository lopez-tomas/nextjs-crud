import { FaHome, FaXing } from 'react-icons/fa'

const Aside = () => {
  return (
    <aside className='flex w-56 h-90vh bg-secondary-color text-tertiary-color'>
      <ul className='p-4'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center py-2 hover:text-white-color hover:cursor-pointer'>
            <span className='mr-2'>{item.icon}</span>
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  )
}

const items = [
  { name: 'Inicio', icon: <FaHome /> },
  { name: 'Productos', icon: <FaXing /> },
]

export default Aside
