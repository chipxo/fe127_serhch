import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { RootState } from "../../store/rootReducer";
import { fetchItems } from "./storeSlice";
import StoreCard from "./StoreCard";

const FakeStore: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className="">
      <div className="container">
        {loading && (
          <div className="grid h-screen place-items-center">
            <span className="loading loading-dots loading-lg scale-125 text-blue-600" />
          </div>
        )}
        <div className="mt-14 grid grid-cols-1 justify-items-center gap-14 xl:grid-cols-3">
          {error && (
            <h2>Error: {typeof error === "string" ? error : "Fetch failed"}</h2>
          )}

          {!loading &&
            !error &&
            products.map(
              ({ category, description, id, image, price, rating, title }) => (
                <StoreCard
                  key={id}
                  category={category}
                  description={description}
                  id={id}
                  image={image}
                  price={price}
                  rating={rating}
                  title={title}
                />
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default FakeStore;
