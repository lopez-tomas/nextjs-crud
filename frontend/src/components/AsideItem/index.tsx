import { NextPage } from 'next'

interface Props {
  item: { name: string; icon: React.ReactNode };
}

const AsideItem: NextPage<Props> = ({ item }) => {
  return (
    <li
      className='
        flex
        items-center
        w-full
        p-2
        rounded-md
        hover:bg-tertiary-color
        hover:text-white-color
        hover:cursor-pointer
    '>
      <span className='mr-2'>{item.icon}</span>
      {item.name}
    </li>
  )
}

export default AsideItem
