import { useState, useEffect, useCallback } from "react";
import { Button, Box } from "@mui/material";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { getProducts } from "../api";
import { Product, ProductsData } from "../types";
import ProductRow from "./ProductRow";
import { LOAD_SIZE } from "../constant";

const ProductsList = () => {
  const { products: initProducts, total } = useLoaderData() as ProductsData;
  const [products, setProducts] = useState<Product[]>(initProducts || []);
  const [searchParams] = useSearchParams();

  const handleLoadMore = useCallback(async () => {
    const displayedProductsCount = products.length;
    const { products: loadedProducts } = await getProducts(
      searchParams.toString(),
      displayedProductsCount,
      displayedProductsCount + LOAD_SIZE
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
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
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
