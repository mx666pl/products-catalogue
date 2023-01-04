import { render, screen } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters component", () => {
  test("should render properly", () => {
    render(<>Filtry</>);

    expect(screen.getByText("Filtry")).toBeInTheDocument();
  });
});
