import { connection } from '#database/index.js'
import boom from '@hapi/boom'

class ProductsService {

  getProducts() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          productos.*,
          categorias.categoria AS nombre_categoria
        FROM productos
        LEFT JOIN categorias ON categorias.id = productos.id_categoria
        ORDER BY productos.id_categoria ASC, productos.nombre ASC
      `
      const query = connection.query(sql, (err, results, fields) => {
        if (err)
          return reject(boom.badRequest('[getProducts] - Error al obtener los productos', err))

        resolve(JSON.parse(JSON.stringify(results)))
      })
    })
  }

  getProduct(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          productos.*,
          categorias.categoria AS nombre_categoria
        FROM productos
        LEFT JOIN categorias ON categorias.id = productos.id_categoria
        WHERE 1 = 1
        AND productos.id = ?
      `

      const query = connection.query(sql, [id], (err, results, fields) => {
        if (err)
          return reject(boom.badRequest('[getProduct] - Error al obtener el producto', err))

        resolve(JSON.parse(JSON.stringify(results[0])))
      })
    })
  }

  createProduct(data) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO productos
          (id_categoria, nombre, descripcion, col1, activo, destacado)
          VALUES (?, ?, ?, ?, ?, ?)
      `

      const query = connection.query(sql, Object.values(data), (err, results, fields) => {
        if (err)
          return reject(boom.badRequest('[createProduct] - Error al crear el producto', err))

        const newProduct = {
          id: parseInt(results.insertId),
        }

        for (const field in data) {
          newProduct[field] = data[field]
        }

        console.log(newProduct)

        resolve(JSON.parse(JSON.stringify(newProduct)))
      })
    })
  }
}

export default ProductsService