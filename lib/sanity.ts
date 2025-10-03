import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Product queries
export const productQueries = {
  // Get all products
  all: `*[_type == "product" && active == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    fabric,
    color,
    colors,
    sizes,
    occasion,
    features,
    stockCount,
    featured,
    newArrival,
    tags,
    seo
  }`,

  // Get featured products
  featured: `*[_type == "product" && active == true && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    name,
    slug,
    description,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    fabric,
    color,
    featured,
    newArrival
  }`,

  // Get new arrivals
  newArrivals: `*[_type == "product" && active == true && newArrival == true] | order(_createdAt desc) [0...8] {
    _id,
    name,
    slug,
    description,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    fabric,
    color,
    featured,
    newArrival
  }`,

  // Get single product by slug
  bySlug: `*[_type == "product" && slug.current == $slug && active == true][0] {
    _id,
    name,
    slug,
    description,
    longDescription,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    fabric,
    color,
    colors,
    sizes,
    occasion,
    features,
    careInstructions,
    stockCount,
    weight,
    dimensions,
    tags,
    featured,
    newArrival,
    seo
  }`,

  // Get products by category
  byCategory: `*[_type == "product" && active == true && category._ref == $categoryId] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    fabric,
    color,
    featured,
    newArrival
  }`,

  // Get related products
  related: `*[_type == "product" && active == true && category._ref == $categoryId && _id != $productId] | order(_createdAt desc) [0...3] {
    _id,
    name,
    slug,
    description,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    fabric,
    color,
    featured,
    newArrival
  }`,

  // Search products
  search: `*[_type == "product" && active == true && (name match $query || description match $query || tags[] match $query)] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    price,
    originalPrice,
    images,
    category->{
      _id,
      name,
      slug
    },
    fabric,
    color,
    featured,
    newArrival
  }`,
};

// Category queries
export const categoryQueries = {
  // Get all categories
  all: `*[_type == "category" && active == true] | order(sortOrder asc, name asc) {
    _id,
    name,
    slug,
    description,
    image,
    featured,
    sortOrder
  }`,

  // Get featured categories
  featured: `*[_type == "category" && active == true && featured == true] | order(sortOrder asc) {
    _id,
    name,
    slug,
    description,
    image,
    featured
  }`,

  // Get single category by slug
  bySlug: `*[_type == "category" && slug.current == $slug && active == true][0] {
    _id,
    name,
    slug,
    description,
    image,
    featured
  }`,
};
