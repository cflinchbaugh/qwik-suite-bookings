import { component$, useResource$, Resource } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { BookingDetails } from "~/services/bookingsService";
import { fetchBookingById } from "~/services/bookingsService";

export default component$(() => {
  const location = useLocation();
  const { id } = location.params;

  const bookingsData = useResource$<BookingDetails>(async ({ track }) => {
    track(() => id);
    return fetchBookingById(id);
  });

  return (
    <div>
      <Link href={`/bookings/`}>View All Bookings</Link>

      <h1>Booking Detail</h1>
      <Resource
        value={bookingsData}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>Error: {error.message}</div>}
        onResolved={(booking) => (
          <div>
            <p>Hotel Name: {booking.hotel.name}</p>
            <p>Check-in Date: {booking.checkInDate}</p>
            <p>Check-out Date: {booking.checkOutDate}</p>
            <p>Total: {booking.total}</p>
            <p>Currency: {booking.currencyCode}</p>
          </div>
        )}
      />
    </div>
  );
});
