import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../containers/cards/Slider";

type Card = {
  id: number;
  price: number;
  title: string;
  images: string[];
};

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=1&limit=10`,
      );

      setCards(response.data);
    };

    fetchProduct();
  }, []);

  const toSoloCard = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <Slider />
      <h2 className="text-4xl font-semibold text-center my-10">Actual:</h2>
      <div className="grid grid-cols-3 gap-6 container py-4">
        {cards?.map(({ id, title, images, price }: Card) => (
          <div
            key={nanoid()}
            className="rounded-md space-y-3 flex flex-col border border-neutral shadow-2xl"
          >
            <div className="p-4 border-b border-neutral">
              <h2 onClick={() => toSoloCard(id)} className="text-2xl">
                {title}
              </h2>
              <p className="text-xl font-semibold">{price}$</p>
            </div>
            <figure className="p-4">
              <img
                onClick={() => toSoloCard(id)}
                src={images?.[1]}
                alt={title}
                className="rounded-md h-full w-full object-cover cursor-pointer"
              />
            </figure>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
