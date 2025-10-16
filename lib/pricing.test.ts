import { describe, it, expect } from 'vitest';
import { daysBetween, calculatePrice, type BookingDetails } from './pricing';

describe('Pricing Calculations', () => {
  describe('daysBetween', () => {
    it('should calculate days between two dates correctly', () => {
      const start = new Date('2025-01-01');
      const end = new Date('2025-01-05');
      expect(daysBetween(start, end)).toBe(4);
    });

    it('should handle same day booking', () => {
      const date = new Date('2025-01-01');
      expect(daysBetween(date, date)).toBe(0);
    });

    it('should handle negative duration gracefully', () => {
      const start = new Date('2025-01-05');
      const end = new Date('2025-01-01');
      expect(daysBetween(start, end)).toBe(0);
    });

    it('should round up partial days', () => {
      const start = new Date('2025-01-01T10:00:00');
      const end = new Date('2025-01-02T14:00:00');
      expect(daysBetween(start, end)).toBe(2);
    });
  });

  describe('calculatePrice', () => {
    const baseBooking: BookingDetails = {
      startTs: '2025-01-01T10:00:00Z',
      endTs: '2025-01-05T10:00:00Z',
      dailyRateCents: 3000, // 30 EUR per day
      pickup: {
        locationCode: 'PIRAEUS',
        isOffHours: false,
        feeCents: 2000, // 20 EUR
        offHoursMultiplier: 2,
      },
      dropoff: {
        locationCode: 'AIRPORT',
        isOffHours: false,
        feeCents: 4000, // 40 EUR
        offHoursMultiplier: 2,
      },
      extras: [],
    };

    it('should calculate basic price correctly', () => {
      const result = calculatePrice(baseBooking);
      
      expect(result.days).toBe(5);
      expect(result.basePriceCents).toBe(15000); // 5 days x 3000 cents
      expect(result.deliveryFeesCents).toBe(6000); // 2000 + 4000
      expect(result.extrasCents).toBe(0);
      expect(result.totalCents).toBe(21000); // 15000 + 6000
      expect(result.depositCents).toBe(3150); // 15% of 21000
      expect(result.balanceCents).toBe(17850); // 21000 - 3150
    });

    it('should apply off-hours multiplier correctly', () => {
      const offHoursBooking: BookingDetails = {
        ...baseBooking,
        pickup: {
          ...baseBooking.pickup,
          isOffHours: true,
        },
        dropoff: {
          ...baseBooking.dropoff,
          isOffHours: true,
        },
      };

      const result = calculatePrice(offHoursBooking);
      
      expect(result.deliveryFeesCents).toBe(12000); // (2000 x 2) + (4000 x 2)
      expect(result.totalCents).toBe(27000); // 15000 + 12000
    });

    it('should calculate extras correctly', () => {
      const bookingWithExtras: BookingDetails = {
        ...baseBooking,
        extras: [
          { nameKey: 'GPS', pricePerDayCents: 500 }, // 5 EUR per day
          { nameKey: 'Child Seat', pricePerDayCents: 300 }, // 3 EUR per day
        ],
      };

      const result = calculatePrice(bookingWithExtras);
      
      expect(result.extrasCents).toBe(4000); // (500 + 300) x 5 days
      expect(result.totalCents).toBe(25000); // 15000 + 6000 + 4000
    });

    it('should handle single day booking', () => {
      const singleDay: BookingDetails = {
        ...baseBooking,
        startTs: '2025-01-01T10:00:00Z',
        endTs: '2025-01-01T18:00:00Z',
      };

      const result = calculatePrice(singleDay);
      
      expect(result.days).toBe(1);
      expect(result.basePriceCents).toBe(3000); // 1 day x 3000
    });

    it('should handle long-term booking', () => {
      const longTerm: BookingDetails = {
        ...baseBooking,
        startTs: '2025-01-01T10:00:00Z',
        endTs: '2025-02-01T10:00:00Z', // 31 days
      };

      const result = calculatePrice(longTerm);
      
      expect(result.days).toBe(32);
      expect(result.basePriceCents).toBe(96000); // 32 days x 3000
    });

    it('should calculate deposit as 15% correctly', () => {
      const result = calculatePrice(baseBooking);
      
      const expectedDeposit = Math.ceil(result.totalCents * 0.15);
      expect(result.depositCents).toBe(expectedDeposit);
      expect(result.balanceCents).toBe(result.totalCents - result.depositCents);
    });

    it('should handle zero delivery fees', () => {
      const noDeliveryFees: BookingDetails = {
        ...baseBooking,
        pickup: {
          ...baseBooking.pickup,
          feeCents: 0,
        },
        dropoff: {
          ...baseBooking.dropoff,
          feeCents: 0,
        },
      };

      const result = calculatePrice(noDeliveryFees);
      
      expect(result.deliveryFeesCents).toBe(0);
      expect(result.totalCents).toBe(15000); // Only base price
    });

    it('should ensure deposit plus balance equals total', () => {
      const result = calculatePrice(baseBooking);
      
      expect(result.depositCents + result.balanceCents).toBe(result.totalCents);
    });

    it('should handle multiple extras correctly', () => {
      const manyExtras: BookingDetails = {
        ...baseBooking,
        extras: [
          { nameKey: 'GPS', pricePerDayCents: 500 },
          { nameKey: 'Child Seat', pricePerDayCents: 300 },
          { nameKey: 'Extra Driver', pricePerDayCents: 1000 },
          { nameKey: 'Winter Tires', pricePerDayCents: 800 },
        ],
      };

      const result = calculatePrice(manyExtras);
      
      const expectedExtras = (500 + 300 + 1000 + 800) * 5; // 5 days
      expect(result.extrasCents).toBe(expectedExtras);
    });
  });
});

