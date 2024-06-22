import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { BookingDetails } from "~/services/bookingsService";
import { convertCurrency } from "~/utils/currency";
import { calculateNights } from "~/utils/dates";
import ItemInfo from "../item/ItemInfo";

type BookingDetailsItemProps = BookingDetails;

export default component$<BookingDetailsItemProps>(
  ({
    cancelledAt,
    checkInDate,
    checkOutDate,
    currencyCode,
    customer,
    hotel,
    occupancy,
    notes,
    paidInFullAt,
    room,
    total,
  }) => {
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
                    : cancelledAt
                      ? `Cancelled: ${cancelledAt}`
                      : "Payment Required"
                }
              />
              <div
                class={`rounded-full w-fit h-fit px-2 ${paidInFullAt ? "bg-green-600" : cancelledAt ? "bg-yellow-500" : "bg-red-500"}`}
              >
                {paidInFullAt ? "✓" : cancelledAt ? "!!" : "X"}
              </div>
            </div>

            {(cancelledAt || notes) && (
              <ItemInfo label="Notes" value={notes ?? "-"} />
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
