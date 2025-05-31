import AboutContent from './components/AboutContent';

export const metadata = {
    title: 'About Us - Travel Agency',
    description: 'Learn more about our travel agency, our mission, vision, and values.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
            <div className="max-w-6xl mx-auto mt-12">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-16 text-center">
                    ✨ À propos de <span className="text-amber-600">Travel Agency</span>
                </h1>
                <AboutContent />
            </div>
        </div>
    );
}
