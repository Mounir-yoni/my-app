import Hero from '../components/Hero';
import Features from '../components/Features';
import OffersSlider from '../components/OffersSlider';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import VacationPromo from '../components/VacationPromo';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Travel Agency - Your Journey Begins Here',
    description: 'Discover amazing travel experiences with our expert travel agency. We offer customized tours, luxury accommodations, and unforgettable adventures worldwide. Book your dream vacation today!',
    keywords: [
        'travel agency',
        'tours',
        'vacation packages',
        'luxury travel',
        'customized tours',
        'holiday packages',
        'travel services',
        'adventure tours',
        'family vacations',
        'honeymoon packages'
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Travel Agency - Your Journey Begins Here',
        description: 'Discover amazing travel experiences with our expert travel agency. We offer customized tours, luxury accommodations, and unforgettable adventures worldwide.',
        url: '/',
        siteName: 'Travel Agency',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Travel Agency - Your Journey Begins Here',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Travel Agency - Your Journey Begins Here',
        description: 'Discover amazing travel experiences with our expert travel agency.',
        images: ['/twitter-image.jpg'],
    },
};

export default function Home() {
    return (
        <main>
            <Hero />
            <Features />
            <VacationPromo />
            <OffersSlider />
            <Services />
            <Testimonials />
        </main>
    );
} 