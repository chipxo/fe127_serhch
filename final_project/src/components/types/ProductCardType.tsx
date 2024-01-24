type CategotyType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: CategotyType;
  images: string[];
};

export type Card = ProductType & {
  onClick?: () => void;
  isHome?: boolean;
};
