import { v4 as generateUuid } from "uuid";
import { Product } from "../types/product";

type ProductResponse = Omit<Product, "uuid">;

type ProductsResponse = {
  products: ProductResponse[];
  count: number;
};

export async function getProducts({
  limit,
  offset,
  searchTerm,
}: {
  limit: number;
  offset: number;
  searchTerm?: string;
}): Promise<{
  products: Product[];
  count: number;
}> {
  const params = {
    limit: limit.toString(),
    offset: offset.toString(),
    ...(searchTerm && { searchTerm }),
  };
  const searchParams = new URLSearchParams(params);

  const response = await fetch("/products?" + searchParams);

  const { count, products } = (await response.json()) as ProductsResponse;

  if (!Number.isInteger(count) || !Array.isArray(products)) {
    throw new Error("Product response is invalid");
  }

  return {
    products: parseProducts(products),
    count,
  };
}

function parseProducts(products: ProductResponse[]): Product[] {
  return products.map((productResponse) => ({
    ...productResponse,
    imagePath: removeAngledBrackets(productResponse.imagePath),
    id: generateUuid(),
  }));
}

function removeAngledBrackets(str: string): string {
  return str.replace(/[<>]/g, "");
}
