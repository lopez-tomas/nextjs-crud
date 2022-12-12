import Joi from 'joi'

const id = Joi.number().integer()
const id_category = Joi.number().integer()
const name = Joi.string().max(100)
const description = Joi.string()
const col1 = Joi.string().max(1000)
const col2 = Joi.string().max(1000)
const col3 = Joi.string().max(1000)
const col4 = Joi.string().max(1000)
const col5 = Joi.string().max(1000)
const active = Joi.number().min(0).max(1)
const featured = Joi.number().min(0).max(1)

const getProductSchema = Joi.object({
  id: id.required(),
})

const createProductSchema = Joi.object({
  name: name.required(),
  id_category: id_category.required(),
  name: name.required(),
  description: description.required(),
  col1: col1,
  col2: col2,
  col3: col3,
  col4: col4,
  col5: col5,
  active: active.required(),
  featured: featured,
})

const updateProductSchema = Joi.object({
  id: id.required(),
  name: name,
  id_category: id_category,
  name: name,
  description: description,
  col1: col1,
  col2: col2,
  col3: col3,
  col4: col4,
  col5: col5,
  active: active,
  featured: featured,
})

export {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
}