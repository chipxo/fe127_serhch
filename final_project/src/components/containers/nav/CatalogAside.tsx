import React from "react";
import { goToRightIcon } from "@/components/common/icons";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { CategoriesType } from "@/types/types";
import { isValidImage } from "@/utils/isValidImage";

type CatalogAsideProps = {
  categories: CategoriesType[] | null;
};

const CatalogAside: React.FC<CatalogAsideProps> = ({ categories }) => {
  return (
    <div className="border-b border-neutral lg:hidden">
      <h2 className="mt-4 text-center text-2xl">Categories :</h2>
      <div className="text-md grid grid-cols-filterLayout gap-x-4 gap-y-4 border-neutral py-8 font-Merriweather max-lg:container lg:gap-y-10 lg:border-b lg:py-14">
        {categories?.map(
          ({ id, name, image }) =>
            isValidImage(image) && (
              <Link
                to={`/products/categories/${id}`}
                key={nanoid()}
                className=""
              >
                <div className="grid grid-cols-[60px_1fr] items-center gap-x-2">
                  <img
                    src={image}
                    alt={name}
                    className="h-12 w-12 rounded-full"
                  />
                  <p>
                    {name[0].toUpperCase() + name.slice(1)} {goToRightIcon}
                  </p>
                </div>
              </Link>
            ),
        )}
      </div>
    </div>
  );
};

export default CatalogAside;
