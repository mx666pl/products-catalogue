import { Button, Card, Grid, Typography } from "@mui/material";
import { width } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import { blob } from "stream/consumers";
import { Product } from "../types";

const ProductsList = () => {
  const products = useLoaderData() as Product[];

  return (
    <>
      {products.map((product) => {
        return (
          <Card key={product.id} sx={{ my: 4, px: 1, py: 2 }}>
            <Grid container spacing={6}>
              <Grid item sm={12} md={5} sx={{ height: "350px" }}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectPosition: "50% 50%",
                    borderRadius: "10px",
                  }}
                />
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
                <Typography variant="subtitle2">
                  {product.description}
                </Typography>
                <br />
                <Button variant="contained" size="large">
                  Some action
                </Button>
              </Grid>
            </Grid>
          </Card>
        );
      })}

      <Button
        variant="outlined"
        onClick={() => {
          alert("Load More");
        }}
      >
        Load more
      </Button>
    </>
  );
};

export default ProductsList;
