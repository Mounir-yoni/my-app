import AuthForm from './components/AuthForm';

export const metadata = {
    title: 'Authentication - Travel Agency',
    description: 'Sign in or create an account to access your travel bookings and preferences.',
};

export default function AuthPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-6">
            <div className="w-full mt-10 max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
                <AuthForm />
            </div>
        </div>
    );
}
