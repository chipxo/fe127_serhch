import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/store.tsx";
import { RootState } from "@/app/rootReducer.tsx";
import ErrorMessage from "@/components/common/ErrorMessage.tsx";
import { useEffect } from "react";
import { fetchCategoryProducts } from "@/hooks/fetchCategoryProducts.tsx";
import { useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import NoItems from "@/components/common/NoItems.tsx";
import CommonCard from "@/features/cards/commonCard/CommonCard";

import { isValidImage } from "@/utils/isValidImage";
import CardSkeleton from "@/features/cards/commonCard/CardSkeleton";

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
      <div className="container min-h-[70vh] py-10">
        {error && <ErrorMessage error={error} />}

        <div className="grid grid-cols-home gap-4">
          {loading && <CardSkeleton />}
          {!loading && !error && products && products.length > 0
            ? products.map((product) => (
                <CommonCard key={nanoid()} {...product} />
              ))
            : !loading && !error && <NoItems />}
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
