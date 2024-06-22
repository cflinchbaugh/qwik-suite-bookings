import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { BookingDetails } from "~/services/bookingsService";
import { convertCurrency } from "~/utils/currency";
import { calculateNights } from "~/utils/dates";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "solid 1px",
          borderRadius: "5px",
          gap: "8px",
          margin: "15px",
          padding: "5px",
        }}
      >
        <div>
          Booked by: {customer.lastName}, {customer.firstName} ({customer.email}
          )
        </div>
        <div>Hotel: {hotel.name}</div>
        <div>Occupancy: {occupancy}</div>
        <div>Max Units: {room.maxUnits}</div>
        <div>Max Occupancy: {room.maxOccupancy}</div>

        <div>Cancelled: {cancelledAt ?? "-"}</div>
        <div>{(cancelledAt || notes) && <div>Notes: {notes}</div>}</div>
        <div>Paid in Full: {paidInFullAt ?? "-"}</div>
        <div>Total: {convertCurrency({ currencyCode, total })}</div>

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
          Additional Customer Bookings
          {customer.bookingIds.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
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
