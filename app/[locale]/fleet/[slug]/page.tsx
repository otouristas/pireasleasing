import { getSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CarDetailClient from '@/components/CarDetailClient';

export const dynamic = 'force-dynamic';

export default async function CarDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const supabase = await getSupabaseServerClient();
  
  const { data: car } = await supabase
    .from('cars')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (!car) notFound();

  // Get similar cars from same category
  const { data: similarCars } = await supabase
    .from('cars')
    .select('*')
    .eq('category', car.category)
    .eq('active', true)
    .neq('id', car.id)
    .limit(3);

  const features = car.features?.split(', ') || [];
  
  // Parse and validate images
  let images: string[] = [];
  try {
    // Handle if images is a JSON string or already an array
    const rawImages = typeof car.images === 'string' 
      ? JSON.parse(car.images) 
      : car.images;
    
    // Filter out any invalid URLs (null, undefined, empty strings, or malformed URLs)
    if (Array.isArray(rawImages)) {
      images = rawImages.filter((img: any) => {
        if (!img || typeof img !== 'string' || img.trim() === '') return false;
        // Check if it's a valid path (starts with / or http)
        return img.startsWith('/') || img.startsWith('http');
      });
    }
  } catch (e) {
    console.error('Error parsing car images:', e);
  }
  
  // Fallback to placeholder if no valid images
  if (images.length === 0) {
    images = ['/fleet/placeholder.jpg'];
  }

  return (
    <CarDetailClient 
      car={car}
      similarCars={similarCars || []}
      features={features}
      images={images}
      locale={locale}
    />
  );
}
