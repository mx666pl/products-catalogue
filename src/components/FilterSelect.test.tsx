import { render, screen } from "../testRenderWrapper";
import userEvent from "@testing-library/user-event";
import FilterSelect from "./FilterSelect";
import { TextField } from "@mui/material";

const options = ["Option 1", "Option 2", "Option 3"];
const searchQueryName = "brand";
const setupTest = () =>
  render(
    <FilterSelect
      searchQueryName={searchQueryName}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Some filter"
          placeholder="Select option"
          variant="standard"
          size="medium"
        />
      )}
    />
  );

describe("FilterSelect component", () => {
  test("should set searchQuery param if option selected", () => {
    setupTest();

    userEvent.click(screen.getByLabelText("Some filter"));
    userEvent.click(screen.getByText(options[0]));

    const expectedSearchParams = new URLSearchParams();
    expectedSearchParams.append(searchQueryName, options[0]);

    expect(window.location.hash).toBe(`#/?${expectedSearchParams.toString()}`);
  });

  test("should remove searchQuery param on clear", () => {
    setupTest();

    userEvent.click(screen.getByLabelText("Some filter"));
    userEvent.click(screen.getByText(options[0]));

    const expectedSearchParams = new URLSearchParams();
    expectedSearchParams.append(searchQueryName, options[0]);

    expect(window.location.hash).toBe(`#/?${expectedSearchParams.toString()}`);

    userEvent.click(screen.getByLabelText("Clear"));

    expect(window.location.hash).toBe(`#/`);
  });
});
