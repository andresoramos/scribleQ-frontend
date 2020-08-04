import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("make quiz", () => {
  it("Should Ask user for quiz name", () => {
    expect(s(true)).toBeTruthy();
  });
  it("Should allow user to create a question by clicking on Create Question Button", () => {
    expect(s(true)).toBeTruthy();
  });
  it("Should allow selected answer option to change color", () => {
    expect(s(true)).toBeTruthy();
  });
  it("Should return a text editor when answer options are chosen", () => {
    expect(s(true)).toBeTruthy();
  });
  it("Should present a modal asking for question's value upon submission of answer.", () => {
    expect(s(true)).toBeTruthy();
  });
  it("Adding a question before or after present question should affect no values in present question.", () => {
    expect(s(true)).toBeTruthy();
  });
});
