import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { Booking, fetchBookings } from "~/services/bookingsService";

const convertCurrency = ({
  currencyCode,
  total,
}: {
  currencyCode: string;
  total: number;
}) => {
  switch (currencyCode.toUpperCase()) {
    case "USD":
      return `$${total / 100}`;
    default:
      throw new Error(`Unsupported currency: ${currencyCode}`);
  }
};

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
          data.map((booking) => (
            <div
              style={{
                border: "solid 1px",
                borderRadius: "5px",
                margin: "15px",
                padding: "5px",
              }}
              key={booking.id}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {booking.hotelName}

                <div>
                  {booking.checkInDate} - {booking.checkOutDate}
                </div>

                <div>
                  Total:{" "}
                  {convertCurrency({
                    currencyCode: booking.currencyCode,
                    total: booking.total,
                  })}
                </div>
              </div>
            </div>
          ))
        }
      />
    </>
  );
});
