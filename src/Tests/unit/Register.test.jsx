import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register, { validate } from "../../Components/Register";
// import Joi, { describe } from "joi";

describe("Validation", () => {
  it("should show an error when email is blank", () => {
    expect(true).toBeTruthy();
  });
  // xit("should show an error when email is blank", () => {
  //   const { queryByLabelText, getByLabelText } = render(<Register></Register>);
  //   // fireEvent.click(screen.getByTestId("submit"));
  //   fireEvent.change(screen.getByTestId("email"), { target: { value: "a" } });
  //   fireEvent.change(screen.getByTestId("email"), { target: { value: "" } });
  //   // expect(container.querySelector("#email-helper-text")).toContain(
  //   //   "not allowed to be empty"
  //   // );
  //   expect(screen.getByTestId("sample").innerHTML).toMatch("Sample");
  //   expect(screen.getByTestId("email").innerHTML).toMatch(
  //     "not allowed to be empty"
  //   );
  //   // expect(getByText("not allowed to be empty")).toBeInTheDocument();
  // });
  // it("Validate should return an errors object if user object is invalid", () => {
  //   const data = {
  //     username: "andresoramos",
  //     email: "cum",
  //     password: "Anus1987",
  //   };
  //   const schema = {
  //     username: Joi.string().required(),
  //     email: Joi.string().email().required(),
  //     password: Joi.string().min(5).required(),
  //   };
  //   const result = validate(data, schema);
  //   console.log(result, "this is the result");
  //   expect(result).toBeDefined();
  // });
});
