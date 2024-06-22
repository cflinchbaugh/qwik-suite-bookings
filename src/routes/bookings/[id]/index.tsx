import { component$, useResource$, Resource } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import BookingDetailsItem from "~/components/booking/BookingDetailsItem";
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
    <div class="p-8">
      <Link href={`/bookings/`}>← View All Bookings</Link>

      <h1>Booking Detail</h1>
      <Resource
        value={bookingsData}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>Error: {error.message}</div>}
        onResolved={(booking) => <BookingDetailsItem {...booking} />}
      />
    </div>
  );
});
