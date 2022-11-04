import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
  RenderOptions,
} from "@testing-library/react";
import React from "react";
import { AppProviders } from "../context";

async function render(
  ui: React.ReactElement,
  renderOptions: RenderOptions = {},
) {
  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders,
      ...renderOptions,
    }),
  };

  await waitForLoadingToFinish();

  return returnValue;
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  );

export * from "@testing-library/react";
export { render, waitForLoadingToFinish };
