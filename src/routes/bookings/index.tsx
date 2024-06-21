import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { Booking, fetchBookings } from "~/services/bookingsService";

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
          data.map((booking) => <div key={booking.id}>{booking.hotelName}</div>)
        }
      />
    </>
  );
});
