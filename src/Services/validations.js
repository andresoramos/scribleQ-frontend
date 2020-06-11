import Joi from "joi";

export const validatedProperty = (
  name,
  value,
  thisSchema,
  error,
  setError,
  text
) => {
  const validated = validateProperty(name, value, thisSchema);
  const newError = { ...error };

  if (validated) {
    newError[text] = validated;
  } else {
    newError[text] = "";
  }
  setError(newError);
};

export function validate(data, schema) {
  const result = Joi.validate(data, schema, {
    abortEarly: false,
  });
  const { error } = result;
  if (!error) {
    return null;
  }
  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
}

function validateProperty(name, value, macroSchema) {
  const obj = { [name]: value };
  const schema = { [name]: macroSchema[name] };
  const { error } = Joi.validate(obj, schema);
  if (!error) return null;
  return error.details[0].message;
}
