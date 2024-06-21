import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://traverse-assignment-api.esdee.workers.dev";
const API_KEY = process.env.VITE_API_KEY as string;

type dateYYYYMMDD = string;
type currencyCode = "USD"; // Ultimately this should include all the supported currencies in the system, I only saw USD
type bookingId = number; // Normally I declare number in the type object, but in this case I am prepping in case we want to swap number with UUID

export type Booking = {
  cancelled: boolean;
  checkInDate: dateYYYYMMDD;
  checkOutDate: dateYYYYMMDD;
  currencyCode: currencyCode;
  hotelName: string;
  id: bookingId;
  occupancy: number;
  paid: boolean;
  total: number;
};

function isBookingArray(data: any[]): data is Booking[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.cancelled === "boolean" &&
        typeof item.checkInDate === "string" &&
        typeof item.checkOutDate === "string" &&
        item.currencyCode === "USD" && // Assuming currencyCode is always "USD"
        typeof item.hotelName === "string" &&
        typeof item.id === "number" &&
        typeof item.occupancy === "number" &&
        typeof item.paid === "boolean" &&
        typeof item.total === "number"
    )
  );
}

async function parseResponse(response: Response): Promise<any> {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });

  const data = await parseResponse(response);

  if (!isBookingArray(data)) {
    throw new Error("Invalid data format received from API");
  }
  return data;
}
