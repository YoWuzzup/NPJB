import { ObjectId } from "mongodb";

export type TProduct = {
  name?: string;
  publicId?: string;
  description?: {
    en: string;
    ua: string;
  };
  price?: {
    USD: number;
    UAH: number;
  };
  discount?: number;
  imageUrls?: string[];
  // specifications for weight, length, height etc.
  specifications?: {};
  returnPolicy?: string;
  contents?: string[];
  reviews?: string[];
  manufacturer?: string;
  category?: string[];
  subCategory?: string[];
  tags?: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  stock?: number;

  // added on the backend
  thumbnail?: string;
  averageRating?: number;
  ratingLength?: number;
};

export type TProductArray = TProduct[];
