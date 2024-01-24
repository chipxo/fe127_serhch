import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Error, Loading } from "../../common/loading && error/LoadingError.tsx";
import StoreCard from "../cards/StoreCard.tsx";
import { fetchProducts } from "../../hooks/fetchProducts.tsx";
import { RootState } from "../../reduxStore/rootReducer.tsx";
import { useAppDispatch } from "../../reduxStore/store.tsx";
import Filter from "../../containers/nav/Filter.tsx";
import Path from "../../common/Path.tsx";
import { toRightIcon } from "../../icons/Icons.tsx";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, [dispatch]);

  const isValidImage = (url: string) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.width > 0 && img.height > 0;
  };

  return (
    <section className="mt-20 border-t border-neutral py-10">
      {/* <Filter /> */}
      <Path>
        <Link to="/">Home</Link>
        {toRightIcon} Products
      </Path>
      <div className="container relative">
        {loading && <Loading />}
        <div className="grid-cols-products grid gap-4">
          {error && <Error error={error} />}
          {!loading &&
            !error &&
            products?.map(
              ({ id, category, images, price, title }) =>
                isValidImage(images[0]) && (
                  <div key={id}>
                    <StoreCard
                      id={id}
                      title={title}
                      category={category}
                      price={price}
                      images={images}
                    />
                  </div>
                ),
            )}
        </div>
      </div>
    </section>
  );
};

export default Products;
