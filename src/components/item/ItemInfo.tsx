import { component$ } from "@builder.io/qwik";

type ItemInfoProps = {
  label: string;
  value: string | number;
};

export default component$<ItemInfoProps>(({ label, value }) => {
  return (
    <div class="flex gap-1">
      <div class="font-bold">{label}:</div>
      <div>{value}</div>
    </div>
  );
});
