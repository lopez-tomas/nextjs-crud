import { BiExit } from 'react-icons/bi'

const Header = () => {
  return (
    <header className='
      flex
      justify-between
      items-center
      h-10vh
      font-bold
      bg-primary-color
      text-white-color
    '>
      <h1 className='px-4'>ADMIN</h1>
      <div className='px-4'>
        <div className='
          p-2
          border-2
          bg-secondary-color
          border-tertiary-color
          rounded-md
          text-tertiary-color
          hover:cursor-pointer
          hover:bg-tertiary-color
          hover:border-secondary-color
          hover:text-black-2-color
        '>
          <BiExit />
        </div>
      </div>
    </header>
  )
}

export default Header
