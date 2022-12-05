import AsideItem from '@/components/AsideItem'
import { FaHome, FaXing } from 'react-icons/fa'

const Aside = () => {
  return (
    <aside className='flex w-52 h-90vh bg-secondary-color text-tertiary-color'>
      <ul className='w-full p-4 text-sm'>
        {items.map((item, index) => (
          <AsideItem key={index} item={item} />
        ))}
      </ul>
    </aside>
  )
}

const items = [
  { name: 'Inicio', path: '/', icon: <FaHome /> },
  { name: 'Productos', path: '/productos', icon: <FaXing /> },
]

export default Aside
