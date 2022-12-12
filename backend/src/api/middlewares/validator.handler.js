import boom from '@hapi/boom';

export const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property]; // dynamic property => req.body; req.params; req.query

    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.message));
    }
    next();
  }
}