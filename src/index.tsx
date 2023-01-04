import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import { Product } from "./types";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    loader: async (): Promise<{ brands: string[]; categories: string[] }> => {
      const categoriesResponse = await fetch(
        "http://localhost:3010/categories"
      );
      const categories = (await categoriesResponse.json()) as string[];
      const brandsResponse = await fetch("http://localhost:3010/brands");
      const brands = (await brandsResponse.json()) as string[];

      return {
        brands,
        categories,
      };
    },
    children: [
      {
        index: true,
        element: <ProductsList />,
        loader: async ({ request }): Promise<Product[]> => {
          const url = new URL(request.url);
          url.searchParams.append("_limit", "5");
          url.searchParams.append("_page", "1");
          const response = await fetch(
            `http://localhost:3010/products${url.search}`
          );
          console.log(response.headers.get("x-total-count"));
          console.log(response.headers.get("Link"));
          const products = await response.json();

          return products;
        },
      },
      {
        path: ":category",
        element: <>Produkty kategoria</>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
