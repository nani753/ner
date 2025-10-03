import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  { value: 'sound-systems', label: 'Sound Systems' },
  { value: 'lighting-systems', label: 'Lighting Systems' },
  { value: 'event-gear', label: 'Event Gear' },
];

const USE_CASES = [
  { value: 'live', label: 'Live Events' },
  { value: 'studio', label: 'Studio' },
  { value: 'rental', label: 'Rental' },
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(
    searchParams.get('useCase')?.split(',') || []
  );

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedUseCases.length > 0) params.set('useCase', selectedUseCases.join(','));
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 10000) params.set('maxPrice', priceRange[1].toString());
    
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedUseCases([]);
    setPriceRange([0, 10000]);
    router.push('/products');
  };

  return (
    <div className="w-full space-y-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={10000}
                step={100}
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="useCase">
          <AccordionTrigger>Use Case</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {USE_CASES.map((useCase) => (
                <div key={useCase.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={useCase.value}
                    checked={selectedUseCases.includes(useCase.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedUseCases([...selectedUseCases, useCase.value]);
                      } else {
                        setSelectedUseCases(
                          selectedUseCases.filter((uc) => uc !== useCase.value)
                        );
                      }
                    }}
                  />
                  <label htmlFor={useCase.value}>{useCase.label}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex space-x-2">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline">
          Clear
        </Button>
      </div>
    </div>
  );
}