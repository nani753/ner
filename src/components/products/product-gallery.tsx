import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProductGalleryProps {
  images: {
    hero: string;
    gallery: string[];
  };
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images.hero);
  const allImages = [images.hero, ...images.gallery];

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer">
            <Image
              src={selectedImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <div className="relative aspect-square">
            <Image
              src={selectedImage}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-4 gap-4">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square overflow-hidden rounded-lg ${
              selectedImage === image ? 'ring-2 ring-primary' : ''
            }`}
          >
            <Image src={image} alt={`${title} ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}