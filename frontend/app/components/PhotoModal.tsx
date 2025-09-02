"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { useEffect, useState } from "react";

interface GalleryPhoto {
  _id?: string;
  caption?: string | null;
  alt?: string | null;
  image?: {
    alt?: string | null;
    [key: string]: any;
  };
  [key: string]: any; // For flexibility with different image structures
}

interface PhotoModalProps {
  photo: GalleryPhoto | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalPhotos: number;
}

export default function PhotoModal({ photo, isOpen, onClose, onNext, onPrev, currentIndex, totalPhotos }: PhotoModalProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Reset loading state when photo changes
  useEffect(() => {
    if (photo) {
      setIsImageLoading(true);
      setImageError(false);
    }
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  // Handle different image structures (gallery vs product images)
  // Gallery images have photo.image structure, product images are direct references
  const imageSource = photo.image ? photo.image : photo;
  // Use flexible dimensions that maintain aspect ratio - let Sanity handle optimal sizing
  const imageUrl = urlForImage(imageSource)?.quality(95).url() || '';
  const imageAlt = photo.image?.alt || photo.alt || photo.caption || 'Photo';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-7xl max-h-full flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors touch-manipulation"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {totalPhotos > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 sm:p-3 hover:bg-opacity-70 transition-colors touch-manipulation"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 sm:p-3 hover:bg-opacity-70 transition-colors touch-manipulation"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Container */}
        <div
          className="flex-1 flex items-center justify-center relative p-2 sm:p-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Loading Spinner */}
            {(isImageLoading || imageError) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                {imageError ? (
                  <div className="text-white text-center">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-sm">Failed to load image</p>
                  </div>
                ) : (
                  <div className="text-white text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-sm">Loading image...</p>
                  </div>
                )}
              </div>
            )}

            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className={`object-contain transition-opacity duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                setImageError(true);
              }}
            />
          </div>
        </div>

        {/* Caption and Counter */}
        <div
          className="bg-black bg-opacity-75 text-white p-4 sm:p-6 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex-1 pr-4">
                {photo.caption && (
                  <span className="text-base sm:text-lg block">{photo.caption}</span>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm">{currentIndex + 1} of {totalPhotos}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
