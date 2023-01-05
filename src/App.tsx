import { CssBaseline, Container, Typography } from "@mui/material";
import Filters from "./components/Filters";
import { Outlet, useLoaderData } from "react-router-dom";

function App() {
  const { brands, categories } = useLoaderData() as {
    brands: string[];
    categories: string[];
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container sx={{ my: 4 }}>
        <header className="App-header">
          <Typography component="h1" variant="h2">
            Product catalogue
          </Typography>
          <Filters categories={categories} brands={brands} />
        </header>
        <main>
          <Outlet />
        </main>
      </Container>
    </div>
  );
}

export default App;
