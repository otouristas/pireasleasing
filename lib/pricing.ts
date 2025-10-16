export type BookingDetails = {
  startTs: string; // ISO
  endTs: string; // ISO
  dailyRateCents: number;
  pickup: { locationCode: string; isOffHours: boolean; feeCents: number; offHoursMultiplier: number };
  dropoff: { locationCode: string; isOffHours: boolean; feeCents: number; offHoursMultiplier: number };
  extras: { nameKey: string; pricePerDayCents: number }[];
};

export type PriceBreakdown = {
  basePriceCents: number;
  deliveryFeesCents: number;
  extrasCents: number;
  taxCents: number;
  totalCents: number;
  depositCents: number;
  balanceCents: number;
  days: number;
};

export function daysBetween(start: Date, end: Date): number {
  const ms = Math.max(0, end.getTime() - start.getTime());
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function calculatePrice(details: BookingDetails): PriceBreakdown {
  const start = new Date(details.startTs);
  const end = new Date(details.endTs);
  const days = Math.max(1, daysBetween(start, end));

  const basePriceCents = days * details.dailyRateCents;

  const pickupFee = details.pickup.isOffHours
    ? details.pickup.feeCents * details.pickup.offHoursMultiplier
    : details.pickup.feeCents;

  const dropoffFee = details.dropoff.isOffHours
    ? details.dropoff.feeCents * details.dropoff.offHoursMultiplier
    : details.dropoff.feeCents;

  const deliveryFeesCents = pickupFee + dropoffFee;

  const extrasCents = details.extras.reduce(
    (sum, e) => sum + e.pricePerDayCents * days,
    0
  );

  const taxCents = 0; // included in prices per spec
  const totalCents = basePriceCents + deliveryFeesCents + extrasCents + taxCents;
  const depositCents = Math.ceil(totalCents * 0.15);
  const balanceCents = totalCents - depositCents;

  return {
    basePriceCents,
    deliveryFeesCents,
    extrasCents,
    taxCents,
    totalCents,
    depositCents,
    balanceCents,
    days,
  };
}


