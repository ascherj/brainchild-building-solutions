"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { useState } from "react";
import PhotoModal from "@/app/components/PhotoModal";

interface ProductImage {
  _id?: string;
  alt?: string | null;
  caption?: string | null;
  [key: string]: any;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  featured?: boolean | null;
}

export default function ProductGallery({ images, productName, featured }: ProductGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<ProductImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-96 w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const openModal = (image: ProductImage, index: number) => {
    setCurrentPhotoIndex(index);
    setSelectedPhoto(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % images.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(images[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? images.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(images[prevIndex]);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer group">
          <Image
            src={urlForImage(images[0])?.width(600).height(400).quality(85).url() || ''}
            alt={images[0]?.alt || productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={() => openModal(images[0], 0)}
          />
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                Featured Product
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-2">
            {images.slice(1, 4).map((image: ProductImage, index: number) => (
              <div 
                key={index} 
                className="relative h-24 w-full bg-gray-100 rounded overflow-hidden cursor-pointer group"
                onClick={() => openModal(image, index + 1)}
              >
                <Image
                  src={urlForImage(image)?.width(200).height(150).quality(85).url() || ''}
                  alt={image?.alt || `${productName} ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        )}

        {/* Show remaining images count if there are more than 4 */}
        {images.length > 4 && (
          <div className="text-center">
            <button
              onClick={() => openModal(images[4], 4)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all {images.length} photos →
            </button>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrev={prevPhoto}
        currentIndex={currentPhotoIndex}
        totalPhotos={images.length}
      />
    </>
  );
}