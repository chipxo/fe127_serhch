import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Button from "../../common/buttons/Button.tsx";
import { Error, Loading } from "../../common/loading && error/LoadingError.tsx";
import { fetchProduct } from "../../hooks/fetchProduct.tsx";
import {
  cartDelete,
  cartIcon,
  toRightIcon,
} from "../../common/icons/Icons.tsx";
import { RootState } from "../../redux/rootReducer.tsx";
import { useAppDispatch } from "../../redux/store.tsx";
import { addAmount, decreaseAmount } from "../amount/amountSlice.tsx";
import Path from "../../common/Path.tsx";

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
    window.scrollTo(0, 0);
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
    <section className="relative">
      <div className="absolute left-0 top-16 w-full">
        {/* <Path>
          <Link to="/">Home</Link>
          {toRightIcon}
          <Link to="/products">Products</Link>
          {toRightIcon}
          {title}
        </Path> */}
      </div>
      <div className="container">
        <div className="grid grid-cols-[1fr_0.5fr] gap-x-10 rounded-md border border-neutral bg-base-100 px-10 py-6 shadow-lg">
          <div className="text-md flex h-full flex-col gap-y-6 md:text-lg lg:text-xl">
            <p className="badge badge-accent badge-lg p-4 font-semibold">
              {category?.name}
            </p>
            <h2 className="mt-8 text-3xl font-semibold tracking-wider">
              {title}
            </h2>
            {/* {checked && cartChecked} */}
            <p className="tracking-wide">{description}</p>
            <p className="mt-4">
              Price:
              <br />
              <span className="text-5xl font-semibold text-accent">
                {price}$
              </span>
            </p>
            <div className="grid h-full grid-cols-2 items-end gap-x-4">
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
          <figure className="grid rounded-md border border-neutral">
            <div className="p-3">
              <img
                src={images?.[0]}
                className="h-full w-full cursor-pointer rounded-md object-cover"
                alt={title}
              />
            </div>

            {/* <div className="divider my-2 h-[1px] bg-neutral" /> */}
            <div className="grid w-full grid-cols-3 gap-x-3 border-t border-neutral p-3">
              <img
                src={images?.[1]}
                alt={title}
                className="h-full w-full cursor-pointer rounded-md object-cover"
              />
              <img
                src={images?.[2]}
                alt={title}
                className="h-full w-full cursor-pointer rounded-md object-cover"
              />
              <img
                src={images?.[0]}
                alt={title}
                className="h-full w-full cursor-pointer rounded-md object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default SoloCard;
