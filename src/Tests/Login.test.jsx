import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../Components/Login";

const s = (re, sel) => {
  return re.container.querySelector(sel);
};

const submitSel = "button[name=submit]";
const emailSel = "input#email[name=email]";
const passwordSel = "input#password[name=password]";

describe("Login component", () => {
  it("should have a disabled submit button before inputs pass validation", () => {
    const re = render(<Login setName={() => null} />);

    expect(re.getByText("Sign-in")).toBeInTheDocument();
    expect(s(re, submitSel)).toHaveAttribute("disabled");
  });

  it("should validate password is at least 8 characters long", () => {
    const re = render(<Login setName={() => null} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "andresoramos@gmail.com" },
    });
    expect(s(re, emailSel)).toHaveValue("andresoramos@gmail.com");

    fireEvent.change(s(re, passwordSel), {
      target: { value: "1234" },
    });

    expect(re.container.innerHTML).toMatch(
      /length must be at least 8 characters long/
    );

    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd1234" },
    });

    expect(re.container.innerHTML).not.toMatch(
      /length must be at least 8 characters long/
    );
  });

  it("should validate password is not allowed to be empty", () => {
    const re = render(<Login setName={() => null} />);

    fireEvent.change(s(re, passwordSel), {
      target: { value: "but" },
    });
    fireEvent.change(s(re, passwordSel), {
      target: { value: "" },
    });

    expect(re.container.innerHTML).toMatch(/is not allowed to be empty/);
  });

  it("should validate email cannot be empty", () => {
    const re = render(<Login setName={() => null} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "but" },
    });
    fireEvent.change(s(re, emailSel), {
      target: { value: "" },
    });

    expect(re.container.innerHTML).toMatch(/cannot be empty/);
  });

  it("should validate email is longer than 3 characters", () => {
    const re = render(<Login setName={() => null} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "12" },
    });

    expect(re.container.innerHTML).toMatch(
      /Username or email must be longer than three characters/
    );
  });

  it("should enabled submit button when validation passes", () => {
    const re = render(<Login setName={() => null} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "andresoramos@gmail.com" },
    });
    expect(s(re, emailSel)).toHaveValue("andresoramos@gmail.com");

    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd1234" },
    });

    expect(s(re, submitSel)).not.toHaveAttribute("disabled");
  });
});
