import { $, component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cancelBooking, type BookingDetails } from "~/services/bookingsService";
import { convertCurrency } from "~/utils/currency";
import { calculateNights } from "~/utils/dates";
import ItemInfo from "../item/ItemInfo";

type BookingDetailsItemProps = BookingDetails;

export default component$<BookingDetailsItemProps>(
  ({
    cancelledAt: cancelledAtString,
    checkInDate,
    checkOutDate,
    currencyCode,
    customer,
    hotel,
    id,
    occupancy,
    notes,
    paidInFullAt,
    room,
    total,
  }) => {
    const showCancelConfirmation = useSignal(false);
    const cancelledAt = useSignal(cancelledAtString);
    const notesEdited = useSignal(notes === null ? undefined : notes);

    const handleCancelBooking = $(async () => {
      await cancelBooking(id, notesEdited.value ?? "");

      const now = new Date();
      const isoDateString = now.toISOString();
      cancelledAt.value = isoDateString;

      showCancelConfirmation.value = false;
    });

    return (
      <div class="flex flex-col border rounded gap-8 p-12 bg-[#161a26] hover:bg-[#101420]">
        <ItemInfo
          label="Customer"
          value={`${customer.lastName}, ${customer.firstName} (${customer.email})`}
        />

        <div class="flex flex-row">
          <div class="flex flex-col flex-1 gap-2">
            <ItemInfo label="Hotel" value={hotel.name} />
            <ItemInfo label="Reserverd Occupancy" value={occupancy} />
            <ItemInfo label="Max Occupancy" value={room.maxOccupancy} />
            <ItemInfo label="Max Units" value={room.maxUnits} />
          </div>

          <div class="flex flex-col flex-1 gap-2">
            <div class="flex row gap-2">
              <ItemInfo
                label="Status"
                value={
                  paidInFullAt
                    ? `Paid in Full: ${paidInFullAt}`
                    : cancelledAt.value
                      ? `Cancelled: ${cancelledAt.value}`
                      : "Payment Required"
                }
              />
              <div
                class={`rounded-full w-fit h-fit px-2 ${paidInFullAt ? "bg-green-600" : cancelledAt.value ? "bg-yellow-500" : "bg-red-500"}`}
              >
                {paidInFullAt ? "✓" : cancelledAt.value ? "!!" : "X"}
              </div>
            </div>

            {(cancelledAt.value || notes) && (
              <ItemInfo label="Notes" value={notes ?? "-"} />
            )}

            {!showCancelConfirmation.value && cancelledAt.value === null && (
              <button
                class="bg-red-500 hover:bg-red-800"
                onClick$={() => (showCancelConfirmation.value = true)}
              >
                Cancel This Booking
              </button>
            )}

            {showCancelConfirmation.value && (
              <div class="flex flex-col gap-4">
                <input
                  bind:value={notesEdited}
                  class="w-full text-red-900 p-2"
                  type="textarea"
                  placeholder="Reason for cancellation*"
                  value={notesEdited.value}
                />

                <button onClick$={() => (showCancelConfirmation.value = false)}>
                  Do Not Cancel
                </button>

                <button
                  class={
                    notesEdited.value?.length
                      ? "bg-red-500 hover:bg-red-800"
                      : "bg-slate-500 cursor-not-allowed"
                  }
                  disabled={!notesEdited.value?.length}
                  onClick$={handleCancelBooking}
                >
                  Confirm Cancellation
                </button>
              </div>
            )}

            <ItemInfo
              label="Total"
              value={convertCurrency({ currencyCode, total })}
            />
            <ItemInfo label="Check-in" value={checkInDate} />
            <ItemInfo label="Check-out" value={checkOutDate} />
            <ItemInfo
              label="Total Nights"
              value={calculateNights({
                checkInDate,
                checkOutDate,
              })}
            />
          </div>
        </div>

        <div>
          <div class="font-bold pb-6">Additional Customer Bookings</div>
          {customer.bookingIds.length ? (
            <div class="flex flex-wrap gap-3">
              {customer.bookingIds.map((id) => (
                <Link key={id} href={`/bookings/${id}`}>
                  {id}
                </Link>
              ))}
            </div>
          ) : (
            "-"
          )}
        </div>
      </div>
    );
  }
);
