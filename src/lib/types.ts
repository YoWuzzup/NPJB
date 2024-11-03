export type TReview = {
  rating: number;
  date: Date | string;
  product_id: string;
  header: string;
  message: string;
  publicId: string;
  author: string;
  liked: number;
};

export type TReviewArray = TReview[];

export type TCart = { publicId: string; quantity: number }[];

export type TProduct = {
  name?: string;
  publicId?: string;
  description?: {
    en: string;
    ua: string;
  };
  price: {
    USD: number;
    UAH: number;
    ZL: number;
  };
  discount: number;
  imageUrls?: string[];
  // specifications for weight, length, height etc.
  specifications?: string[];
  returnPolicy?: string;
  contents?: string[];
  reviews: TReviewArray | [];
  manufacturer?: string;
  category?: string[];
  subCategory?: string[];
  tags: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  stock: number;

  // added on the backend
  thumbnail?: string;
  averageRating?: number;
  ratingLength?: number;
};

export type TProductArray = TProduct[];
