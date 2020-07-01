import React from "react";
import sinon from "sinon";
import axios from "axios";
import {
  render,
  waitFor,
  fireEvent,
  screen,
  wait,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../Components/Login";
import App from "../../App";
import { act } from "react-dom/test-utils";
import { not } from "joi";

const s = (re, sel) => {
  return re.container.querySelector(sel);
};

const submitSel = "button[name=submit]";
const emailSel = "input#email[name=email]";
const passwordSel = "input#password[name=password]";

const postStub = sinon.stub(axios, "post");

describe("Login component", () => {
  afterEach(() => {
    postStub.reset();
  });

  it("should have a disabled submit button before inputs pass validation", async () => {
    const resPromise = Promise.resolve({
      status: 200,
      data: {},
      headers: {
        "x-auth-token": "",
        "name-token": "",
      },
    });
    postStub.withArgs("/api/auth", sinon.match.any).returns(resPromise);

    const re = render(<Login setName={() => null} />);

    fireEvent.click(s(re, submitSel));

    await act(() => resPromise);

    expect(postStub.callCount).toBe(0);
  });

  it("should make a post when validation passes and submit button is clicked", async () => {
    const resPromise = Promise.resolve({
      status: 200,
      data: {},
      headers: {
        "x-auth-token": "",
        "name-token": "",
      },
    });
    postStub.withArgs("/api/auth", sinon.match.any).returns(resPromise);
    const historyMock = { push: jest.fn().mockName("history.push") };
    const re = render(<Login setName={() => null} history={historyMock} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "andresoramos@gmail.com" },
    });
    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd1234" },
    });

    fireEvent.click(s(re, submitSel));
    await act(() => resPromise);

    expect(postStub.callCount).toBe(1);
    expect(historyMock.push).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalledWith("/");
  });

  it("should make a post when credentials are submitted but shows error when they are incorrect", async () => {
    // ---- Solution 1 -----
    // postStub
    //   .withArgs("/api/auth", sinon.match.any)
    //   .rejects({ response: { status: 400 } });

    // ---- Solution 2 -----
    const resPromise = Promise.reject({ response: { status: 400 } });
    postStub.withArgs("/api/auth", sinon.match.any).returns(resPromise);
    // ----  -----

    const histMock = { push: jest.fn() };

    const re = render(<Login setName={() => null} history={histMock} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "andresoramos@gmail.com" },
    });
    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd1234" },
    });
    fireEvent.click(s(re, submitSel));

    // ---- EITHER ONE OF THESE SOLUTIONS WORK -----

    // ---- Solution 1 -----
    // await waitFor(() =>
    //   expect(
    //     re.getByText("Invalid entry entered. Please try again")
    //   ).toBeInTheDocument()
    // );

    // ---- Solution 2 -----
    try {
      await act(() => resPromise);
    } catch (e) {}

    expect(
      re.getByText("Invalid entry entered. Please try again")
    ).toBeInTheDocument();
  });

  it.only("should not ban after single attempt", async () => {
    const resPromise = Promise.reject({ response: { status: 400 } });
    postStub.withArgs("/api/auth", sinon.match.any).returns(resPromise);
    // ----  -----

    const histMock = { push: jest.fn() };

    const re = render(<Login setName={() => null} history={histMock} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "esoramos@gmail.com" },
    });
    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd12294" },
    });
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}

    setTimeout(() => {
      expect(
        re.getByText(
          "You've tried to log in too many times. Please try again later."
        )
      ).to.not.BeInTheDocument();
    }, 10000);
  });

  it("should ban after max attempts", async () => {
    const resPromise = Promise.reject({ response: { status: 400 } });
    postStub.withArgs("/api/auth", sinon.match.any).returns(resPromise);
    // ----  -----

    const histMock = { push: jest.fn() };

    const re = render(<Login setName={() => null} history={histMock} />);

    fireEvent.change(s(re, emailSel), {
      target: { value: "esoramos@gmail.com" },
    });
    fireEvent.change(s(re, passwordSel), {
      target: { value: "Abcd12294" },
    });
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}
    fireEvent.click(s(re, submitSel));
    try {
      await act(() => resPromise);
    } catch (e) {}

    setTimeout(() => {
      expect(
        re.getByText(
          "You've tried to log in too many times. Please try again later."
        )
      ).toBeInTheDocument();
    }, 10000);
    // you will need to uncomment ip checking code in Login component
  });

  it("should navigate to login page, and land on home page", async () => {
    const resPromise = Promise.resolve({
      status: 200,
      data: {},
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwY2M5ODhkYjc4ODRiNzg2OTBkZWMiLCJuYW1lIjoicmFzdGFtYW52aWJyYXRpb24iLCJlbWFpbCI6ImFuZHJlc29yYW1vc0BnbWFpbC5jb20iLCJpYXQiOjE1OTMxMjM3OTR9.tjebwr5h5H3BUl4_J3DfXBf_DkdoxohqZq6tkiN6qaE",
        "name-token": "Andres",
      },
    });
    postStub.withArgs("/api/auth", sinon.match.any).returns(resPromise);

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
    expect(postStub.callCount).toBe(1);
    await act(() => resPromise);

    expect(re.container.innerHTML).toMatch("You are home");
  });
});
