import Stars from "./Stars";

export default function Rating({ rating, numRatings }) {
  return (
    <div class="flex items-center">
      <Stars rating={rating} />
      <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {rating} out of 5
        <span className="text-xs italic ml-2">
          ({numRatings} {numRatings === 1 ? "review" : "reviews"})
        </span>
      </p>
    </div>
  );
}
