import {
  Button,
  Card,
  Box,
  Slide,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Product } from "../types";

const ProductRow = ({ product }: { product: Product }) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Slide in timeout={300} direction="up">
      <Card sx={{ my: 4, px: 2, py: 2, borderRadius: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item sm={12} md={5}>
            <Box
              sx={{
                position: "relative",
                height: {
                  md: "320px",
                },
                "& > img": {
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectPosition: "50% 50%",
                  borderRadius: 2,
                  cursor: "pointer",
                },
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                onClick={() =>
                  enqueueSnackbar(
                    `Some not implemented action with other ${product.images.length} images. Like lightbox or carousel`,
                    {
                      variant: "info",
                    }
                  )
                }
              />
              {product.discountPercentage && (
                <Box
                  sx={(theme) => ({
                    px: 2,
                    py: 1,
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    color: "#fff",
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: 5,
                  })}
                >
                  <strong>- {Math.round(product.discountPercentage)}%</strong>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item sm={12} md={7}>
            <Box>
              <Typography component="h3" variant="h4">
                {product.title}
              </Typography>
            </Box>
            <Box>
              <Rating value={product.rating} precision={0.5} readOnly />
            </Box>
            <Box sx={{ my: 1 }}>
              <div>
                Brand: <strong>{product.brand}</strong> | category:
                <strong>{product.category}</strong>
              </div>
            </Box>
            <Box sx={{ my: 1 }}>
              Price: <strong>${product.price}</strong>
            </Box>
            <Box>
              {product.stock ? `in stock: ${product.stock}` : `out of stock`}
            </Box>
            <Box sx={{ my: 2 }}>
              Description:{" "}
              <Typography component="span" variant="subtitle1">
                {product.description}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  enqueueSnackbar(
                    `Some not implemented action with ${product.title} product. Like: details or add to basket`,
                    {
                      variant: "success",
                    }
                  )
                }
              >
                Some action
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Slide>
  );
};

export default ProductRow;
