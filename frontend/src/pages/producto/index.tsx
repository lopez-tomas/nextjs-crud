import PageContainer from '@/containers/PageContainer'
import FormGroup from '@/components/Form/Group'
import FormInput from '@/components/Form/Input'
import FormSelect from '@/components/Form/Select'
import FormTextarea from '@/components/Form/Textarea'
import FormButtons from '@/components/Form/Buttons'

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
              <FormGroup label='Id' htmlFor='id'>
                <FormInput name='id' type='text' value={!notFound ? product.id : ''} required disabled />
              </FormGroup>
            :
              null
          }

          <FormGroup label='Nombre' htmlFor='name'>
            <FormInput name='name' type='text' value={!notFound ? product.nombre : ''} required />
          </FormGroup>

          <FormGroup label='Código' htmlFor='col1'>
            <FormInput name='col1' type='text' value={!notFound ? product.col1 : ''} />
          </FormGroup>

          <FormGroup label='Categoría' htmlFor='category'>
            <FormSelect name='category' value={!notFound ? product.id_categoria : ''}>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.categoria}
                </option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label='Descripción' htmlFor='description'>
            <FormTextarea name='description' cols={30} rows={10} value={!notFound ? product.descripcion : ''} required />
          </FormGroup>

          <FormGroup label='Activo' htmlFor='active'>
            <FormSelect name='active' value={!notFound ? product.activo : ''}>
              <option value='1'>SÍ</option>
              <option value='0'>NO</option>
            </FormSelect>
          </FormGroup>

          <FormButtons />
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
