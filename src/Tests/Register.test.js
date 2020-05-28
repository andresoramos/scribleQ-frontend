import { validate } from "../Components/Register";
import Joi, { describe } from "joi";

// describe("Validation on submit", () => {
it("Validate should return null for valid user object", () => {
  const data = {
    username: "andresoramos",
    email: "andresoramos@gmail.com",
    password: "Anus1987",
  };
  const schema = {
    username: Joi.string().required(),
    email: Joi.string().email().required(),

    password: Joi.string().min(5).required(),
  };
  const result = validate(data, schema);
  console.log(result, "This is your result");
  expect(result).toBe(null);
});

it("Validate should return an errors object if user object is invalid", () => {
  const data = {
    username: "andresoramos",
    email: "cum",
    password: "Anus1987",
  };
  const schema = {
    username: Joi.string().required(),
    email: Joi.string().email().required(),

    password: Joi.string().min(5).required(),
  };
  const result = validate(data, schema);
  console.log(result, "this is the result");
  expect(result).toBeDefined();
});
// });
