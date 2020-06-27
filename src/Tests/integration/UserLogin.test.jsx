import React from "react";
import sinon from "sinon";
import axios from "axios";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../Components/Login";
import App from "../../App";

const s = (re, sel) => {
  return re.container.querySelector(sel);
};

const submitSel = "button[name=submit]";
const emailSel = "input#email[name=email]";
const passwordSel = "input#password[name=password]";

describe("Login component", () => {
  afterEach(() => {
    // postStub.reset();
  });

  it("should have a disabled submit button before inputs pass validation", () => {
    postStub.withArgs("/api/auth", sinon.match.any).resolves(
      Promise.resolve({
        status: 200,
        data: {},
        headers: {
          "x-auth-token": "",
          "name-token": "",
        },
      })
    );

    const re = render(<Login setName={() => null} />);

    fireEvent.click(s(re, submitSel));

    expect(postStub.callCount).toBe(0);
  });

  it("should make a post when validation passes and submit button is clicked", () => {
    postStub.withArgs("/api/auth", sinon.match.any).resolves({
      status: 200,
      data: {},
      headers: {
        "x-auth-token": "",
        "name-token": "",
      },
    });

    const re = render(<Login setName={() => null} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "andresoramos@gmail.com" },
    });
    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd1234" },
    });

    fireEvent.click(s(re, submitSel));

    expect(postStub.callCount).toBe(1);
  });

  // consider refactoring common code

  it("should make a post when credentials are submitted but shows error when they are incorrect", async () => {
    postStub.withArgs("/api/auth", sinon.match.any).rejects({ status: 400 });
    const re = render(
      <Login
        setName={() => {
          return null;
        }}
      />
    );
    fireEvent.change(s(re, emailSel), {
      target: { value: "andresoramos@gmail.com" },
    });
    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd1234" },
    });
    expect(
      re.getByText("Invalid entry entered. Please try again")
    ).toBeInTheDocument();
  });

  it("should not ban after single attempt", () => {});

  it("should ban after max attempts", () => {
    // you will need to uncomment ip checking code in Login component
  });

  it.only("should navigate to login page, and land on home page", async () => {
    const postStub = sinon.stub(axios, "post");

    postStub.resolves({
      status: 200,
      data: {},
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwY2M5ODhkYjc4ODRiNzg2OTBkZWMiLCJuYW1lIjoicmFzdGFtYW52aWJyYXRpb24iLCJlbWFpbCI6ImFuZHJlc29yYW1vc0BnbWFpbC5jb20iLCJpYXQiOjE1OTMxMjM3OTR9.tjebwr5h5H3BUl4_J3DfXBf_DkdoxohqZq6tkiN6qaE",
        "name-token": "Andres",
      },
    });

    const re = render(<App />);

    expect(re.getByText("Sign-in")).toBeInTheDocument();

    fireEvent.click(re.getByText("Sign-in"));

    expect(re.getByText("Welcome back!")).toBeInTheDocument();

    fireEvent.change(s(re, emailSel), {
      target: { value: "andresoramos@gmail.com" },
    });

    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd1234" },
    });

    fireEvent.click(s(re, submitSel));

    // expect(postStub.callCount).toBe(1);

    // await waitFor(() => re.container.querySelector(".home-header"));

    expect(re.container.innerHTML).toMatch("You are home");
  });
});
