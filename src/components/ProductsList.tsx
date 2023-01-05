import { useState, useEffect, useCallback } from "react";
import { Button, Card, Fade, Grid, Typography, Box } from "@mui/material";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { getProducts } from "../api";
import { Product, ProductsResponse } from "../types";

const ProductsList = () => {
  const { products: initProducts, total } = useLoaderData() as ProductsResponse;
  const [products, setProducts] = useState<Product[]>(initProducts);
  const [searchParams] = useSearchParams();
  const handleLoadMore = useCallback(async () => {
    const displayedProductsCount = products.length;
    const { products: loadedProducts } = await getProducts(
      displayedProductsCount,
      displayedProductsCount + 4,
      searchParams.toString()
    );

    setProducts((prev) => [...prev, ...loadedProducts]);
  }, [products, setProducts, searchParams]);

  useEffect(() => {
    setProducts(initProducts);
  }, [initProducts]);

  return (
    <>
      {!products.length ? (
        <Box>No products</Box>
      ) : (
        <>
          {products.map((product) => {
            return (
              <Fade in key={product.id} timeout={1000}>
                <Card sx={{ my: 4, px: 2, py: 2 }}>
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
                      {product.stock
                        ? `in stock: ${product.stock}`
                        : `out of stock`}
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
                      <>{product.images && product.images.length}</>
                    </Grid>
                  </Grid>
                </Card>
              </Fade>
            );
          })}
          {products.length < total && (
            <Button variant="outlined" onClick={handleLoadMore}>
              Load more
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default ProductsList;
