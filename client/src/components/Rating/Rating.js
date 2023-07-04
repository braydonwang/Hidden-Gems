import StarRating from "./StarRating";
import NoStarRating from "./NoStarRating";

export default function Rating({ rating }) {
  const numOfStars = Math.floor(rating);
  const numOfEmptyStars = 5 - numOfStars;

  return (
    <div class="flex items-center">
      {[...Array(numOfStars)].map((_, i) => (
        <StarRating />
      ))}
      {[...Array(numOfEmptyStars)].map((_, i) => (
        <NoStarRating />
      ))}
      <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {rating} out of 5
      </p>
    </div>
  );
}
