import { Grid, TextField } from "@mui/material";
import FilterSelect from "./FilterSelect";

const Filters = ({
  categories,
  brands,
}: {
  categories: string[];
  brands: string[];
}) => {
  return (
    <Grid container spacing={4} mt={2}>
      <Grid item xs={12} md={6}>
        <FilterSelect
          searchQueryName="brand"
          options={brands}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Brand"
              placeholder="Select brand"
              variant="standard"
              size="medium"
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FilterSelect
          searchQueryName="category"
          options={categories}
          getOptionLabel={(o) => {
            const withoutDash = o.replace("-", " ");
            return withoutDash.charAt(0).toUpperCase() + withoutDash.slice(1);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              placeholder="Select category"
              variant="standard"
              size="medium"
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
