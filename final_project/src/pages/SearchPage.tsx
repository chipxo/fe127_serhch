import React from "react";
import { ProductType } from "../types/types.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { isValidImage } from "../utils/isValidImage.tsx";
import { Link } from "react-router-dom";

type SearchPageProps = {
  searchResults: ProductType[] | undefined;
  found: boolean;
};

const SearchPage: React.FC<SearchPageProps> = ({ searchResults, found }) => {
  return (
    <>
      {searchResults && found ? (
        <div className="grid max-h-[70vh] w-full gap-y-3 overflow-auto rounded-md border border-neutral bg-base-100 p-4">
          {searchResults?.map(({ id, title, images, category }) =>
            isValidImage(images?.[0]) ? (
              <Link to={`/products/${id}`} key={nanoid()}>
                <div className="grid grid-cols-[0.16fr_1fr] items-center gap-x-4">
                  <img src={images?.[0]} alt={title} className="rounded-lg" />

                  <h2 className="text-lg">
                    {title}
                    {category.name}
                  </h2>
                </div>
              </Link>
            ) : (
              <h2 key={nanoid()} className="text-lg">
                Failed to load product :(
              </h2>
            ),
          )}
        </div>
      ) : (
        <div
          key={nanoid()}
          className="relative left-1/2 w-fit -translate-x-1/2 rounded-md border border-neutral bg-base-100 px-4 py-2 text-center"
        >
          <h2 className="text-lg">Nothing Found!</h2>
        </div>
      )}
    </>
  );
};

export default SearchPage;