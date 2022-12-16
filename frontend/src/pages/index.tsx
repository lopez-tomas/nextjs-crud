import PageContainer from "@/containers/PageContainer"
import Layout from "@/components/Layout"

import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer pretitle='>' title='admin@admin' />
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home
