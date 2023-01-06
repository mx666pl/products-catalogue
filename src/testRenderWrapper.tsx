import { FunctionComponent, ReactElement, ReactNode } from "react";
import { HashRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { render, RenderOptions } from "@testing-library/react";

const AllProviders: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
      >
        <StyledEngineProvider injectFirst>
          <HashRouter>{children}</HashRouter>
        </StyledEngineProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) =>
  render(ui, {
    wrapper: AllProviders,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
