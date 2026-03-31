import { useState } from 'react';
import { ArrowLeft, LogOut, Search } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoricalDataProps {
  selectedZone: string;
  onBackToDashboard: () => void;
  onLogout: () => void;
}

interface WeatherRecord {
  id: string;
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  avgHumidity: number;
  totalRainfall: number;
}

const zones = {
  'laman': 'Laman',
  'sangkar-burung': 'Sangkar Burung',
  'taman-rama-rama': 'Taman Rama Rama',
};

// Generate mock historical data for the past 30 days
const generateMockData = (days: number): WeatherRecord[] => {
  const data: WeatherRecord[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Different temperature ranges based on period
    const tempBase = days === 7 ? 25 : 22; // Higher temps for recent week
    const tempVariation = days === 7 ? 8 : 12; // Less variation for recent week
    
    data.push({
      id: `HR${String(i + 1).padStart(3, '0')}`,
      date: date.toISOString().split('T')[0],
      avgTemp: Number((tempBase + Math.random() * tempVariation).toFixed(1)),
      maxTemp: Number((tempBase + 5 + Math.random() * tempVariation).toFixed(1)),
      minTemp: Number((tempBase - 5 + Math.random() * 5).toFixed(1)),
      avgHumidity: Number(((days === 7 ? 55 : 60) + Math.random() * 35).toFixed(1)),
      totalRainfall: Number((Math.random() * (days === 7 ? 15 : 25)).toFixed(1)),
    });
  }
  
  return data;
};

export function HistoricalData({ selectedZone, onBackToDashboard, onLogout }: HistoricalDataProps) {
  const [filterPeriod, setFilterPeriod] = useState<'7days' | '30days'>('30days');
  const [records, setRecords] = useState<WeatherRecord[]>(generateMockData(30));
  const [searchDate, setSearchDate] = useState('');

  // Update records when filter period changes
  const handleFilterChange = (period: '7days' | '30days') => {
    setFilterPeriod(period);
    const days = period === '7days' ? 7 : 30;
    setRecords(generateMockData(days));
    setSearchDate(''); // Clear search when changing period
  };

  // Filter records based on search date
  const getFilteredRecords = () => {
    if (!searchDate) return records;

    const searchDateTime = new Date(searchDate);
    
    return records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.toISOString().split('T')[0] === searchDate;
    });
  };

  const filteredRecords = getFilteredRecords();

  // Prepare chart data from filtered records
  const chartData = filteredRecords.slice(0, 10).reverse().map(record => ({
    date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    avgTemp: record.avgTemp,
    maxTemp: record.maxTemp,
    minTemp: record.minTemp,
    avgHumidity: record.avgHumidity,
    rainfall: record.totalRainfall,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToDashboard}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-gray-900">Historical Weather Data</h1>
                <p className="text-gray-600">{zones[selectedZone as keyof typeof zones]}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-900 mb-6">Weather Records</h2>

          {/* Summary Stats - Moved to Top */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-600 mb-1">Total Records</p>
              <p className="text-blue-900">{filteredRecords.length}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-orange-600 mb-1">Avg Temperature</p>
              <p className="text-orange-900">
                {filteredRecords.length > 0 
                  ? (filteredRecords.reduce((sum, r) => sum + r.avgTemp, 0) / filteredRecords.length).toFixed(1)
                  : '0'}°C
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 mb-1">Avg Humidity</p>
              <p className="text-green-900">
                {filteredRecords.length > 0
                  ? (filteredRecords.reduce((sum, r) => sum + r.avgHumidity, 0) / filteredRecords.length).toFixed(1)
                  : '0'}%
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-600 mb-1">Total Rainfall</p>
              <p className="text-purple-900">
                {filteredRecords.reduce((sum, r) => sum + r.totalRainfall, 0).toFixed(1)} mm
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2">
                Search by Date
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <label className="block text-gray-700 mb-2">
                Filter Period
              </label>
              <select
                value={filterPeriod}
                onChange={(e) => handleFilterChange(e.target.value as '7days' | '30days')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
              </select>
            </div>
            {searchDate && (
              <div className="sm:w-32 flex items-end">
                <button
                  onClick={() => setSearchDate('')}
                  className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Avg Temp (°C)</th>
                  <th className="text-left py-3 px-4 text-gray-700">Max Temp (°C)</th>
                  <th className="text-left py-3 px-4 text-gray-700">Min Temp (°C)</th>
                  <th className="text-left py-3 px-4 text-gray-700">Avg Humidity (%)</th>
                  <th className="text-left py-3 px-4 text-gray-700">Rainfall (mm)</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{record.id}</td>
                      <td className="py-3 px-4 text-gray-600">{record.date}</td>
                      <td className="py-3 px-4 text-gray-600">{record.avgTemp}</td>
                      <td className="py-3 px-4 text-gray-600">{record.maxTemp}</td>
                      <td className="py-3 px-4 text-gray-600">{record.minTemp}</td>
                      <td className="py-3 px-4 text-gray-600">{record.avgHumidity}</td>
                      <td className="py-3 px-4 text-gray-600">{record.totalRainfall}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center text-gray-500">
                      No records found for the selected period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Charts */}
          <div className="mt-6">
            <h3 className="text-gray-900 mb-4">Temperature and Humidity Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgTemp" stroke="#FF6347" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="maxTemp" stroke="#FF4500" />
                <Line type="monotone" dataKey="minTemp" stroke="#00BFFF" />
                <Line type="monotone" dataKey="avgHumidity" stroke="#32CD32" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h3 className="text-gray-900 mb-4">Rainfall Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rainfall" fill="#4682B4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}