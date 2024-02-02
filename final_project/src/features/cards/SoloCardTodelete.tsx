import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../components/common/buttons/CommonButton.tsx";
import { Error, Loading } from "../../components/common/ErrorMessage.tsx";
import { fetchProduct } from "../../hooks/fetchProduct.tsx";
import { cartDelete, cartIcon } from "../../components/common/icons.tsx";
import { RootState } from "../../app/rootReducer.tsx";
import { useAppDispatch } from "../../app/store.tsx";
import { addAmount, decreaseAmount } from "../amount/amountSlice.tsx";
import { log } from "console";

const SoloCard = () => {
  const [checked, setChecked] = useState(false);
  const [imgs, setImgs] = useState(true);

  const { prodId } = useParams();

  const dispatch = useAppDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.soloCard,
  );

  useEffect(() => {
    dispatch(fetchProduct(Number(prodId)));
  }, [dispatch, prodId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      window.innerWidth <= 1024 ? setImgs(false) : setImgs(true);
    };

    window.addEventListener("resize", handleResize);

    if (localStorage.getItem(`${prodId}`)) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!product || loading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );
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
    <section className="relative min-h-[70vh]">
      <div className="container py-10">
        <div className="border-neutral bg-base-100 flex flex-col-reverse gap-x-10 gap-y-4 rounded-md border px-10 py-6 shadow-lg lg:grid lg:grid-cols-[1fr_0.5fr]">
          <div className="text-md flex h-full flex-col gap-y-4 md:text-lg lg:gap-y-6 lg:text-xl">
            <p className="badge badge-accent lg:badge-lg font-semibold lg:p-4">
              {category?.name}
            </p>
            <h2 className="text-xl font-semibold tracking-wider lg:mt-8 lg:text-3xl">
              {title}
            </h2>
            <p className="text-md tracking-wide">{description}</p>
            <p className="mt-4">
              Price:
              <br />
              <span className="text-2xl font-semibold text-accent lg:text-5xl">
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
                color="error"
                disabled={!checked}
              />
            </div>
          </div>
          <figure className="border-neutral flex rounded-md border lg:grid">
            <div className="h-full p-3">
              <img
                src={images?.[0]}
                className="h-full w-full cursor-pointer rounded-md object-cover"
                alt={title}
              />
            </div>
            {imgs && (
              <div className="border-neutral grid gap-3 border-t p-3 lg:grid-cols-3">
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
            )}
          </figure>
        </div>
      </div>
    </section>
  );
};

export default SoloCard;
