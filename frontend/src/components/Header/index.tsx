import { BiExit } from 'react-icons/bi'

const Header = () => {
  return (
    <header className='
      flex
      justify-between
      items-center
      h-16
      font-bold
      bg-primary-color
      text-white-color
    '>
      <h1 className='px-4'>ADMIN</h1>
      <div className='px-4'>
        <div className='
          p-2
          border-2
          border-secondary-color
          rounded-md
          text-white-color
          transition
          ease-in-out
          delay-100
          hover:cursor-pointer
          hover:bg-secondary-color
          hover:text-black-color
        '>
          <BiExit />
        </div>
      </div>
    </header>
  )
}

export default Header
