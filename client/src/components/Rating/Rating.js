import Stars from "./Stars";

export default function Rating({ rating }) {
  return (
    <div class="flex items-center">
      <Stars rating={rating} />
      <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {rating} out of 5
      </p>
    </div>
  );
}
