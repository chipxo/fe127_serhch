import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import { fetchProduct } from "../../hooks/fetchProduct";
import { cartChecked, cartDelete, cartIcon } from "../../icons/Icons";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";
import { addAmount, decreaseAmount } from "../../slices/amount/amountSlice";

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

  useEffect(() => {
    if (localStorage.getItem(`${prodId}`)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  if (!product) {
    return <p>Product not found</p>;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { id, title, price, description, category, images } = product;

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
            <h2 className="font-semibold text-3xl w-5/6">
              {title}
              {checked && cartChecked}
            </h2>
          </div>
          <div className="border text-xl border-neutral p-4 rounded-md flex flex-col justify-between gap-y-6 h-full">
            <p className="badge badge-outline border-primary p-4 text-lg font-semibold">
              {category.name}
            </p>
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
                disabled={checked}
                onClick={handleAddBtn}
              />
              <Button
                onClick={() => handleDelBtn(id)}
                text={cartDelete}
                color="secondary"
                disabled={!checked}
              />
            </div>
          </div>
        </div>
        <figure className="flex flex-col justify-between border border-neutral rounded-md">
          <div className="h-full border-b-2 border-neutral p-3">
            <img
              src={images?.[0]}
              className="rounded-md h-full object-cover"
              alt={title}
            />
          </div>
          {/* <div className="divider my-2 h-[1px] bg-neutral" /> */}
          <div className="grid grid-cols-3 w-full gap-x-3 p-3">
            <img src={images?.[1]} alt="" className="rounded-md" />
            <img src={images?.[2]} alt="" className="rounded-md" />
            <img src={images?.[0]} alt="" className="rounded-md" />
          </div>
        </figure>
      </div>
    </div>
  );
};

export default SoloCard;
