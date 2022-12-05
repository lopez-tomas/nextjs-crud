import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  item: { name: string; path: string; icon: React.ReactNode };
}

const AsideItem: NextPage<Props> = ({ item }) => {
  const router = useRouter()

  return (
    <li>
      <Link
        href={item.path}
        className={`
          flex
          items-center
          w-full
          p-2
          rounded-md
          hover:bg-tertiary-color
          hover:text-white-color
          hover:cursor-pointer
          ${router.pathname === item.path ? 'bg-primary-color text-white-color' : ''}
      `}>
        <span className='mr-2'>{item.icon}</span>
        {item.name}
      </Link>
    </li>
  )
}

export default AsideItem
