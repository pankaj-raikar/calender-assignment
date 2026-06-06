import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";

test("renders the production calendar panel", () => {
  const html = renderToStaticMarkup(<App />);

  expect(html).toContain('aria-label="Production calendar workspace"');
});
