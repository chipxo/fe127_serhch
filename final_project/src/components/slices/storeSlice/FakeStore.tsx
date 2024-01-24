import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import StoreCard from "../../containers/cards/StoreCards";
import { fetchProducts } from "../../hooks/fetchProducts";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";
import Filter from "../../containers/nav/Filter";
import Path from "../../common/Path";
import { toRightIcon } from "../../icons/Icons";
import { Link } from "react-router-dom";

const FakeStore: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="mt-20 border-t border-neutral py-10">
      <Filter />
      <Path>
        <Link to="/">Home</Link>
        {toRightIcon} Products
      </Path>
      <div className="container relative">
        {loading && <Loading />}
        <div className="grid gap-4 md:grid-cols-4">
          {error && <Error error={error} />}
          {!loading &&
            !error &&
            products.map(
              ({ id, category, images, price, title }) =>
                price > 0 &&
                title !== "New Product" &&
                title !== "TestAustomationProduct" && (
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

export default FakeStore;
