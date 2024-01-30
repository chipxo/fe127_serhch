import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store.tsx";
import { RootState } from "../../../app/rootReducer.tsx";
import { Loading, Error } from "../../../components/common/LoadingError.tsx";
import CommonCard from "../../cards/CommonCard.tsx";
import { useEffect } from "react";
import { fetchCategoryProducts } from "../../../hooks/fetchCategoryProducts.tsx";
import { useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import NoItems from "../../../components/common/NoItems.tsx";

const CategoryProducts = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.categoryProducts,
  );

  const { categoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCategoryProducts(`${categoryId}`));
  }, [dispatch, categoryId]);

  return (
    <section>
      <div className="container min-h-[70vh]">
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        )}

        {error && <Error error={error} />}

        {!loading && !error && products && products.length > 0 ? (
          <div className="grid grid-cols-home gap-4">
            {products?.map(({ id, title, images, category, price }) => (
              <CommonCard
                key={nanoid()}
                id={id}
                title={title}
                price={price}
                images={images}
                category={category}
              />
            ))}
          </div>
        ) : (
          !loading && !error && <NoItems />
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
