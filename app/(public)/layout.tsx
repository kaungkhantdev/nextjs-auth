import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MyApp
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}