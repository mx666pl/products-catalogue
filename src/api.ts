import { ProductsResponse } from "./types";

export const getProducts = async (
  start: number = 0,
  end: number = 4,
  filters?: string
): Promise<ProductsResponse> => {
  const url = new URL(`http://localhost:3010/products?${filters}`);
  url.searchParams.append("_start", start.toString());
  url.searchParams.set("_end", end.toString());

  const response = await fetch(url.toString());
  const products = await response.json();
  const total = Number(response.headers.get("x-total-count") || 4);

  return {
    products,
    total,
  };
};

export const getCategories = async () => {
  const categoriesResponse = await fetch("http://localhost:3010/categories");
  return (await categoriesResponse.json()) as string[];
};

export const getBrands = async () => {
  const brandsResponse = await fetch("http://localhost:3010/brands");
  return (await brandsResponse.json()) as string[];
};
