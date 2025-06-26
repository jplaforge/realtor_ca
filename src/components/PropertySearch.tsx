'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Criteria {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
}

export default function PropertySearch() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ description: string }>();
  const [searchUrl, setSearchUrl] = useState<string | null>(null);

  const onSubmit = async ({ description }: { description: string }) => {
    setSearchUrl(null);
    const res = await fetch('/api/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    if (!res.ok) return;
    const data: Criteria = await res.json();
    const params = new URLSearchParams();
    if (data.location) params.append('GeoName', data.location);
    if (data.propertyType) params.append('PropertyTypeGroupID', data.propertyType);
    if (data.minPrice) params.append('MinPrice', String(data.minPrice));
    if (data.maxPrice) params.append('MaxPrice', String(data.maxPrice));
    if (data.beds) params.append('BedsMin', String(data.beds));
    const url = `https://www.realtor.ca/map#${params.toString()}`;
    setSearchUrl(url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <textarea
        className="w-full border p-2"
        placeholder="Describe the property you want..."
        {...register('description', { required: true })}
      />
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white">
        {isSubmitting ? 'Searching...' : 'Search'}
      </button>
      {searchUrl && (
        <div>
          <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
            Open search results
          </a>
        </div>
      )}
    </form>
  );
}
