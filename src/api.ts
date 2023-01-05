import { LOAD_SIZE } from "./constant";
import { ProductsData } from "./types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BRANDS_ENDPOINT = "/brands";
const CATEGORIES_ENDPOINT = "/categories";
const PRODUCTS_ENDPOINT = "/products";

export const getBrands = async (): Promise<string[]> => {
  const brandsResponse = await fetch(`${API_BASE_URL}${BRANDS_ENDPOINT}`);
  return await brandsResponse.json();
};

export const getCategories = async (): Promise<string[]> => {
  const categoriesResponse = await fetch(
    `${API_BASE_URL}${CATEGORIES_ENDPOINT}`
  );
  return await categoriesResponse.json();
};

export const getProducts = async (
  filters: string,
  start: number = 0,
  end: number = LOAD_SIZE
): Promise<ProductsData> => {
  const url = new URL(`${API_BASE_URL}${PRODUCTS_ENDPOINT}?${filters}`);
  url.searchParams.append("_start", start.toString());
  url.searchParams.set("_end", end.toString());

  const response = await fetch(url.toString());
  const products = await response.json();
  const total = Number(response.headers.get("x-total-count") || LOAD_SIZE);

  return {
    products,
    total,
  };
};
