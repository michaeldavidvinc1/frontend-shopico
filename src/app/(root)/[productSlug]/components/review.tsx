import React from 'react';

const Reviews = () => {
    // Sample review data - this could come from props or an API
    const reviews = [
        {
            id: 1,
            name: "Sarah Wijaya",
            rating: 5,
            date: "21 Feb 2025",
            comment: "Produk ini sangat bagus! Kualitasnya luar biasa! Saya sudah mencoba banyak produk serupa sebelumnya, tapi yang ini benar-benar berbeda. Sangat merekomendasikan untuk semua orang.",
            productImage: "/api/placeholder/150/150" // This one has an image
        },
        {
            id: 2,
            name: "Budi Santoso",
            rating: 4,
            date: "18 Feb 2025",
            comment: "Saya suka dengan produknya, pengiriman cepat dan pelayanan ramah. Hanya saja ukurannya sedikit lebih kecil dari yang saya harapkan, tapi tetap bagus.",
            productImage: null // This one doesn't have an image
        },
        {
            id: 3,
            name: "Dina Putri",
            rating: 5,
            date: "15 Feb 2025",
            comment: "Produk ini sesuai dengan deskripsi. Sangat puas dengan pembelian saya!",
            productImage: "/api/placeholder/150/150" // This one has an image
        }
    ];

    // Function to render stars based on rating
    const renderStars = (rating: number) => {
        return "⭐".repeat(rating) + "☆".repeat(5 - rating);
    };

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
            
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        {/* Review header with name, date and rating */}
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h4 className="font-bold text-gray-800 text-lg">{review.name}</h4>
                                <div className="text-yellow-500 text-sm mt-1">
                                    {renderStars(review.rating)}
                                    <span className="ml-2 text-gray-600">({review.rating}/5)</span>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{review.date}</span>
                        </div>
                        
                        {/* Review content */}
                        <div className={`flex flex-col ${review.productImage ? 'md:flex-row' : ''} gap-4 mt-4`}>
                            {/* Product Image - only show if it exists */}
                            {review.productImage && (
                                <div className="flex-shrink-0 mx-auto md:mx-0">
                                    <img 
                                        src={review.productImage} 
                                        alt="Product" 
                                        className="h-32 w-32 object-cover rounded-md border border-gray-200 shadow-sm"
                                    />
                                </div>
                            )}
                            
                            {/* Comment */}
                            <div className="flex-1">
                                <p className="text-gray-700 text-base italic">"<span>{review.comment}</span>"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Show more button */}
            <div className="mt-6 text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                    Load More Reviews
                </button>
            </div>
        </div>
    );
};

export default Reviews;