import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/rootReducer";
import { Loading, Error } from "../../../common/loading && error/LoadingError";
import StoreCard from "../../cards/StoreCard";
import { useEffect } from "react";
import { fetchCategoryProducts } from "../../../hooks/fetchCategoryProducts";
import { useParams } from "react-router-dom";
import { isValidImage } from "../../../functions/isValidImage";
import { nanoid } from "@reduxjs/toolkit";
import BrokenImages from "../../../common/BrokenImages";

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

  const allImagesBroken = !products?.some(({ images }) =>
    isValidImage(images?.[0]),
  );

  return (
    <section>
      <div className="container min-h-[70vh]">
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        )}
        {error && <Error error={error} />}
        {!loading && !error && (
          <>
            {allImagesBroken ? (
              <BrokenImages />
            ) : (
              <div className="grid grid-cols-home gap-4">
                {products?.map(
                  ({ id, title, images, category, price }) =>
                    isValidImage(images?.[0]) && (
                      <StoreCard
                        key={nanoid()}
                        id={id}
                        title={title}
                        price={price}
                        images={images}
                        category={category}
                      />
                    ),
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
