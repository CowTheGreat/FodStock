import { useState } from 'react';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import StockChart from '../components/StockChart';
import { NIFTY500_STOCKS } from '../utils/stockData';

const ITEMS_PER_PAGE = 50;

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');
  const [selectedStock, setSelectedStock] = useState(null);

  const totalPages = Math.ceil(NIFTY500_STOCKS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStocks = NIFTY500_STOCKS.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedStock(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">FodStock Dashboard</h1>
            </div>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stocks List */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentStocks.map((stock) => (
                      <tr 
                        key={stock.id}
                        onClick={() => setSelectedStock(stock)}
                        className={`cursor-pointer hover:bg-gray-50 ${selectedStock?.id === stock.id ? 'bg-blue-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={stock.logo} alt={stock.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.symbol}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{stock.currentPrice.toFixed(2)}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change > 0 ? '+' : ''}{stock.change}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(endIndex, NIFTY500_STOCKS.length)}</span> of{' '}
                      <span className="font-medium">{NIFTY500_STOCKS.length}</span> results
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center p-2 rounded-md border border-gray-300 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        const distance = Math.abs(page - currentPage);
                        return distance === 0 || distance === 1 || page === 1 || page === totalPages;
                      })
                      .map((page, index, array) => {
                        if (index > 0 && array[index - 1] !== page - 1) {
                          return [
                            <span key={`ellipsis-${page}`} className="px-4 py-2">...</span>,
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                                currentPage === page
                                  ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ];
                        }
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                              currentPage === page
                                ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center p-2 rounded-md border border-gray-300 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-4">
              {selectedStock ? (
                <>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedStock.name}</h2>
                    <p className="text-sm text-gray-500">{selectedStock.symbol}</p>
                  </div>
                  <div className="flex space-x-2 mb-4">
                    {['1W', '1M', '1Y'].map((timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedTimeframe === timeframe
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {timeframe}
                      </button>
                    ))}
                  </div>
                  <StockChart 
                    data={selectedStock.data[selectedTimeframe]} 
                    timeframe={selectedTimeframe}
                  />
                </>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Select a stock to view its chart
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;