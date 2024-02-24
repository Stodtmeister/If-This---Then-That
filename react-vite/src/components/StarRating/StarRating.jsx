import './StarRating.css'

function StarRating({ rating }) {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="star-rating">
      {Array(filledStars).fill().map((_, i) => (
        <span key={i} className="star-icon filled">&#9733;</span>
      ))}
      {Array(emptyStars).fill().map((_, i) => (
        <span key={i} className="star-icon empty">&#9734;</span>
      ))}
    </div>
  );
}

export default StarRating;
