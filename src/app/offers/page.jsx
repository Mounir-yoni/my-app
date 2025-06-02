import OfferCard from './components/OfferCard';

export const metadata = {
    title: 'Offers',
    description: 'Our Travel Offers',
};

async function getOffers() {
    try {
        const res = await fetch('https://back-end-obur.onrender.com/api/v1/voyages', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch offers');
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching offers:', error);
        throw error;
    }
}

export default async function OffersPage() {
    let offers;
    let error = null;

    try {
        offers = await getOffers();
    } catch (err) {
        error = 'Failed to fetch offers. Please try again later.';
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    <p className="text-xl">{error}</p>
                    <a
                        href="/offers"
                        className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition inline-block"
                    >
                        Try Again
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">Our Travel Offers</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our handpicked selection of amazing travel experiences. From exotic destinations to cultural adventures, find your perfect journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <OfferCard key={offer._id} offer={offer} />
                    ))}
                </div>
            </div>
        </div>
    );
} 