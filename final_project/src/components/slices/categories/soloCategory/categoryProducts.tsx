import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { useAppDispatch } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { Loading, Error } from "../../../common/loading && error/LoadingError";
import { nanoid } from "@reduxjs/toolkit";
import { fetchCategoryProducts } from "../../../hooks/fetchCategoryProducts";

const ProductsCategory = () => {
  const dispatch = useAppDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.productCategory,
  );
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryId as string));
  }, [dispatch, categoryId]);

  return (
    <div>
      {loading && <Loading />}
      {error && !product && <Error error={error} />}
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
