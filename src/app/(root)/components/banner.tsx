import React from 'react'

const banners = [
    {
        id: 1,
        title: "Promo Spesial Awal Tahun",
        description: "Diskon hingga 50% untuk produk fashion.",
        image_url: "/image/image1.jpg",
        link: "/promo/awal-tahun",
        start_date: "2025-01-01T00:00:00Z",
        end_date: "2025-01-31T23:59:59Z",
        is_active: true
    },
    {
        id: 2,
        title: "Belanja Hemat Akhir Pekan",
        description: "Nikmati cashback hingga Rp100.000 untuk belanja elektronik.",
        image_url: "/image/image2.jpg",
        link: "/promo/akhir-pekan",
        start_date: "2025-01-15T00:00:00Z",
        end_date: "2025-01-17T23:59:59Z",
        is_active: true
    }
];

const Banner = () => {
    return (
        <div className="w-full overflow-hidden container mx-auto h-[500px]">
            {banners.map(banner => (
                <div key={banner.id} className="relative h-[500px] w-full">
                    <img 
                        src={banner.image_url} 
                        alt={banner.title} 
                        className="absolute inset-0 h-full w-full object-cover object-center" 
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center text-white">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">{banner.title}</h1>
                            <p className="mt-2 text-lg">{banner.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Banner
