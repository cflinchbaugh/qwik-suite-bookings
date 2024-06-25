import { Resource, component$ } from "@builder.io/qwik";
import type { Booking } from "~/services/bookingsService";
import { fetchBookings } from "~/services/bookingsService";
import BookingItem from "~/components/booking/BookingItem";
import LoadingSpinner from "~/components/loaders/LoadingSpinner";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useBookingsLoader = routeLoader$(async () => {
  return fetchBookings();
});

export default component$(() => {
  const bookingsData = useBookingsLoader();

  return (
    <div class="p-8">
      <div>
        <Resource
          onPending={() => (
            <div class="flex justify-center">
              <LoadingSpinner />
            </div>
          )}
          onRejected={() => <div>Error</div>}
          onResolved={(data: Booking[]) => (
            <div class="grid gap-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {data.map((booking) => (
                <BookingItem key={booking.id} {...booking} />
              ))}
            </div>
          )}
          value={bookingsData}
        />
      </div>
    </div>
  );
});
