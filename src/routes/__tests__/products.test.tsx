import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Products } from "../products";
import "../../mocks/intersection-observer";

describe("Products", () => {
  test("Renders products", async () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    const products = await waitFor(() => screen.getAllByTestId("product"));

    expect(products).toHaveLength(6);
    expect(products[0]).toHaveTextContent("Level up");
    expect(products[1]).toHaveTextContent("Game on");
  });

  test("Search - Finds a product", async () => {
    render(
      <MemoryRouter initialEntries={["/products?search=Level"]}>
        <Products />
      </MemoryRouter>
    );

    const products = await waitFor(() => screen.getAllByTestId("product"));

    expect(products).toHaveLength(1);
    expect(products[0]).toHaveTextContent("Level up");
  });

  test("Search - Informs user when no results are found", async () => {
    render(
      <MemoryRouter initialEntries={["/products?search=asdfasdfasdf"]}>
        <Products />
      </MemoryRouter>
    );

    const noResultsIndication = await waitFor(() =>
      screen.getByText("No results found")
    );
    expect(noResultsIndication).toBeInTheDocument();
  });
});
