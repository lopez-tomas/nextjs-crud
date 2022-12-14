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
      const sql = 'INSERT INTO productos SET ?'

      let values = {}
      if (data.id_category != null) {
        values.id_categoria = data.id_category
      }
      if (data.name != null && data.name != "") {
        values.nombre = data.name
      }
      if (data.description != null && data.description != "") {
        values.descripcion = data.description
      }
      if (data.col1 != null && data.col1 != "") {
        values.col1 = data.col1
      }
      if (data.active != null) {
        values.activo = data.active
      }
      if (data.featured != null) {
        values.destacado = data.featured
      }

      const query = connection.query(sql, values, (err, results, fields) => {
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
      const sql = 'UPDATE productos SET ? WHERE ?'

      let values = {}
      if (data.id_category != null) {
        values.id_categoria = data.id_category
      }
      if (data.name != null) {
        values.nombre = data.name
      }
      if (data.description != null) {
        values.descripcion = data.description
      }
      if (data.col1 != null) {
        values.col1 = data.col1
      }
      if (data.active != null) {
        values.activo = data.active
      }
      if (data.featured != null) {
        values.destacado = data.featured
      }

      let filters = { id: data.id }

      values = [values, filters]

      const query = connection.query(sql, values, (err, results, fields) => {
        if (err)
          return reject(boom.badRequest('[updateProduct] - Error al actualizar el producto', err))

        resolve(JSON.parse(JSON.stringify({
          id: parseInt(data.id),
          message: '[updateProduct] - Producto actualizado exitosamente.',
        })))
      })
    })
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM productos WHERE id = ?'

      const query = connection.query(sql, [id], (err, results, fields) => {
        if (err)
          return reject(boom.badRequest('[deleteProduct] - Error al eliminar el producto', err))

        resolve(JSON.parse(JSON.stringify({
          id: parseInt(id),
          message: '[deleteProduct] - Producto eliminado exitosamente.',
        })))
      })
    })
  }
}

export default ProductsService