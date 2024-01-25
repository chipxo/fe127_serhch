import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Error, Loading } from "../../common/loading && error/LoadingError.tsx";
import StoreCard from "../cards/StoreCard.tsx";
import { fetchProducts } from "../../hooks/fetchProducts.tsx";
import { RootState } from "../../redux/rootReducer.tsx";
import { useAppDispatch } from "../../redux/store.tsx";
import Filter from "../../containers/nav/Filter.tsx";
import Path from "../../common/Path.tsx";
import { toRightIcon } from "../../common/icons/Icons.tsx";
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

  return (
    <section className="mt-20 border-t border-neutral py-10">
      {/* <Filter /> */}
      <Path>
        <Link to="/">Home</Link>
        {toRightIcon} Products
      </Path>
      <div className="container relative">
        {loading && <Loading />}
        <div className="grid grid-cols-products gap-4">
          {error && <Error error={error} />}
          {!loading && !error && products && <StoreCard products={products} />}
        </div>
      </div>
    </section>
  );
};

export default Products;
