import { ICreateProduct, IEditProduct } from "src/types";

const useEditItem = async (url: string, method: string, data: ICreateProduct | IEditProduct) => {
  const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/${url}`
  const options = {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  let id = null

  await fetch(backendURL, options)
    .then(res => res.json())
    .then(data => {
      id = data.id
    })
    .catch(err => {
      console.log(err)
    })

  return id
}

export default useEditItem
