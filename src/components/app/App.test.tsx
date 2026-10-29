import { screen } from "@testing-library/react";
import App from "./App";
import { expect, it, describe } from "vitest";
import { renderWithRedux } from "../../test/utils.tsx";

describe("App component", function () {
  it("should render App", () => {
    renderWithRedux(<App />);
    expect(screen.getByText(/Конвертер валют онлайн/i)).toBeInTheDocument();
  });
});
