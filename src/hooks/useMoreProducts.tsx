import { useSnackbar } from "notistack";
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api";
import { LOAD_SIZE } from "../constant";
import { Product } from "../types";

const useMoreProducts = (): {
  isLoading: boolean;
  loadMore: (startFrom: number) => Promise<Product[] | undefined>;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const loadMore = useCallback(
    async (startFrom: number) => {
      setIsLoading(true);
      try {
        const { products } = await getProducts(
          searchParams.toString(),
          startFrom,
          startFrom + LOAD_SIZE
        );
        return products;
      } catch (e) {
        enqueueSnackbar(
          `We have problem with load more products here.
          Please wait a moment and try again.`,
          {
            variant: "error",
          }
        );
      } finally {
        setIsLoading(false);
      }
    },
    [searchParams, enqueueSnackbar]
  );

  return { isLoading, loadMore };
};

export default useMoreProducts;
