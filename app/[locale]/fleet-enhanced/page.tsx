"use client";
import { useState, useEffect, use } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import FleetFilters, { FilterState } from '@/components/FleetFilters';
import { FleetGridSkeleton } from '@/components/LoadingSkeleton';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  price_per_day: string;
  license_plate: string;
  images: string[];
  slug: string;
  active: boolean;
}

export default function FleetPageEnhanced({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('active', true)
          .order('make');

        if (error) throw error;

        setCars(data || []);
        setFilteredCars(data || []);
        
        const uniqueCategories = [...new Set(data?.map(c => c.category) || [])];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...cars];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(car =>
        car.make.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.license_plate.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(car => car.category === filters.category);
    }

    // Transmission filter
    if (filters.transmission !== 'all') {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Seats filter
    if (filters.seats !== 'all') {
      const seatCount = parseInt(filters.seats);
      if (seatCount === 7) {
        filtered = filtered.filter(car => car.seats >= 7);
      } else {
        filtered = filtered.filter(car => car.seats === seatCount);
      }
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(car => {
        const price = parseFloat(car.price_per_day.replace(/[^0-9.]/g, ''));
        if (filters.priceRange === '0-500') return price < 500;
        if (filters.priceRange === '500-700') return price >= 500 && price < 700;
        if (filters.priceRange === '700-1000') return price >= 700 && price < 1000;
        if (filters.priceRange === '1000+') return price >= 1000;
        return true;
      });
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price_per_day.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price_per_day.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price_per_day.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price_per_day.replace(/[^0-9.]/g, ''));
        return priceB - priceA;
      });
    } else {
      filtered.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
    }

    setFilteredCars(filtered);
  };

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
    handleFilterChange(filters);
  };

  return (
    <>
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">
            {locale === 'el' ? 'Ο Στόλος Μας' : 'Our Fleet'}
          </h1>
          <p className="text-xl text-gray-200">
            {locale === 'el' ? 'Επιλέξτε το τέλειο όχημα για το ταξίδι σας' : 'Choose the perfect vehicle for your journey'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FleetFilters 
                locale={locale}
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Sort & Results Count */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="text-gray-700">
                  <span className="font-semibold">{filteredCars.length}</span> {locale === 'el' ? 'όχημα' : 'vehicles'}
                  {filteredCars.length !== cars.length && (
                    <span className="text-gray-500 ml-2">
                      ({locale === 'el' ? 'από' : 'of'} {cars.length})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">
                    {locale === 'el' ? 'Ταξινόμηση:' : 'Sort by:'}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  >
                    <option value="name">{locale === 'el' ? 'Όνομα' : 'Name'}</option>
                    <option value="price-asc">{locale === 'el' ? 'Τιμή (Χαμηλή → Υψηλή)' : 'Price (Low to High)'}</option>
                    <option value="price-desc">{locale === 'el' ? 'Τιμή (Υψηλή → Χαμηλή)' : 'Price (High to Low)'}</option>
                  </select>
                </div>
              </div>

              {/* Car Grid */}
              {loading ? (
                <FleetGridSkeleton />
              ) : filteredCars.length === 0 ? (
                <div className="bg-white border-2 border-gray-200 rounded-lg p-12 text-center">
                  <p className="text-xl text-gray-600 mb-4">
                    {locale === 'el' ? 'Δεν βρέθηκαν οχήματα' : 'No vehicles found'}
                  </p>
                  <p className="text-gray-500 mb-6">
                    {locale === 'el' ? 'Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης' : 'Try adjusting your search filters'}
                  </p>
                  <Link href={`/${locale}/contact`} className="btn-primary">
                    {locale === 'el' ? 'Επικοινωνήστε Μαζί Μας' : 'Contact Us'}
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => {
                    const imageUrl = car.images?.[0] || '/fleet/placeholder.jpg';
                    return (
                      <Link 
                        key={car.id} 
                        href={`/${locale}/fleet/${car.slug}`}
                        className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#F9C80E] hover:shadow-xl transition-all group"
                      >
                        <div className="relative h-[136px] rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden mb-3">
                          <div 
                            style={{
                              backgroundImage: `url(${imageUrl})`,
                              backgroundSize: 'contain',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                            className="w-full h-full"
                          />
                          <div className="absolute top-2 right-2 bg-[#F9C80E] text-[#0B1B33] px-2 py-1 rounded text-xs font-bold">
                            {car.category}
                          </div>
                        </div>

                        <h3 className="font-bold text-xl text-[#0B1B33] mb-1">
                          {car.make.toUpperCase()} {car.model.toUpperCase()}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">{car.year}</p>

                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                          <span>{car.seats} {locale === 'el' ? 'Άτομα' : 'People'}</span>
                          <span>•</span>
                          <span>{car.transmission}</span>
                          <span>•</span>
                          <span>{car.fuel_type}</span>
                        </div>

                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-sm text-gray-500">{locale === 'el' ? 'από' : 'from'}</div>
                            <div className="text-2xl font-bold text-[#F9C80E]">
                              {car.price_per_day?.replace('€/Month', '')} EUR
                            </div>
                            <div className="text-xs text-gray-500">/{locale === 'el' ? 'μήνα' : 'month'}</div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-400 font-mono mt-2">{car.license_plate}</div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

