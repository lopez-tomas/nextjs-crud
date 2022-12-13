import Link from 'next/link'
import Button from '@/components/Button'

const FormButtons = () => {
  return (
    <div className='flex'>
      <Button styles='mr-2' text='Aceptar' submit secondary />
      <Link href='/productos'>
        <Button text='Cancelar' cancel />
      </Link>
    </div>
  )
}

export default FormButtons
