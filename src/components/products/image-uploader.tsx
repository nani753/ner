'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  initialImages?: string[];
  onImagesChange?: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUploader({
  initialImages = [],
  onImagesChange,
  maxImages = 10,
  className,
}: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      toast.error('Too many images', {
        description: `You can only upload up to ${maxImages} images`,
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/products/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesChange?.(newImages);

      toast.success('Images uploaded successfully');
    } catch (error) {
      toast.error('Upload failed', {
        description: (error as Error).message,
      });
    } finally {
      setIsUploading(false);
    }
  }, [images, maxImages, onImagesChange]);

  const removeImage = useCallback((indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesChange?.(newImages);
  }, [images, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    disabled: isUploading,
  });

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={image} className="relative aspect-square rounded-lg overflow-hidden group">
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          {isDragActive
            ? 'Drop the files here...'
            : `Drag & drop images here, or click to select files`}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          PNG, JPG, JPEG, or WebP (max {maxImages} images)
        </p>
      </div>
    </div>
  );
}