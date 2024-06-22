import { Resource, component$, useResource$ } from "@builder.io/qwik";
import type { Booking } from "~/services/bookingsService";
import { fetchBookings } from "~/services/bookingsService";
import BookingItem from "~/components/booking/BookingItem";

export default component$(() => {
  const bookingsData = useResource$(fetchBookings);

  return (
    <div class="p-8">
      <div class="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Resource
          value={bookingsData}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div>Error</div>}
          onResolved={(data: Booking[]) =>
            data.map((booking) => <BookingItem key={booking.id} {...booking} />)
          }
        />
      </div>
    </div>
  );
});
