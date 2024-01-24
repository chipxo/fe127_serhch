import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import { fetchProduct } from "../../hooks/fetchProduct";
import { cartChecked, cartDelete, cartIcon } from "../../icons/Icons";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";
import { addAmount, decreaseAmount } from "../amount/amountSlice";

const SoloCard = () => {
  const [checked, setChecked] = useState(false);
  const { prodId } = useParams();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.soloCard,
  );

  useEffect(() => {
    dispatch(fetchProduct(Number(prodId)));
  }, [dispatch]);
  console.log(prodId);

  const { id, title, price, description, category, images } = product;

  if (!product) {
    return <p>Product not found</p>;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const handleAddBtn = () => {
    setChecked(true);
    product && localStorage.setItem(`${id}`, `${title}`);
    dispatch(addAmount());
  };

  const handleDelBtn = (id: number) => {
    setChecked(false);
    product && localStorage.removeItem(`${id}`);
    dispatch(decreaseAmount());
  };

  return (
    <div className="container">
      <div className="grid gap-x-10 grid-cols-2 border border-neutral rounded-md p-4 shadow-2xl bg-base-100">
        <div className="flex flex-col gap-y-6">
          <div className="border border-neutral p-4 rounded-md h-fit">
            <h2 className="card-title text-3xl">
              {title}
              {checked && cartChecked}
            </h2>
          </div>
          <div className="border text-2xl border-neutral p-4 rounded-md flex flex-col justify-between h-full">
            <p>{description}</p>
            <p>
              Price:
              <br />
              <span className="text-accent text-5xl font-semibold">
                {price}$
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
      </div>
      <figure>
        <img
          src={images?.[0]}
          className="rounded-md max-h-[50vh] w-full h-full object-contain py-4 bg-white"
          alt={title}
        />
      </figure>
    </div>
  );
};

export default SoloCard;
