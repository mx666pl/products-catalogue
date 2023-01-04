import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import { ProductsResponse } from "./types";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { getBrands, getCategories, getProducts } from "./api";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    loader: async (): Promise<{ brands: string[]; categories: string[] }> => {
      return {
        brands: await getBrands(),
        categories: await getCategories(),
      };
    },
    children: [
      {
        index: true,
        element: <ProductsList />,
        loader: async ({ request }): Promise<ProductsResponse> => {
          const url = new URL(request.url);
          return await getProducts(0, 4, url.searchParams.toString());
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
