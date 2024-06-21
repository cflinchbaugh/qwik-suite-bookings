import { Resource, component$, useResource$ } from "@builder.io/qwik";

const API_KEY = import.meta.env.VITE_API_KEY;

type dateYYYYMMDD = string;
type currencyCode = "USD"; //Ultimately this should include all the supported currencies in the system, I only saw USD
type bookingId = number; //Normally I declare number in the type object, but in this case I am prepping in case we want to swap number with UUID
type Booking = {
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

export default component$(() => {
  const bookingsData = useResource$(async () => {
    try {
      const response = await fetch(
        "https://traverse-assignment-api.esdee.workers.dev/bookings",
        {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject("Failed to fetch bookings");
    }
  });

  return (
    <>
      <section class="section bright">A Booking!</section>
      <Resource
        value={bookingsData}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(data: Booking[]) =>
          data.map((booking) => <div key={booking.id}>{booking.hotelName}</div>)
        }
      />
    </>
  );
});
