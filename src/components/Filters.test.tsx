import { render, screen } from "../testRenderWrapper";
import userEvent from "@testing-library/user-event";
import Filters from "./Filters";

const routerLoaderData = {
  brands: ["Brand 1", "Brand 2"],
  categories: ["category-1", "category-2"],
};

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useRouteLoaderData: () => routerLoaderData,
  };
});

describe("Filters component", () => {
  test("should render properly", () => {
    render(<Filters />);

    expect(screen.getByLabelText("Brand")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
  });

  test("should have correct brands options from router loader", async () => {
    render(<Filters />);

    userEvent.click(screen.getByLabelText("Brand"));
    for (const brand of routerLoaderData.brands) {
      expect(screen.getByText(brand)).toBeInTheDocument();
    }
  });

  test("should have correct categories options from router loader", async () => {
    render(<Filters />);

    const optionLabel = (label: string) => {
      const withoutDash = label.replace("-", " ");
      return withoutDash.charAt(0).toUpperCase() + withoutDash.slice(1);
    };

    userEvent.click(screen.getByLabelText("Category"));
    for (const category of routerLoaderData.categories) {
      expect(screen.getByText(optionLabel(category))).toBeInTheDocument();
    }
  });
});
