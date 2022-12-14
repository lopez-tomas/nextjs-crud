import { useEffect } from 'react'
import { useRouter } from 'next/router'

import ReactPortal from '@/components/ReactPortal'
import Button from '@/components/Button'
import useEditItem from '@/utils/useEditItem'
import { IEditProduct } from 'src/types';

interface Props {
  modalId: string;
  isOpen: boolean;
  handleClose: () => void;
  modalMessage: string;
  url: string;
  method: string;
  data: IEditProduct | null;
}

const Modal = ({ modalId, isOpen, handleClose, modalMessage, url, method, data }: Props) => {
  const router = useRouter()

  const handleClick = async () => {
    const id = await useEditItem(url, method, data!)

    if (id) {
      handleClose()
      router.reload()
    }
  }

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose() : null

    document.body.addEventListener('keydown', closeOnEscapeKey)

    return () => document.body.removeEventListener('keydown', closeOnEscapeKey)
  }, [handleClose])

  if (!isOpen) return null

  return (
    <ReactPortal wrapperId={modalId}>
      <>
        <div className='fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50' />
        <div className='
          flex
          flex-col
          justify-center
          min-w-fit
          w-[400px]
          h-[200px]
          fixed
          p-5
          inset-y-[12rem]
          inset-x-[32rem]
          box-border
          bg-white-color
          rounded
          overflow-hidden
          z-50
        '>
          <div className='box-border h-5/6'>
            <div className='flex flex-col justify-between h-full w-full'>
              <div className='flex flex-col mt-auto mb-auto items-center p-8'>
                <span>{modalMessage}</span>
              </div>
              <div className='flex flex-col sm:flex-row justify-center gap-8 align-center'>
                <Button onClick={handleClick} text='Aceptar' secondary />
                <Button onClick={handleClose} text='Cancelar' cancel />
              </div>
            </div>
          </div>
        </div>
      </>
    </ReactPortal>
  )
}

export default Modal
