"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ProductImagesProps {
  images: string[];
  name: string;
}

export function ProductImages({ images, name }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[4/5] bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No Image Available</p>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  return (
    <div className="relative">
      {/* Main Image */}
      <motion.div
        key={currentImageIndex}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-warm-beige"
      >
        <Image
          src={currentImage}
          alt={`${name} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        {/* Zoom Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsZoomModalOpen(true)}
          className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label="Zoom In"
        >
          <ZoomIn size={20} />
        </motion.button>

        {/* Navigation Arrows - only show if multiple images */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>

      {/* Thumbnails - only show if multiple images */}
      {images.length > 1 && (
        <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer ring-2 ${
                index === currentImageIndex
                  ? "ring-rich-brown ring-offset-2"
                  : "ring-transparent"
              } hover:ring-rich-brown/50 transition-all duration-200`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsZoomModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={`${name} - Zoomed view`}
                width={1200}
                height={1500}
                className="w-full h-full object-contain"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsZoomModalOpen(false)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Close Zoom"
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
