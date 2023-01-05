import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ProductsData } from "./types";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { getBrands, getCategories, getProducts } from "./api";

const App = lazy(() => import("./App"));
const ProductsList = lazy(() => import("./components/ProductsList"));

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<>App loading...</>}>
        <App />
      </Suspense>
    ),
    loader: async (): Promise<{ brands: string[]; categories: string[] }> => {
      return {
        brands: await getBrands(),
        categories: await getCategories(),
      };
    },
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<>Products loading...</>}>
            <ProductsList />
          </Suspense>
        ),
        loader: async ({ request }): Promise<ProductsData> => {
          const url = new URL(request.url);
          return await getProducts(url.searchParams.toString());
        },
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
