export type DateYYYYMMDD = string;
export type DateYYYYMMDDTime = string; //ex: '2024-06-01T00:00:00.000Z'

export function calculateNights({
  checkInDate,
  checkOutDate,
}: {
  checkInDate: DateYYYYMMDD;
  checkOutDate: DateYYYYMMDD;
}) {
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  // Calculate the difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const millisecondsInDay = 1000 * 60 * 60 * 24; // 1 day in milliseconds
  const nights = Math.ceil(timeDifference / millisecondsInDay);

  return nights;
}
