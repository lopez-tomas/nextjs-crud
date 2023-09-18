import { useContext } from 'react'
import AppContext from '@/contexts/AppContext'

import AsideItem from '@/components/AsideItem'
import { AppContextProps } from 'src/types'
import { FaHome, FaXing } from 'react-icons/fa'

const Aside = () => {
  const { state } = useContext<AppContextProps>(AppContext)

  const filteredItems = state?.user?.is_admin === 1 ? items : items.filter(item => item.admin === 0)

  return (
    <aside className='flex w-25vw h-100vh bg-secondary-color text-tertiary-color'>
      <ul className='w-full p-4 text-sm'>
        {filteredItems.map((item, index) => (
          <AsideItem key={index} item={item} />
        ))}
      </ul>
    </aside>
  )
}

const items = [
  { name: 'Inicio', admin: 0, path: '/', icon: <FaHome /> },
  { name: 'Productos', admin: 0, path: '/productos', icon: <FaXing /> },
  { name: 'Login', admin: 1, path: '/login', icon: <FaXing /> },
]

export default Aside
