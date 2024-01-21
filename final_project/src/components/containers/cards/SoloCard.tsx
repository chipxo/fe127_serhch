import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../common/buttons/Button";
import fetchProduct from "../../hooks/fetchProduct";
import { cartDelete, cartIcon } from "../../icons/Icons";
import { Products } from "../../types/ProductCardType";

const SoloCard = () => {
  const { prodId } = useParams<{ prodId: string }>();
  const [productData, setProductData] = useState<Products | null>(null);
  // const [items, setItems] = useState<Products | null>(null);
  const localStorage = window.localStorage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProduct(prodId as string);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddBtn = () => {
    productData &&
      localStorage.setItem(`${productData.id}`, `${productData.title}`);
  };
  const handleDelBtn = (id: number) => {
    productData && localStorage.removeItem(`${id}`);
  };
  if (localStorage.length === 0) {
    return <h1>no items</h1>;
  } else {
    return (
      <div className="container">
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img src={productData?.images[0]} alt={productData?.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{productData?.title}</h2>
            <p>{productData?.description}</p>
            <div className="grid grid-cols-2 gap-x-4 mt-2">
              <Button
                text={cartDelete}
                color="secondary"
                onClick={() => handleDelBtn(productData?.id as number)}
              />
              <Button text={cartIcon} color="primary" onClick={handleAddBtn} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SoloCard;
