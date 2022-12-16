import { connection } from '#database/index.js'
import boom from '@hapi/boom'
import bcrypt from 'bcryptjs'

class AuthService {

  getUser(username, password) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          usuarios.*
        FROM usuarios
        WHERE 1 = 1
        AND usuarios.usuario = ?
      `

      const query = connection.query(sql, [username], async (err, results, fields) => {
        if (err) {
          return reject(boom.badRequest('[getUser] - Error al obtener el usuario', err))
        }

        const user = JSON.parse(JSON.stringify(results[0]))
        const { password: userPassword, ...userData} = user

        const passwordMatched = await bcrypt.compare(password, userPassword)
        if (!passwordMatched) {
          return reject(boom.unauthorized('[getUser] - El usuario y/o contraseña no coinciden.', err))
        }

        resolve(JSON.parse(JSON.stringify(userData)))
      })
    })
  }
}

export default AuthService