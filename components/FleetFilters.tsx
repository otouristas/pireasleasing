"use client";
import { useState } from 'react';

interface FleetFiltersProps {
  locale: string;
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  category: string;
  transmission: string;
  seats: string;
  priceRange: string;
}

export default function FleetFilters({ locale, categories, onFilterChange }: FleetFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    transmission: 'all',
    seats: 'all',
    priceRange: 'all',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      search: '',
      category: 'all',
      transmission: 'all',
      seats: 'all',
      priceRange: 'all',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value, index) => index === 0 ? value !== '' : value !== 'all'
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#0B1B33]">
          {locale === 'el' ? 'Φίλτρα Αναζήτησης' : 'Search Filters'}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-[#F9C80E] transition"
          >
            {locale === 'el' ? 'Καθαρισμός' : 'Clear All'}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'el' ? 'Αναζήτηση' : 'Search'}
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder={locale === 'el' ? 'Μάρκα, μοντέλο...' : 'Make, model...'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'el' ? 'Κατηγορία' : 'Category'}
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
          >
            <option value="all">{locale === 'el' ? 'Όλες' : 'All Categories'}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'el' ? 'Κιβώτιο Ταχυτήτων' : 'Transmission'}
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => handleFilterChange('transmission', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
          >
            <option value="all">{locale === 'el' ? 'Όλα' : 'All Types'}</option>
            <option value="Automatic">{locale === 'el' ? 'Αυτόματο' : 'Automatic'}</option>
            <option value="Manual">{locale === 'el' ? 'Χειροκίνητο' : 'Manual'}</option>
          </select>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'el' ? 'Θέσεις' : 'Seats'}
          </label>
          <select
            value={filters.seats}
            onChange={(e) => handleFilterChange('seats', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
          >
            <option value="all">{locale === 'el' ? 'Όλες' : 'All'}</option>
            <option value="2">2 {locale === 'el' ? 'θέσεις' : 'seats'}</option>
            <option value="4">4 {locale === 'el' ? 'θέσεις' : 'seats'}</option>
            <option value="5">5 {locale === 'el' ? 'θέσεις' : 'seats'}</option>
            <option value="7">7+ {locale === 'el' ? 'θέσεις' : 'seats'}</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {locale === 'el' ? 'Τιμή/Μήνα' : 'Price/Month'}
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
          >
            <option value="all">{locale === 'el' ? 'Όλες' : 'All Prices'}</option>
            <option value="0-500">{locale === 'el' ? 'Κάτω από €500' : 'Under €500'}</option>
            <option value="500-700">€500 - €700</option>
            <option value="700-1000">€700 - €1,000</option>
            <option value="1000+">{locale === 'el' ? 'Πάνω από €1,000' : 'Over €1,000'}</option>
          </select>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="px-3 py-1 bg-[#F9C80E] text-[#0B1B33] rounded-full text-xs font-semibold">
                {filters.search}
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="px-3 py-1 bg-[#F9C80E] text-[#0B1B33] rounded-full text-xs font-semibold">
                {filters.category}
              </span>
            )}
            {filters.transmission !== 'all' && (
              <span className="px-3 py-1 bg-[#F9C80E] text-[#0B1B33] rounded-full text-xs font-semibold">
                {filters.transmission}
              </span>
            )}
            {filters.seats !== 'all' && (
              <span className="px-3 py-1 bg-[#F9C80E] text-[#0B1B33] rounded-full text-xs font-semibold">
                {filters.seats} {locale === 'el' ? 'θέσεις' : 'seats'}
              </span>
            )}
            {filters.priceRange !== 'all' && (
              <span className="px-3 py-1 bg-[#F9C80E] text-[#0B1B33] rounded-full text-xs font-semibold">
                {filters.priceRange}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

