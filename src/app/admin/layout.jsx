import { Montserrat } from 'next/font/google';
import '../globals.css';
import { NotificationProvider } from "../../context/NotificationContext";

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

export const metadata = {
    title: 'Admin Panel - Travel Agency',
    description: 'Admin dashboard for travel agency management',
};

export default function AdminLayout({ children }) {
    return (
        <NotificationProvider>
            {children}
        </NotificationProvider>
    );
}