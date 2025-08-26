"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";

interface GalleryPhoto {
  _id: string;
  caption?: string | null;
  image: {
    alt?: string | null;
    [key: string]: any;
  };
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

function PhotoModal({ photo, isOpen, onClose, onNext, onPrev, currentIndex, totalPhotos }: PhotoModalProps) {
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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-7xl max-h-full flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {totalPhotos > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-colors"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-colors"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Container */}
        <div 
          className="flex-1 flex items-center justify-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src={urlForImage(photo.image)?.width(1200).height(800).url() || ''}
              alt={photo.image.alt || photo.caption || 'Gallery photo'}
              width={1200}
              height={800}
              className="object-contain max-w-full max-h-[80vh]"
              priority
            />
          </div>
        </div>

        {/* Caption Overlay */}
        {photo.caption && (
          <div 
            className="bg-black bg-opacity-75 text-white p-6 max-h-32 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <div>
                  <span className="text-lg">{photo.caption}</span>
                </div>
                <div className="text-right">
                  <span>{currentIndex + 1} of {totalPhotos}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface GalleryClientProps {
  photos: GalleryPhoto[];
}

export default function GalleryClient({ photos }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalPhoto, setModalPhoto] = useState<GalleryPhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);


  // Simplified: no categories, just show all photos
  const categories = ['all'];

  // Simplified: just show all photos
  const filteredPhotos = photos;

  const openModal = (photo: GalleryPhoto) => {
    const photoIndex = filteredPhotos.findIndex(p => p._id === photo._id);
    setCurrentPhotoIndex(photoIndex);
    setModalPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalPhoto(null);
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    setCurrentPhotoIndex(nextIndex);
    setModalPhoto(filteredPhotos[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? filteredPhotos.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setModalPhoto(filteredPhotos[prevIndex]);
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'components': 'Building Components',
      'construction': 'Construction Site',
      'completed': 'Completed Projects',
      'materials': 'Materials & Supplies',
      'equipment': 'Equipment',
      'team': 'Team at Work',
    };
    return categoryMap[category] || category;
  };

  return (
    <>
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category || 'all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Photos' : getCategoryDisplayName(category || '')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Photo Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {filteredPhotos.map((photo) => {
            const imageUrl = urlForImage(photo.image)?.width(300).height(300).url();
            return (
            <div
              key={photo._id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => openModal(photo)}
            >
              <div className="relative h-64">
                <Image
                  src={imageUrl || ''}
                  alt={photo.image.alt || photo.caption || 'Gallery photo'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

              </div>
            </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 mb-16">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Gallery Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            We&apos;re currently building our photo gallery. Check back soon to see our latest work.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Start Your Project
          </Link>
        </div>
      )}

      {/* Photo Modal */}
      <PhotoModal
        photo={modalPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrev={prevPhoto}
        currentIndex={currentPhotoIndex}
        totalPhotos={filteredPhotos.length}
      />
    </>
  );
}