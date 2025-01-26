import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FodStock</span>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Launch Dashboard
            </Link>
          </nav>
        </header>

        <main className="mt-16 sm:mt-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Introducing FodStock
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  Your Gateway to Indian Stock Market
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Track real-time performance of Nifty 500 companies, analyze trends, and make informed investment decisions with our comprehensive stock dashboard.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <img
                  className="w-full rounded-lg"
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000"
                  alt="Stock market dashboard preview"
                />
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose FodStock?
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Real-time Data',
                  description: 'Get up-to-the-minute stock prices and market trends for informed decision making.',
                },
                {
                  title: 'Advanced Analytics',
                  description: 'Analyze historical data with interactive charts and comprehensive metrics.',
                },
                {
                  title: 'Complete Coverage',
                  description: 'Track all Nifty 500 companies in one place with detailed company information.',
                },
              ].map((feature) => (
                <div key={feature.title} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Landing;