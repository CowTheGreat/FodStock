import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

function StockChart({ data, timeframe }) {
  // Format X-axis ticks based on timeframe
  const formatXAxis = (timestamp) => {
    switch (timeframe) {
      case '1W':
        return format(new Date(timestamp), 'EEE'); // Mon, Tue, etc.
      case '1M':
        return format(new Date(timestamp), 'dd MMM'); // 01 Jan, etc.
      case '1Y':
        return format(new Date(timestamp), 'MMM yy'); // Jan 23, etc.
      default:
        return format(new Date(timestamp), 'MMM dd');
    }
  };

  // Calculate Y-axis domain
  const prices = data.map(item => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.1; // Add 10% padding

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            fontSize={12}
            interval="preserveStartEnd"
          />
          <YAxis 
            fontSize={12}
            domain={[minPrice - padding, maxPrice + padding]}
            tickFormatter={(value) => `₹${value.toFixed(0)}`}
          />
          <Tooltip
            labelFormatter={(timestamp) => format(new Date(timestamp), 'PPP')} // Mon, Jan 1, 2023
            formatter={(value) => [`₹${value.toFixed(2)}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;