import { Resource, component$, useResource$ } from "@builder.io/qwik";
import type { Booking } from "~/services/bookingsService";
import { fetchBookings } from "~/services/bookingsService";
import BookingItem from "~/components/booking/BookingItem";

export default component$(() => {
  const bookingsData = useResource$(fetchBookings);

  return (
    <>
      <section class="section bright">A Booking!</section>
      <Resource
        value={bookingsData}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(data: Booking[]) =>
          data.map((booking) => <BookingItem key={booking.id} {...booking} />)
        }
      />
    </>
  );
});
