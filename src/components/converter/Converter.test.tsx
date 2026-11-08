import { screen, within, waitFor } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { renderWithRedux } from "../../test/utils.tsx";
import App from "../app/App.tsx";
import userEvent from "@testing-library/user-event";

describe("App Component", function () {
  it("should render the converter with default initial values", () => {
    renderWithRedux(<App />);
    const [leftInput, rightInput] = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    expect(leftInput).not.toBeDisabled();
    expect(leftInput).toHaveValue(100);
    expect(rightInput).toBeDisabled();
    expect(rightInput).toHaveValue(0);

    const leftBlock = screen.getByText(/у меня есть/i).closest(".converter") as HTMLElement;
    const activeCurrencyLeftBlock = within(leftBlock).getByText("RUR");
    const rightBlock = screen.getByText(/хочу приобрести/i).closest(".converter") as HTMLElement;
    const activeCurrencyRightBlock = within(rightBlock).getByText("RUR");

    expect(activeCurrencyRightBlock).not.toHaveClass("active");
    expect(activeCurrencyLeftBlock).toHaveClass("active");
  });

  it("should display main currencies switchers after data loading", async () => {
    renderWithRedux(<App />);

    const leftBlockLabel = await screen.findByText(/у меня есть/i);
    const leftBlock = leftBlockLabel.closest(".converter") as HTMLElement;
    const rightBlockLabel = await screen.findByText(/хочу приобрести/i);
    const rightBlock = rightBlockLabel.closest(".converter") as HTMLElement;

    expect(within(leftBlock).getByText("RUR")).toBeInTheDocument();
    expect(within(leftBlock).getByText("USD")).toBeInTheDocument();
    expect(within(leftBlock).getByText("EUR")).toBeInTheDocument();
    expect(within(leftBlock).getByText("JPY")).toBeInTheDocument();
    expect(within(leftBlock).getByText("KZT")).toBeInTheDocument();
    expect(within(leftBlock).getByText("CAD")).toBeInTheDocument();

    expect(within(rightBlock).getByText("RUR")).toBeInTheDocument();
    expect(within(rightBlock).getByText("USD")).toBeInTheDocument();
    expect(within(rightBlock).getByText("EUR")).toBeInTheDocument();
    expect(within(rightBlock).getByText("JPY")).toBeInTheDocument();
    expect(within(rightBlock).getByText("KZT")).toBeInTheDocument();
    expect(within(rightBlock).getByText("CAD")).toBeInTheDocument();
  });

  it("should maintain 1:1 ratio for the same currency", async () => {
    const user = userEvent.setup();
    renderWithRedux(<App />);

    const rightBlockLabel = await screen.findByText(/хочу приобрести/i);
    const rightBlock = rightBlockLabel.closest(".converter") as HTMLElement;
    const rurButton = within(rightBlock).getByText("RUR");
    await user.click(rurButton);
    const [leftInput, rightInput] = screen.getAllByRole("spinbutton") as HTMLInputElement[];

    expect(leftInput).toHaveValue(100);
    await waitFor(() => {
      expect(rightInput).toHaveValue(100);
    });
  });

  it("right input cannot be edited by user", async () => {
    const user = userEvent.setup();
    renderWithRedux(<App />);
    const [leftInput, rightInput] = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    await waitFor(() => {
      expect(rightInput.value).not.toBe("0.00");
    });

    const before = rightInput.value;

    await user.click(rightInput);
    await user.type(rightInput, "500");

    expect(rightInput.value).toBe(before);
  });

  it("should scale right input", async () => {
    const user = userEvent.setup();
    renderWithRedux(<App />);

    const [leftInput, rightInput] = screen.getAllByRole("spinbutton") as HTMLInputElement[];

    await waitFor(() => {
      expect(rightInput.value).not.toBe("0.00");
    });

    const initialRight = Number(rightInput.value);

    await user.clear(leftInput);
    await user.type(leftInput, "250");

    await waitFor(() => {
      expect(Number(rightInput.value)).toBeCloseTo(initialRight * 2.5, 1);
    });
  });
  it("should validate input to be a number", async () => {
    renderWithRedux(<App />);
    const user = userEvent.setup();

    const leftBlock = screen.getByText(/у меня есть/i).closest(".converter") as HTMLElement;
    const leftInput = within(leftBlock).getByRole("spinbutton") as HTMLInputElement;

    await user.clear(leftInput);
    await user.type(leftInput, "abc-5");

    expect(leftInput.value).not.toBe("abc-5");
  });

  it("should switch active currency on click", async () => {
    renderWithRedux(<App />);
    const user = userEvent.setup();

    const leftBlock = screen.getByText(/у меня есть/i).closest(".converter") as HTMLElement;
    const kztButton = await within(leftBlock).findByText("KZT");
    const jpyButton = await within(leftBlock).findByText("JPY");

    await user.click(kztButton);

    expect(kztButton).toHaveClass("active");
    expect(jpyButton).not.toHaveClass("active");
  });

  it("should swap values on reverse click", async () => {
    renderWithRedux(<App />);
    const user = userEvent.setup();
    const rightBlock = screen.getByText(/хочу приобрести/i).closest(".converter") as HTMLElement;
    const reverseButton = document.querySelector(".direction__reverse") as HTMLElement;
    expect(reverseButton).toBeInTheDocument();

    await user.click(reverseButton);
    expect(within(rightBlock).getByText("RUR")).toHaveClass("active");
  });
});
