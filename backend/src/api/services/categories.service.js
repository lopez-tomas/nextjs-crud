import { connection } from '#database/index.js'
import boom from '@hapi/boom'

class CategoriesService {
  getCategories() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM categorias
        ORDER BY categorias.categoria ASC
      `
      const query = connection.query(sql, (err, results, fields) => {
        if (err)
          return reject(boom.badRequest('[getCategories] - Error al obtener las categorías', err))

        resolve(JSON.parse(JSON.stringify(results)))
      })
    })
  }
}

export default CategoriesService