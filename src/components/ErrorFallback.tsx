import { CssBaseline, Container, Typography, Box } from "@mui/material";
import { ReactComponent as Warning } from "../assets/warning.svg";

const ErrorFallback = () => {
  return (
    <>
      <CssBaseline />
      <Container sx={{ my: 4, textAlign: "center" }}>
        <header className="App-header">
          <Typography component="h1" variant="h2">
            Error with app!
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
            <Typography variant="h5" color="error" component="div">
              We have error in app
            </Typography>
          </Box>
        </main>
      </Container>
    </>
  );
};

export default ErrorFallback;
