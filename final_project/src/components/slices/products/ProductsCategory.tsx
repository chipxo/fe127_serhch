import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../../hooks/fetchCategory";
import { Loading, Error } from "../../common/loading && error/LoadingError";
import { nanoid } from "@reduxjs/toolkit";

const ProductsCategory = () => {
  const dispatch = useAppDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.productCategory,
  );

  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategory(categoryId as string));
  }, [dispatch, categoryId]);
  console.log(product);

  return (
    <div>
      {loading && <Loading />}
      {!product && <Error error={error} />}
      {!loading && !error && product && (
        <div key={nanoid()} className="">
          <img src={product.image} alt={product.name} className="w-1/3" />
          <p>{product.name}</p>
        </div>
      )}
    </div>
  );
};

export default ProductsCategory;
