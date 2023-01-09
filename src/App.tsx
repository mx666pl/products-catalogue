import { CssBaseline, Container, Typography } from "@mui/material";
import Filters from "./components/Filters";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ my: 4 }}>
        <header className="App-header">
          <Typography component="h1" variant="h2">
            Product catalogue
          </Typography>
          <Filters />
        </header>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
}

export default App;
