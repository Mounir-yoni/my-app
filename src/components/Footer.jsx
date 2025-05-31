import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Travel Agency</h3>
                        <p className="text-gray-300 mb-4">
                            Making your travel dreams come true since 2013. We specialize in creating unforgettable experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/offers" className="text-gray-300 hover:text-white transition-colors">
                                    Offers
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>123 Travel Street</li>
                            <li>City, Country</li>
                            <li>Phone: +1 234 567 890</li>
                            <li>Email: info@travelagency.com</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                Facebook
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                Twitter
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Travel Agency. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 