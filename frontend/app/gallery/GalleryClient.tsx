"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { useState } from "react";
import Link from "next/link";
import PhotoModal from "@/app/components/PhotoModal";

interface GalleryPhoto {
  _id?: string;
  caption?: string | null;
  image: {
    alt?: string | null;
    [key: string]: any;
  };
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
        <div className="w-full px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
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
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 mb-16">
          {filteredPhotos.map((photo) => {
            const imageUrl = urlForImage(photo.image)?.width(400).height(400).quality(85).url();
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
        </div>
      ) : (
        <div className="w-full px-4">
          <div className="text-center py-12 mb-16 max-w-2xl mx-auto">
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
