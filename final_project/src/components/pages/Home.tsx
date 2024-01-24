import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../containers/cards/Slider";
import StoreCard from "../containers/cards/StoreCards";
import { Card, ProductType } from "../types/ProductCardType";

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=4&limit=20`,
      );

      setCards(response.data);
    };

    fetchProduct();
  }, []);

  return (
    <>
      <Slider />
      <div className="container my-10 py-10">
        <h2 className="mb-10 text-center text-4xl font-semibold">Top:</h2>
        <div className="grid grid-cols-5 gap-4">
          {cards?.map(({ id, title, images, price, category }: Card) => (
            <div key={nanoid()}>
              <StoreCard
                id={id}
                title={title}
                category={category}
                price={price}
                images={images}
                isHome={true}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
