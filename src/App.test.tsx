import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";
import OrderRow from "./components/OrderRow";

test("renders the production calendar panel", () => {
  const html = renderToStaticMarkup(<App />);

  expect(html).toContain('aria-label="Production calendar workspace"');
});

test("does not render the removed mobile calendar list switch", () => {
  const html = renderToStaticMarkup(<App />);

  expect(html).toContain('aria-label="Open search"');
  expect(html).not.toContain('aria-label="Calendar and list view selector"');
});

test("order row keeps the progress ring circular and percentage aligned", () => {
  const html = renderToStaticMarkup(
    <OrderRow
      index={1}
      code="F36FCFE1"
      status="Pending"
      duration="4 days"
      progress={100}
      orderId="order-1"
    />,
  );

  expect(html).toContain("grid-cols-[32px_minmax(72px,1fr)_minmax(72px,96px)_52px_22px_48px]");
  expect(html).toContain("min-w-0 truncate");
  expect(html).toContain("block h-5 w-5 shrink-0");
  expect(html).toContain("justify-self-center rounded-full border-4");
  expect(html).toContain("whitespace-nowrap text-right");
  expect(html).toContain("text-right tabular-nums");
});
