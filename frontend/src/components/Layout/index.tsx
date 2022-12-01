import { NextPage } from 'next'
import Header from '@/components/Header'
import Aside from '@/components/Aside'

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='flex'>
        <Aside />
        { children }
      </main>
    </>
  )
}

export default Layout
