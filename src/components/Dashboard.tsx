import { useState } from 'react';
import { LogOut, History, Thermometer, Droplets, AlertTriangle, Activity, MapPin, FileText, ArrowLeft } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  userEmail: string;
  selectedZone: string;
  onNavigateToHistorical: () => void;
  onNavigateToReports: () => void;
  onChangeLocation: () => void;
  onLogout: () => void;
}

const zones = {
  'laman': 'Laman',
  'sangkar-burung': 'Sangkar Burung',
  'taman-rama-rama': 'Taman Rama Rama',
};

const generateMockData = (zoneId: string) => {
  const baseTemp = zoneId === 'laman-buaya' ? 28 : zoneId === 'sangkar-burung' ? 26 : 30;
  const baseHumidity = zoneId === 'laman-buaya' ? 65 : zoneId === 'sangkar-burung' ? 70 : 75;
  
  return {
    weather: [
      { id: 'WD001', temperature: baseTemp + Math.random() * 4, humidity: baseHumidity + Math.random() * 10, rainfall: Math.random() * 10, timestamp: new Date().toLocaleString() },
      { id: 'WD002', temperature: baseTemp + Math.random() * 4, humidity: baseHumidity + Math.random() * 10, rainfall: Math.random() * 10, timestamp: new Date(Date.now() - 300000).toLocaleString() },
      { id: 'WD003', temperature: baseTemp + Math.random() * 4, humidity: baseHumidity + Math.random() * 10, rainfall: Math.random() * 10, timestamp: new Date(Date.now() - 600000).toLocaleString() },
    ],
    alerts: [
      { id: 'ALT001', threshold: 'Temperature > 35°C', status: 'Active', createdTime: new Date(Date.now() - 3600000).toLocaleString() },
      { id: 'ALT002', threshold: 'Humidity > 80%', status: 'Resolved', createdTime: new Date(Date.now() - 7200000).toLocaleString() },
    ],
    sensors: [
      { id: 'SNS001', status: 'Online', lastUpdated: new Date().toLocaleString() },
      { id: 'SNS002', status: 'Online', lastUpdated: new Date(Date.now() - 180000).toLocaleString() },
      { id: 'SNS003', status: 'Offline', lastUpdated: new Date(Date.now() - 3600000).toLocaleString() },
    ],
  };
};

// Generate chart data for last 7 days
const generateChartData = (zoneId: string) => {
  const chartData = [];
  const baseTemp = zoneId === 'laman-buaya' ? 28 : zoneId === 'sangkar-burung' ? 26 : 30;
  const baseHumidity = zoneId === 'laman-buaya' ? 65 : zoneId === 'sangkar-burung' ? 70 : 75;
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    chartData.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      temperature: Number((baseTemp + Math.random() * 6 - 3).toFixed(1)),
      humidity: Number((baseHumidity + Math.random() * 10 - 5).toFixed(1)),
      rainfall: Number((Math.random() * 15).toFixed(1)),
    });
  }
  
  return chartData;
};

export function Dashboard({ userEmail, selectedZone, onNavigateToHistorical, onNavigateToReports, onChangeLocation, onLogout }: DashboardProps) {
  const zoneNames: Record<string, string> = {
    'laman-buaya': 'Laman Buaya',
    'sangkar-burung': 'Sangkar Burung',
    'taman-rama-rama': 'Taman Rama Rama',
  };

  const currentZone = zoneNames[selectedZone] || 'Unknown Zone';
  const mockData = generateMockData(selectedZone);
  const chartData = generateChartData(selectedZone);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h1 className="text-gray-900">Weather Dashboard</h1>
                <p className="text-gray-600">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onChangeLocation}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                title="Back to Location Selection"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNavigateToHistorical}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <History className="w-5 h-5" />
                Historical Data
              </button>
              <button
                onClick={onNavigateToReports}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <FileText className="w-5 h-5" />
                Reports
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Zone Display */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 mb-6 text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            <div>
              <h2>Monitoring Zone: {currentZone}</h2>
              <p className="opacity-90">{selectedZone === 'laman-buaya' ? 'Crocodile habitat monitoring zone' : selectedZone === 'sangkar-burung' ? 'Bird habitat monitoring area' : 'Butterfly garden climate zone'}</p>
            </div>
          </div>
        </div>

        {/* Weather Data Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-900">Weather Data</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Data ID</th>
                  <th className="text-left py-3 px-4 text-gray-700">Temperature (°C)</th>
                  <th className="text-left py-3 px-4 text-gray-700">Humidity (%)</th>
                  <th className="text-left py-3 px-4 text-gray-700">Rainfall (mm)</th>
                  <th className="text-left py-3 px-4 text-gray-700">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {mockData.weather.map((data) => (
                  <tr key={data.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{data.id}</td>
                    <td className="py-3 px-4 text-gray-600">{data.temperature.toFixed(1)}</td>
                    <td className="py-3 px-4 text-gray-600">{data.humidity.toFixed(1)}</td>
                    <td className="py-3 px-4 text-gray-600">{data.rainfall.toFixed(1)}</td>
                    <td className="py-3 px-4 text-gray-600">{data.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts and Sensors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h2 className="text-gray-900">Alerts</h2>
            </div>
            <div className="space-y-3">
              {mockData.alerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-gray-900">{alert.id}</span>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        alert.status === 'Active' ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">{alert.threshold}</p>
                  <p className="text-gray-500">Created: {alert.createdTime}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sensors */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-600" />
              <h2 className="text-gray-900">Sensors</h2>
            </div>
            <div className="space-y-3">
              {mockData.sensors.map((sensor) => (
                <div key={sensor.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-gray-900">{sensor.id}</span>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        sensor.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    >
                      {sensor.status}
                    </span>
                  </div>
                  <p className="text-gray-500">Last Updated: {sensor.lastUpdated}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Temperature Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="w-5 h-5 text-blue-600" />
              <h2 className="text-gray-900">Temperature Trend (Last 7 Days)</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Humidity Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-5 h-5 text-green-600" />
              <h2 className="text-gray-900">Humidity Trend (Last 7 Days)</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Rainfall Chart - Full Width */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-5 h-5 text-purple-600" />
              <h2 className="text-gray-900">Rainfall (Last 7 Days)</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rainfall" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}