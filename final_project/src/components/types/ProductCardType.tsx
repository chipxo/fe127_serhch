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
  onClick?: () => void;
};

export type Card = ProductType & {
  isHome?: boolean;
};
