import type { dateYYYYMMDD, dateYYYYMMDDtime } from "~/utils/dates";

const API_KEY = import.meta.env.PUBLIC_API_KEY!;
const API_URL = import.meta.env.PUBLIC_API_URL!;

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

type emailAddress = string;
type id = number;

export type Customer = {
  bookingIds: bookingId[];
  email: emailAddress;
  firstName: string;
  id: id;
  lastName: string;
};

export type Hotel = { id: id; name: string };
export type Room = {
  id: id;
  maxUnits: number;
  maxOccupancy: number;
  name: string;
};

export type BookingDetails = {
  cancelledAt: null | dateYYYYMMDDtime;
  checkInDate: dateYYYYMMDD;
  createdAt: dateYYYYMMDDtime;
  checkOutDate: dateYYYYMMDD;
  currencyCode: currencyCode;
  customer: Customer;
  hotel: Hotel;
  id: id;
  occupancy: number;
  notes: null | string;
  paidInFullAt: null | dateYYYYMMDDtime;
  room: Room;
  total: number;
  updatedAt: dateYYYYMMDDtime;
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

const isCustomer = (customer: any): customer is Customer =>
  typeof customer === "object" &&
  Array.isArray(customer.bookingIds) &&
  customer.bookingIds.every((id: any) => typeof id === "number") &&
  typeof customer.email === "string" &&
  typeof customer.firstName === "string" &&
  typeof customer.id === "number" &&
  typeof customer.lastName === "string";

const isHotel = (hotel: any): hotel is Hotel =>
  typeof hotel === "object" &&
  typeof hotel.id === "number" &&
  typeof hotel.name === "string";

const isRoom = (room: any): room is Room =>
  typeof room === "object" &&
  typeof room.id === "number" &&
  typeof room.maxUnits === "number" &&
  typeof room.maxOccupancy === "number" &&
  typeof room.name === "string";

function isBookingDetails(data: any): data is BookingDetails {
  return (
    data !== null &&
    typeof data === "object" &&
    (typeof data.cancelledAt === "string" || data.cancelledAt === null) &&
    typeof data.checkInDate === "string" &&
    typeof data.createdAt === "string" &&
    typeof data.checkOutDate === "string" &&
    data.currencyCode === "USD" && // Extend this check if more currencies are supported
    isCustomer(data.customer) &&
    isHotel(data.hotel) &&
    typeof data.id === "number" &&
    typeof data.occupancy === "number" &&
    (typeof data.notes === "string" || data.notes === null) &&
    (typeof data.paidInFullAt === "string" || data.paidInFullAt === null) &&
    isRoom(data.room) &&
    typeof data.total === "number" &&
    typeof data.updatedAt === "string"
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

export async function fetchBookingById(id: string): Promise<BookingDetails> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });

  const data = await parseResponse(response);

  if (!isBookingDetails(data)) {
    throw new Error("Invalid data format received from API");
  }
  return data;
}
