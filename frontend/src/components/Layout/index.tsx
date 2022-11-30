import { NextPage } from 'next'
import Header from '@/components/Header'

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Header />
      { children}
    </>
  )
}

export default Layout
