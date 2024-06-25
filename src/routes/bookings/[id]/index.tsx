import { component$, Resource } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import BookingDetailsItem from "~/components/booking/BookingDetailsItem";
import LoadingSpinner from "~/components/loaders/LoadingSpinner";
import { fetchBookingById } from "~/services/bookingsService";

export const useBookingDetailsLoader = routeLoader$(async (requestEvent) => {
  const { params } = requestEvent;
  const { id } = params;
  return fetchBookingById(id);
});

export default component$(() => {
  const bookingsData = useBookingDetailsLoader();

  return (
    <div class="p-8">
      <Link href={`/bookings/`}>← View All Bookings</Link>

      <h1>Booking Detail</h1>
      <Resource
        value={bookingsData}
        onPending={() => (
          <div class="flex flex-col m-auto p-12">
            <LoadingSpinner />
          </div>
        )}
        onRejected={(error) => {
          console.error(error);
          return <div>Error: Booking Not Found</div>;
        }}
        onResolved={(booking) => <BookingDetailsItem {...booking} />}
      />
    </div>
  );
});
