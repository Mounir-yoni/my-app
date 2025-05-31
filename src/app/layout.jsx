import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { NotificationProvider } from "../context/NotificationContext";
import Footer from '../components/Footer';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

export const metadata = {
    metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
    title: {
        default: 'Travel Agency - Your Trusted Travel Partner',
        template: '%s | Travel Agency'
    },
    description: 'Discover amazing travel experiences with our trusted travel agency. We offer personalized travel packages, expert guidance, and unforgettable adventures worldwide.',
    keywords: ['travel agency', 'vacation packages', 'travel tours', 'holiday packages', 'travel services'],
    authors: [{ name: 'Your Agency Name' }],
    creator: 'Your Agency Name',
    publisher: 'Your Agency Name',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://your-domain.com',
        siteName: 'Travel Agency',
        title: 'Travel Agency - Your Trusted Travel Partner',
        description: 'Discover amazing travel experiences with our trusted travel agency. We offer personalized travel packages, expert guidance, and unforgettable adventures worldwide.',
        images: [
            {
                url: '/og-image.jpg', // Add your OG image
                width: 1200,
                height: 630,
                alt: 'Travel Agency',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Travel Agency - Your Trusted Travel Partner',
        description: 'Discover amazing travel experiences with our trusted travel agency.',
        images: ['/twitter-image.jpg'], // Add your Twitter image
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-site-verification', // Add your Google verification code
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="canonical" href="https://your-domain.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className={montserrat.className}>
                <Navbar />
                <NotificationProvider>
                    {children}
                </NotificationProvider>
                <Footer />
            </body>
        </html>
    );
} 