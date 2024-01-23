import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import StoreCard from "../../containers/cards/StoreCards";
import { fetchProducts } from "../../hooks/fetchProducts";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";

const FakeStore: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="">
      <div className="container">
        {loading && <Loading />}
        <div className="mt-14 grid md:grid-cols-2 gap-14 xl:grid-cols-3">
          {error && <Error error={error} />}
          {!loading &&
            !error &&
            products.map(
              ({
                discountPercentage,
                id,
                category,
                images,
                price,
                rating,
                stock,
                title,
              }) => (
                <div key={id}>
                  <StoreCard
                    discountPercentage={discountPercentage}
                    images={images}
                    category={category}
                    rating={rating}
                    id={id}
                    price={price}
                    stock={stock}
                    title={title}
                  />
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default FakeStore;
