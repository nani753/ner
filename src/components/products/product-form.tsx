'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IProduct } from '@/lib/models';
import { Document } from 'mongoose';
import { ImageUploader } from './image-uploader';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  brand: z.string().min(1, 'Brand is required'),
  category: z.enum(['sound-systems', 'lighting-systems', 'event-gear']),
  description: z.string().min(1, 'Description is required'),
  price: z.object({
    amount: z.number().min(0),
    currency: z.string(),
  }).optional(),
  specifications: z.record(z.string(), z.any()),
  images: z.object({
    hero: z.string(),
    gallery: z.array(z.string()),
  }),
  affiliateLinks: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url(),
      trackingId: z.string().optional(),
    })
  ),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  review: z.string().optional(),
  manufacturerInfo: z.object({
    name: z.string(),
    website: z.string().url().optional(),
    support: z.string().url().optional(),
  }),
  useCase: z.array(z.enum(['live', 'studio', 'rental'])),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: IProduct & Document;
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      affiliateLinks: [],
      pros: [],
      cons: [],
      useCase: [],
      specifications: {},
      images: {
        gallery: [],
      },
    },
  });

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sound-systems">Sound Systems</SelectItem>
                    <SelectItem value="lighting-systems">Lighting Systems</SelectItem>
                    <SelectItem value="event-gear">Event Gear</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Product description"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Fields */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="price.amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price amount"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price.currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <ImageUploader
                    initialImages={[field.value.hero, ...field.value.gallery]}
                    onImagesChange={(images) => {
                      field.onChange({
                        hero: images[0] || '',
                        gallery: images.slice(1),
                      });
                    }}
                    maxImages={10}
                    className="mt-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Manufacturer Info */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="manufacturerInfo.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Manufacturer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manufacturerInfo.website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
}