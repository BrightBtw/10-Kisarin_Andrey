import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../components/app/store.ts";

export function renderWithRedux(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>,
    ...options,
  });
}
