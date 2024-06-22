import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Booking } from "~/services/bookingsService";
import { convertCurrency } from "~/utils/currency";
import { calculateNights } from "~/utils/dates";
import ItemInfo from "../item/ItemInfo";

type BookingItemProps = Pick<
  Booking,
  | "cancelled"
  | "checkInDate"
  | "checkOutDate"
  | "currencyCode"
  | "hotelName"
  | "id"
  | "paid"
  | "total"
>;

export default component$<BookingItemProps>(
  ({
    cancelled,
    checkInDate,
    checkOutDate,
    currencyCode,
    hotelName,
    id,
    paid,
    total,
  }) => {
    return (
      <div class="flex flex-col border rounded p-4 bg-[#161a26] hover:bg-[#101420]">
        <div class="text-lg font-bold pb-3">{hotelName}</div>

        <div class="flex gap-8">
          <div class="flex flex-col flex-grow-[2]">
            <ItemInfo label="Check-in" value={checkInDate} />
            <ItemInfo label="Check-out" value={checkOutDate} />
            <ItemInfo
              label="Total Nights"
              value={calculateNights({
                checkInDate,
                checkOutDate,
              }).toString()}
            />
          </div>

          <div class="flex flex-col flex-1">
            <ItemInfo
              label="Total"
              value={convertCurrency({
                currencyCode: currencyCode,
                total: total,
              })}
            />

            <div class="flex row gap-2">
              <ItemInfo
                label="Status"
                value={
                  paid ? "Paid" : cancelled ? "Cancelled" : "Payment Required"
                }
              />
              <div
                class={`rounded-full w-fit h-fit px-2 ${paid ? "bg-green-600" : cancelled ? "bg-yellow-500" : "bg-red-500"}`}
              >
                {paid ? "✓" : cancelled ? "!!" : "X"}
              </div>
            </div>
          </div>
        </div>

        <div class="text-center ">
          <Link href={`/bookings/${id}`}>See details</Link>
        </div>
      </div>
    );
  }
);
