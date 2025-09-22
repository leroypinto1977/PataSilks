import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for handling product images
export function parseProductImages(images: string): string[] {
  try {
    return JSON.parse(images);
  } catch {
    return [images]; // Fallback for single image string
  }
}

export function stringifyProductImages(images: string[]): string {
  return JSON.stringify(images);
}

// Transform product data from database format to frontend format
export function transformProduct(product: any) {
  return {
    ...product,
    images: parseProductImages(product.images),
  };
}

// Transform product data from frontend format to database format
export function transformProductForDB(product: any) {
  return {
    ...product,
    images: stringifyProductImages(product.images),
  };
}
