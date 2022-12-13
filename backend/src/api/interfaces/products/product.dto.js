import Joi from 'joi'

const id = Joi.number().integer()
const id_category = Joi.number().integer()
const name = Joi.string().max(100)
const description = Joi.string()
const col1 = Joi.string().max(1000).allow(null)
const col2 = Joi.string().max(1000).allow(null)
const col3 = Joi.string().max(1000).allow(null)
const col4 = Joi.string().max(1000).allow(null)
const col5 = Joi.string().max(1000).allow(null)
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
  col1: col1.optional(),
  col2: col2.optional(),
  col3: col3.optional(),
  col4: col4.optional(),
  col5: col5.optional(),
  active: active.required(),
  featured: featured.optional(),
})

const updateProductSchema = Joi.object({
  id: id.required(),
  name: name.optional(),
  id_category: id_category.optional(),
  name: name.optional(),
  description: description.optional(),
  col1: col1.optional(),
  col2: col2.optional(),
  col3: col3.optional(),
  col4: col4.optional(),
  col5: col5.optional(),
  active: active.optional(),
  featured: featured.optional(),
})

export {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
}