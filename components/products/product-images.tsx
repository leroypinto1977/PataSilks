"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { SanityImage } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface ProductImagesProps {
  images: SanityImage[];
  name: string;
}

// Helper function to safely get image URL
function getImageUrl(image: SanityImage): string {
  try {
    if (image.asset && image.asset._ref) {
      const assetRef = image.asset._ref;
      if (
        assetRef.startsWith("image-") &&
        assetRef.includes("-") &&
        !assetRef.includes("?")
      ) {
        return urlFor(image).width(800).height(1000).url();
      }
    }

    if (typeof image === "string") {
      return image;
    }

    if (
      typeof image === "object" &&
      "url" in image &&
      typeof image.url === "string"
    ) {
      return image.url;
    }
  } catch (error) {
    console.warn("Error processing image:", error);
  }

  return "/placeholder-product.jpg";
}

export function ProductImages({ images, name }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];
  const currentImageUrl = getImageUrl(currentImage);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
        <Image
          src={currentImageUrl}
          alt={currentImage.alt || name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ZoomIn size={20} />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => {
            const imageUrl = getImageUrl(image);
            return (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                  index === currentImageIndex
                    ? "ring-2 ring-rich-beige ring-offset-2"
                    : "hover:opacity-80"
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={image.alt || `${name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImageUrl}
                alt={currentImage.alt || name}
                width={800}
                height={1000}
                className="object-contain max-h-[90vh] rounded-lg"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
