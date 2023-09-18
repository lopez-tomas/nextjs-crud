import { NextPage } from 'next'

interface Props {
  children: React.ReactNode;
}

const LoginLayout: NextPage<Props> = ({ children }) => {
  return (
    <main className='flex justify-center items-center h-[100vh] bg-secondary-color'>
      { children }
    </main>
  )
}

export default LoginLayout
