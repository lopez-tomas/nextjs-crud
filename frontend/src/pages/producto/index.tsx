import PageContainer from '@/containers/PageContainer'
import Group from '@/components/Form/Group'
import Input from '@/components/Form/Input'
import Select from '@/components/Form/Select'
import Textarea from '@/components/Form/Textarea'
import Buttons from '@/components/Form/Buttons'

import { NextPage } from 'next'
import { IProduct, ICategory } from 'src/types'

interface Props {
  notFound: boolean;
  product: IProduct;
  categories: ICategory[];
}

const SingleProductPage: NextPage<Props> = ({ notFound, product, categories }) => {
  return (
    <PageContainer pretitle='productos/' title='Producto'>
      <div className='my-6 px-2 pb-4 bg-white-color rounded-md'>
        <form className='w-full'>
          {!notFound
            ?
              <Group label='Id' htmlFor='id'>
                <Input name='id' type='text' value={!notFound ? product.id : ''} required disabled />
              </Group>
            :
              null
          }

          <Group label='Nombre' htmlFor='name'>
            <Input name='name' type='text' value={!notFound ? product.nombre : ''} required />
          </Group>

          <Group label='Código' htmlFor='col1'>
            <Input name='col1' type='text' value={!notFound ? product.col1 : ''} />
          </Group>

          <Group label='Categoría' htmlFor='category'>
            <Select name='category' value={!notFound ? product.id_categoria : ''}>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.categoria}
                </option>
              ))}
            </Select>
          </Group>

          <Group label='Descripción' htmlFor='description'>
            <Textarea name='description' cols={30} rows={10} value={!notFound ? product.descripcion : ''} required />
          </Group>

          <Group label='Activo' htmlFor='active'>
            <Select name='active' value={!notFound ? product.activo : ''}>
              <option value='1'>SÍ</option>
              <option value='0'>NO</option>
            </Select>
          </Group>

          <Buttons />
        </form>
      </div>
    </PageContainer>
  )
}

export async function getServerSideProps({ query }: any) {
  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/categories`)
  const categories = await categoriesRes.json()

  if (!query.id) {
    return {
      props: {
        notFound: true,
        product: [],
        categories: categories.categories,
      }
    }
  }

  const productRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/products/${query.id}`)
  const product = await productRes.json()

  return {
    props: {
      notFound: false,
      product: product.product,
      categories: categories.categories,
    }
  }
}

export default SingleProductPage
