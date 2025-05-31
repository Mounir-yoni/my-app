import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

export const metadata = {
    title: 'Contact Us - Travel Agency',
    description: 'Get in touch with our travel experts. We are here to help you plan your perfect journey.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-amber-800 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </div>
        </div>
    );
} 