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

type BookingStatus =
  | "Paid, Cancelled"
  | "Paid"
  | "Cancelled"
  | "Payment Required";

const calculateStatus = (cancelled: boolean, paid: boolean): BookingStatus => {
  if (paid && cancelled) {
    return "Paid, Cancelled";
  } else if (paid) {
    return "Paid";
  } else if (cancelled) {
    return "Cancelled";
  } else {
    return "Payment Required";
  }
};

const statusColorCodeMap = {
  "Paid, Cancelled": "bg-orange-500",
  Paid: "bg-green-500",
  Cancelled: "bg-red-500",
  "Payment Required": "bg-yellow-500",
};

const statusIconMap = {
  "Paid, Cancelled": "!",
  Paid: "✓",
  Cancelled: "✗",
  "Payment Required": "!",
};

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
    const status = calculateStatus(cancelled, paid);
    return (
      <div class="flex flex-col border rounded p-4 bg-[#161a26] hover:bg-[#101420]">
        <div class="text-lg font-bold pb-3">{hotelName}</div>

        <div class="flex flex-col flex-grow justify-between">
          <div class="grid grid-cols-2 gap-8">
            <div class="flex flex-col">
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

            <div class="flex flex-col">
              <ItemInfo
                label="Total"
                value={convertCurrency({
                  currencyCode: currencyCode,
                  total: total,
                })}
              />

              <div class="flex row gap-2">
                <ItemInfo label="Status" value={status} />
                <div
                  class={`rounded-full w-fit h-fit px-2 ${statusColorCodeMap[status]}`}
                >
                  {statusIconMap[status]}
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-2">
            <Link
              href={`/bookings/${id}`}
              class="text-blue-500 hover:underline"
            >
              See details
            </Link>
          </div>
        </div>
      </div>
    );
  }
);
