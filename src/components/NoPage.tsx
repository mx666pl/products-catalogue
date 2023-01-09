import { CssBaseline, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as Warning } from "../assets/warning.svg";

const NoPage = () => {
  return (
    <>
      <CssBaseline />
      <Container sx={{ my: 4, textAlign: "center" }}>
        <header className="App-header">
          <Typography component="h1" variant="h2">
            Page not found.
          </Typography>
        </header>
        <main>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              "& > .icon": {
                maxWidth: "50%",
              },
            }}
          >
            <Warning className="icon" />
            <br />
            Ups! We don't have this page for you
            <br />
            <Link to="/">Go to home page</Link>
          </Box>
        </main>
      </Container>
    </>
  );
};

export default NoPage;
