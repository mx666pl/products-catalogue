import { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Product, ProductsData } from "../types";
import ProductRow from "./ProductRow";
import useMoreProducts from "../hooks/useMoreProducts";
import NoProducts from "./NoProducts";

const ProductsList = () => {
  const { products: initProducts, total } = useLoaderData() as ProductsData;
  const [products, setProducts] = useState<Product[]>(initProducts || []);
  const { isLoading, loadMore } = useMoreProducts();

  useEffect(() => {
    setProducts(initProducts);
  }, [initProducts]);

  return (
    <>
      {!products.length ? (
        <NoProducts />
      ) : (
        <Box>
          <Box
            sx={{
              pb: 4,
            }}
          >
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </Box>

          {products.length < total && (
            <Box
              sx={{
                pb: 8,
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={async () => {
                  const moreProducts = await loadMore(products.length);
                  moreProducts &&
                    setProducts((prev) => [...prev, ...moreProducts]);
                }}
                sx={{
                  width: "100%",
                }}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                Load more
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductsList;
