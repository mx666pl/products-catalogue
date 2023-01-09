import { render, screen } from "../testRenderWrapper";
import userEvent from "@testing-library/user-event";
import { Product } from "../types";
import ProductsList from "./ProductsList";
import { useLoaderData } from "react-router-dom";
import { LOAD_SIZE } from "../constant";

const generateProducts = (start: number, end: number): Product[] => {
  const products: Product[] = [];
  for (let i = start; i <= end; i++) {
    products.push({
      id: i,
      title: `Product ${i}`,
      description: `Description ${i}`,
      brand: `Brand ${i % 5}`,
      category: `Category ${i % 3}`,
      discountPercentage: 2,
      images: [],
      price: (i % 3) * 100,
      rating: 3,
      stock: 100,
      thumbnail: "http://thumbnail.url/image.jpg",
    });
  }

  return products;
};

jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

describe("Products component", () => {
  test("should render properly with products from router loader", () => {
    const expectedProducts = generateProducts(1, LOAD_SIZE);
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      products: expectedProducts,
      total: LOAD_SIZE + 3,
    });

    render(<ProductsList />);

    for (const product of expectedProducts) {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    }
  });

  test("should have a load button if more products exist", () => {
    const expectedProducts = generateProducts(1, LOAD_SIZE);
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      products: expectedProducts,
      total: LOAD_SIZE + 3,
    });

    render(<ProductsList />);

    expect(screen.getByText("Load more")).toBeInTheDocument();
  });

  test("should not have a load button if no more products exist", () => {
    const expectedProducts = generateProducts(1, LOAD_SIZE);
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      products: expectedProducts,
      total: LOAD_SIZE,
    });

    render(<ProductsList />);

    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });

  test("should show no products info if products collection empty", () => {
    const expectedProducts: Product[] = [];
    (useLoaderData as jest.Mock).mockReturnValueOnce({
      products: expectedProducts,
      total: LOAD_SIZE,
    });

    render(<ProductsList />);

    expect(screen.getByText("No products")).toBeInTheDocument();
  });

  // TODO implement load more test
});
