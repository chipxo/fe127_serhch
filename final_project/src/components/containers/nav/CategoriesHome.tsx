import React, { useState } from "react";
import { goToRightIcon, toRightIcon } from "@/components/common/icons";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { CategoriesType } from "@/types/types";
import { AnimatePresence, motion as m } from "framer-motion";
import { twJoin } from "tailwind-merge";
import { mCategories, mSetting } from "@/utils/motionSettings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type CategoriesHomeProps = {
  categories: CategoriesType[] | null;
};

const CategoriesHome: React.FC<CategoriesHomeProps> = ({ categories }) => {
  return (
    <div className="pl-4 lg:hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger>
            <h2>Categories</h2>
          </AccordionTrigger>
          <AccordionContent className="grid items-center gap-6 px-4 sm:grid-cols-2">
            {categories?.map(({ id, name, image }) => (
              <Link to={`/products/categories/${id}`} key={nanoid()}>
                <div className="grid grid-cols-[60px_1fr] items-center gap-x-2">
                  <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg">
                    {name} {toRightIcon}
                  </p>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CategoriesHome;
