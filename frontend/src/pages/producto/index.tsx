import { useRef } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import PageContainer from '@/containers/PageContainer'
import FormGroup from '@/components/Form/Group'
import FormInput from '@/components/Form/Input'
import FormSelect from '@/components/Form/Select'
import FormTextarea from '@/components/Form/Textarea'
import FormButtons from '@/components/Form/Buttons'

import { IProduct, ICategory, ICreateProduct } from 'src/types'

interface Props {
  notFound: boolean;
  product: IProduct;
  categories: ICategory[];
}

const SingleProductPage: NextPage<Props> = ({ notFound, product, categories }) => {
  const router = useRouter()
  const formRef = useRef(null)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      id: { value: number };
      category: { value: number };
      name: { value: string };
      description: { value: string };
      col1: { value: string };
      active: { value: number };
      featured: { value: number };
    }

    const data: ICreateProduct = {
      id_category: target.category.value,
      name: target.name.value,
      description: target.description.value,
      col1: target.col1.value,
      active: target.active.value,
      featured: target.featured.value,
    }

    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/products`
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH',
      },
      body: JSON.stringify(data)
    }

    if (target.id.value) {
      data.id = target.id.value

      options.method = 'PATCH'
      options.body = JSON.stringify(data)
    }

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        router.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <PageContainer pretitle='productos/' title='Producto'>
      <div className='my-6 px-2 pb-4 bg-white-color rounded-md'>
        <form ref={formRef} onSubmit={e => handleSubmit(e)} className='w-full'>
          {!notFound
            ?
              <FormGroup label='Id' htmlFor='id'>
                <FormInput name='id' type='number' value={!notFound ? product.id : ''} required disabled />
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

          <FormGroup label='Destacado' htmlFor='featured'>
            <FormSelect name='featured' value={!notFound ? product.destacado : ''}>
              <option value='0'>NO</option>
              <option value='1'>SÍ</option>
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
