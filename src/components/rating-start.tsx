import React from "react";

interface StarRatingProps {
    maxStars?: number;
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, rating }) => {
    // Format rating ke 2 digit desimal
    const formattedRating = Number(rating.toFixed(2));

    // Pastikan rating tidak melebihi maxStars
    const clampedRating = Math.min(Math.max(0, formattedRating), maxStars);

    return (
        <div className="flex flex-row items-center">
            {Array.from({ length: maxStars }, (_, index) => {
                const starRating = clampedRating - index;
                let fillPercentage = 0;

                if (starRating >= 1) {
                    fillPercentage = 100;
                } else if (starRating > 0) {
                    fillPercentage = starRating * 100;
                }

                return (
                    <div key={index} className="relative w-6 h-6">
                        {/* Bintang kosong */}
                        <span className="absolute inset-0 flex items-center justify-center text-2xl text-gray-300">
                            ☆
                        </span>

                        {/* Bintang terisi */}
                        <span
                            className="absolute inset-0 flex items-center justify-center text-2xl text-yellow-400"
                            style={{
                                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                                transition: 'clip-path 0.2s ease-in-out'
                            }}
                        >
                            ★
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default StarRating;