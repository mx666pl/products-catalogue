import { Button, Card, Fade, Grid, Typography } from "@mui/material";
import { Product } from "../types";

const ProductRow = ({ product }: { product: Product }) => {
  return (
    <Fade in timeout={1000}>
      <Card sx={{ my: 4, px: 2, py: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid
            item
            sm={12}
            md={5}
            sx={{
              height: {
                md: "350px",
              },
              "& > img": {
                objectFit: "cover",
                width: "100%",
                height: "100%",
                display: "block",
                objectPosition: "50% 50%",
                borderRadius: "10px",
              },
            }}
          >
            <img src={product.thumbnail} alt={product.title} />
          </Grid>
          <Grid item sm={12} md={7}>
            <Typography component="h3" variant="h4">
              {product.title}
            </Typography>
            category: {product.category}
            brand: {product.brand}
            <br />
            price: <strong>${product.price}</strong>
            <br />
            {product.stock ? `in stock: ${product.stock}` : `out of stock`}
            <br />
            rating: {product.rating}
            <br />
            <br />
            <Typography variant="subtitle2">{product.description}</Typography>
            <br />
            <Button variant="contained" size="large">
              Some action
            </Button>
            <>{product.images && product.images.length}</>
          </Grid>
        </Grid>
      </Card>
    </Fade>
  );
};

export default ProductRow;
