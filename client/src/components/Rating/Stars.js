import StarRating from "./StarRating";
import NoStarRating from "./NoStarRating";

export default function Stars({ rating }) {
  const numOfStars = Math.floor(rating);
  const numOfEmptyStars = 5 - numOfStars;

  return (
    <div className="flex items-center">
      {[...Array(numOfStars)].map((_, i) => (
        <StarRating />
      ))}
      {[...Array(numOfEmptyStars)].map((_, i) => (
        <NoStarRating />
      ))}
    </div>
  );
}
