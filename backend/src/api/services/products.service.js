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
}

export default ProductsService