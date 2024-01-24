import React, { useState } from "react";
import { toRightIcon } from "../../icons/Icons";
import links from "../../data/filter.json";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

const FilterItem = () => {
  return (
    <div>
      <h2 className="border-l border-neutral px-4 pb-3 pt-4">Sort by:</h2>
      <div className="collapse mb-1 rounded-none border border-neutral bg-base-100 p-0">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title border-b border-neutral text-xl font-medium ">
          <h2 className="pl-2 font-Roboto-Condensed text-3xl">Categories :</h2>
        </div>
        <div className="collapse-content grid p-0 font-Merriweather text-xl">
          {links.map(({ id, name }) => (
            <Link
              to={`/products/categories/${id}`}
              key={nanoid()}
              className="border-y border-neutral px-10 py-4"
            >
              {toRightIcon} {name[0].toUpperCase() + name.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <div className="collapse rounded-none border border-neutral bg-base-100 p-0">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title border-y border-neutral text-xl font-medium">
          <h2 className="pl-2 font-Roboto-Condensed text-3xl">Price :</h2>
        </div>
        <div className="collapse-content p-0 font-Merriweather text-2xl">
          <p className="border-y border-neutral px-10 py-4">Enter values:</p>
          <div className="grid grid-cols-2 gap-x-10 p-4">
            <input
              className="rounded-md border border-neutral bg-base-200 p-4"
              placeholder="Lowest"
            />
            <input
              className="rounded-md border border-neutral bg-base-200 p-4"
              placeholder="Highest"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;

//  <p className="border-y border-neutral px-10 py-4">
// {toRightIcon} Clothes
// </p>
