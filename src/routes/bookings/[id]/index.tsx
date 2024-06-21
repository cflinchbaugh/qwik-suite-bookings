import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  const { id } = location.params;

  return (
    <div>
      <h1>Booking Detail</h1>
      <p>Booking ID: {id}</p>
    </div>
  );
});
