import React from "react";
import { ProductType } from "@/types/types.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SearchPageProps = {
  searchResults: ProductType[] | undefined;
  found: boolean;
};

const SearchPage: React.FC<SearchPageProps> = ({ searchResults, found }) => {
  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );

  return (
    <>
      {searchResults && (
        <div className="grid max-h-[50vh] w-full gap-y-4 overflow-auto rounded-md border bg-background p-4">
          {found && inputValue.length > 0 ? (
            searchResults?.map(({ id, title, images, category }) => (
              <Link to={`/products/${id}`} key={nanoid()}>
                <div className="grid grid-cols-[0.1fr_1fr] items-center gap-x-4">
                  <Avatar>
                    <AvatarImage src={images?.[0]} />
                    <AvatarFallback>{title.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h2>{title}</h2>
                    <p>
                      in category:{" "}
                      <span className="text-md tracking-widest">
                        {category.name}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h2 className="text-lg">Nothing Found!</h2>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;

//<h2 className="text-lg">Nothing Found!</h2>
