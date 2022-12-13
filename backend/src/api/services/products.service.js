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

      const query = connection.query(sql,
        [data.id_category, data.name, data.description, data.col1, data.active, data.featured],
        (err, results, fields) => {
          if (err)
            return reject(boom.badRequest('[createProduct] - Error al crear el producto', err))

          const newProduct = {
            id: parseInt(results.insertId),
          }

          for (const field in data) {
            newProduct[field] = data[field]
          }

          resolve(JSON.parse(JSON.stringify(newProduct)))
        })
    })
  }

  updateProduct(data) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE productos SET
          id_categoria = ?,
          nombre = ?,
          descripcion = ?,
          col1 = ?,
          activo = ?,
          destacado = ?
        WHERE id = ?
      `

      const query = connection.query(sql,
        [data.id_category, data.name, data.description, data.col1, data.active, data.featured, data.id],
        (err, results, fields) => {
          if (err)
            return reject(boom.badRequest('[updateProduct] - Error al actualizar el producto', err))

          resolve(JSON.parse(JSON.stringify({
            id: parseInt(data.id),
            message: '[updateProduct] - Producto actualizado exitosamente.',
          })))
        })
    })
  }
}

export default ProductsService