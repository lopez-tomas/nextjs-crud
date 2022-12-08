import Link from 'next/link'
import Button from '@/components/Button'

const Buttons = () => {
  return (
    <div className='flex'>
      <Button styles='mr-2' text='Aceptar' secondary />
      <Link href='/productos'>
        <Button text='Cancelar' cancel />
      </Link>
    </div>
  )
}

export default Buttons
