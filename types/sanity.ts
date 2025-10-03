export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityCategory {
  _id: string;
  _type: "category";
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: SanityImage;
  featured?: boolean;
  active?: boolean;
  sortOrder?: number;
}

export interface SanityProduct {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  description: string;
  longDescription?: any[]; // Portable Text
  price: number;
  originalPrice?: number;
  images: SanityImage[];
  category: SanityCategory;
  fabric: string;
  color: string;
  colors?: string[];
  sizes?: string[];
  occasion?: string[];
  features?: string[];
  careInstructions?: string[];
  stockCount: number;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
  };
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  active?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface SanityProductPreview {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  originalPrice?: number;
  images: SanityImage[];
  category: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
  };
  fabric: string;
  color: string;
  featured?: boolean;
  newArrival?: boolean;
}
