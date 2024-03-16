import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../utils/product-api";
import { Product } from "../types/product";

type Props = {
  pageLimit: number;
  searchTerm?: string;
};

export function useProducts({ pageLimit, searchTerm }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState<
    number | undefined
  >();

  const fetchProducts = useCallback(
    async ({
      offset,
      isNextPage = false,
    }: {
      offset: number;
      isNextPage?: boolean;
    }) => {
      try {
        setIsLoading(true);

        const response = await getProducts({
          limit: pageLimit,
          offset,
          searchTerm,
        });

        if (isNextPage) {
          setProducts((currProducts) => {
            return [...currProducts, ...response.products];
          });
        } else {
          setProducts(response.products);
        }
        setTotalNumberOfProducts(response.count);
      } catch (err) {
        console.error("Something went wrong during the /products request", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [pageLimit, searchTerm]
  );

  useEffect(() => {
    fetchProducts({ offset: 0 });
  }, [fetchProducts, searchTerm]);

  const loadNextPage = useCallback(() => {
    fetchProducts({ offset: products.length, isNextPage: true });
  }, [fetchProducts, products.length]);

  return {
    products,
    isError,
    isLoading,
    loadNextPage,
    hasNextPage:
      totalNumberOfProducts === undefined ||
      totalNumberOfProducts > products.length,
  };
}
