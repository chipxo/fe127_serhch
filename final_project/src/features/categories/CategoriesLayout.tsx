import { RootState } from "@/app/rootReducer.tsx";
import { toRightIcon } from "@/components/common/icons.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoriesLayout = () => {
  const { categories } = useSelector((state: RootState) => state.categories);

  return (
    <div className="lg:hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
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

export default CategoriesLayout;
