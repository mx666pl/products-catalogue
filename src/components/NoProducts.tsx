import { Box, Typography } from "@mui/material";
import { ReactComponent as Empty } from "../assets/empty.svg";

const NoProducts = () => {
  return (
    <Box
      sx={{
        pt: 8,
        width: "100%",
        textAlign: "center",
        "& .icon": {
          maxHeight: "200px",
        },
      }}
    >
      <Typography variant="h5" component="div">
        No products
      </Typography>
      <Box
        sx={{
          py: 4,
        }}
      >
        <Empty className="icon" />
      </Box>
    </Box>
  );
};

export default NoProducts;
