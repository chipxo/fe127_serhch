import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import { fetchProducts } from "../../hooks/fetchProducts";
import { cartChecked, cartDelete, cartIcon, cartUser } from "../../icons/Icons";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";
import { addAmount, decreaseAmount } from "../../slices/amount/amountSlice";

export const SoloCard = () => {
  const [checked, setChecked] = useState(false);
  const { prodId } = useParams();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem(`${prodId}`)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  const product = products.find((product) => product.id === Number(prodId));

  if (!product) {
    return <p>Product not found</p>;
  }

  const {
    id,
    title,
    description,
    images,
    price,
    rating,
    stock,
    brand,
    discountPercentage,
  } = product;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const handleAddBtn = () => {
    setChecked(true);
    products && localStorage.setItem(`${id}`, `${title}`);
    dispatch(addAmount());
  };

  const handleDelBtn = (id: number) => {
    setChecked(false);
    products && localStorage.removeItem(`${id}`);
    dispatch(decreaseAmount());
  };

  return (
    <div className="container">
      <div className="grid gap-x-10 grid-cols-2 border border-neutral rounded-md p-4 shadow-2xl bg-base-100">
        <div className="grid gap-y-6 items-start">
          <div className="border border-neutral p-4 rounded-md h-fit">
            <h2 className="card-title text-3xl">
              {title}
              {checked && <p>{cartChecked}</p>}
            </h2>
            <p className="text-lg">by {brand}</p>
          </div>
          <div className="border text-2xl border-neutral p-4 rounded-md grid gap-y-6 h-full">
            <p>{description}</p>
            <p>
              Price:
              <br />
              <span className="opacity-50 line-through">
                {Math.round(price + price / discountPercentage)}$
              </span>
              <br />
              <span className="text-accent text-5xl font-semibold">
                {price}$
              </span>
            </p>
            <p className="flex items-center">
              ⭐ {rating}
              <span className="badge badge-outline border-2 border-secondary text-xl p-4 ml-4">
                {cartUser}
                {stock}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-x-4 items-end">
              <Button
                text={cartIcon}
                color="primary"
                onClick={handleAddBtn}
                disabled={checked}
              />
              <Button
                disabled={!checked}
                text={cartDelete}
                color="secondary"
                onClick={() => handleDelBtn(id)}
              />
            </div>
          </div>
        </div>
        <figure>
          <img
            src={images?.[0]}
            className="rounded-md w-full h-full object-cover py-4 bg-white"
            alt={title}
          />
        </figure>
      </div>
    </div>
  );
};
