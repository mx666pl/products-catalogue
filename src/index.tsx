import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { StyledEngineProvider, CircularProgress, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ProductsData } from "./types";
import { getBrands, getCategories, getProducts } from "./api";
import ErrorFallback from "./components/ErrorFallback";

const App = lazy(() => import("./App"));
const ProductsList = lazy(() => import("./components/ProductsList"));
const NoPage = lazy(() => import("./components/NoPage"));

const router = createHashRouter([
  {
    path: "/",
    id: "root",
    element: (
      <Suspense fallback={<></>}>
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
          <Suspense
            fallback={
              <Box
                sx={{
                  textAlign: "center",
                  py: 10,
                }}
              >
                <CircularProgress size={80} />
                <br />
                Loading products
              </Box>
            }
          >
            <ProductsList />
          </Suspense>
        ),
        loader: async ({ request }): Promise<ProductsData> => {
          const url = new URL(request.url);
          return await getProducts(url.searchParams.toString());
        },
      },
    ],
    errorElement: <NoPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
      >
        <StyledEngineProvider injectFirst>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </StyledEngineProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
