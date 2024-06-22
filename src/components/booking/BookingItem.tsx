import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Booking } from "~/services/bookingsService";
import { convertCurrency } from "~/utils/currency";
import { calculateNights } from "~/utils/dates";

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
      <div
        style={{
          border: "solid 1px",
          borderRadius: "5px",
          margin: "15px",
          padding: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {hotelName}

          <div>Check-in: {checkInDate}</div>
          <div>Check-out: {checkOutDate}</div>
          <div>
            Total Nights:
            {calculateNights({
              checkInDate,
              checkOutDate,
            })}
          </div>

          <div>
            Total:{" "}
            {convertCurrency({
              currencyCode: currencyCode,
              total: total,
            })}
          </div>

          {cancelled && <div>Cancelled</div>}
          {paid && <div>Paid</div>}
          {!paid && <div>Unpaid</div>}

          <Link href={`/bookings/${id}`}>See details</Link>
        </div>
      </div>
    );
  }
);
