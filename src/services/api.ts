const PRODUCTS_ENDPOINT = "https://dummyjson.com/products";

export const getProducts = async () => {
  const resp = await fetch(PRODUCTS_ENDPOINT);
  const { products } = await resp.json();

  return products;
};
