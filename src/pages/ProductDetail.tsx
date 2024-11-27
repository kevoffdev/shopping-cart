import { useParams } from "react-router";

import { useFilter } from "@/hooks/useFilter";
import Layout from "@/layout/Layout";
import CardProduct from "@/components/CardProduct";
import { useCart } from "@/hooks/useCart";

enum TypeStars {
  EMPTYSTAR = "☆",
  FULLSTAR = "★",
}

const ProductDetail = () => {
  const { products } = useFilter();
  const { cart } = useCart();
  const { id } = useParams();

  const product = products?.find((product) => String(product.id) === id);

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center h-full mt-20">
          <h2 className="flex font-bold border-b-2">Product not found</h2>
        </div>
      </Layout>
    );
  }
  const relatedProducts = products?.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );

  const checkProductInCart = cart.some((item) => item.id === product.id);

  const starts = Array.from({ length: 5 }, () => TypeStars.EMPTYSTAR);

  return (
    <Layout>
      <article className="flex justify-center">
        <div className="grid justify-center grid-cols-2 gap-6">
          <CardProduct activeButton={true} isProductInCart={checkProductInCart} product={product} />
          <aside className="p-6 space-y-4 rounded-lg shadow-lg bg-background">
            <p className="text-muted-foreground">{product.description}</p>

            <p className="flex items-center gap-1">
              <span className="font-bold ">Rating:</span>
              {starts.map((star, index) => (
                <span key={index} className={`text-xl text-yellow-500`}>
                  {Math.round(product.rating) > index ? TypeStars.FULLSTAR : star}
                </span>
              ))}
            </p>

            <p className="">
              <span className="font-bold">Brand:</span> {product.brand}
            </p>

            <p
              className={` font-bold ${
                product.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-600"
              }`}
            >
              Availability: {product.availabilityStatus}
            </p>

            <p className="">
              <span className="font-bold">Dimensions:</span>{" "}
              {`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`}{" "}
              cm
            </p>

            <p className="">
              <span className="font-bold">Return Policy:</span> {product.returnPolicy}
            </p>

            <div>
              <h3 className="mb-2 font-bold">Reviews:</h3>
              <ul className="space-y-2">
                {product.reviews.map((review, index) => (
                  <li key={index} className="pb-2 border-b border-muted-foreground">
                    <p className="flex gap-1 font-semibold">
                      {review.reviewerName} -
                      {starts.map((star, index) => (
                        <span key={index} className="text-yellow-500 ">
                          {review.rating > index ? TypeStars.FULLSTAR : star}
                        </span>
                      ))}
                    </p>
                    <p className="italic text-muted-foreground">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>
      <article className="py-5 mt-10">
        <h2 className="text-xl">Related Products</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
          {relatedProducts?.map((product) => (
            <CardProduct key={product.id} activeButton={false} product={product} />
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default ProductDetail;
