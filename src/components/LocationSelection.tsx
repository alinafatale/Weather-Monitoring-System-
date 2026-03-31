import { MapPin, LogOut } from 'lucide-react';

interface LocationSelectionProps {
  onLocationSelect: (location: string) => void;
  onLogout: () => void;
}

const locations = [
  {
    id: 'laman-buaya',
    name: 'Laman Buaya',
    description: 'Crocodile habitat monitoring zone',
    color: 'blue',
  },
  {
    id: 'sangkar-burung',
    name: 'Sangkar Burung',
    description: 'Bird habitat monitoring area',
    color: 'green',
  },
  {
    id: 'taman-rama-rama',
    name: 'Taman Rama Rama',
    description: 'Butterfly garden climate zone',
    color: 'purple',
  },
];

export function LocationSelection({ onLocationSelect, onLogout }: LocationSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Logo and Logout */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            {/* ZooCast Logo */}
            <div className="relative">
              <svg width="50" height="35" viewBox="0 0 140 90" className="text-blue-400">
                <path
                  d="M 100 50 Q 120 50 120 30 Q 120 15 105 10 Q 100 5 95 5 Q 85 0 75 5 Q 65 0 55 5 Q 45 10 40 20 Q 30 20 25 30 Q 20 40 25 50 Q 20 60 30 70 Q 40 75 50 70 Q 60 80 75 80 Q 90 80 100 70 Q 110 75 118 65 Q 125 55 118 50 Q 115 50 110 50 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl text-blue-600 font-bold">Z</span>
              </div>
            </div>
            <span className="text-gray-900 font-bold text-[24px]">ZooCast</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Welcome Section with Background */}
          <div 
            className="relative rounded-2xl shadow-lg overflow-hidden mb-12"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1696419084293-95a554252d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6b28lMjBoYWJpdGF0JTIwbmF0dXJlfGVufDF8fHx8MTc2NzIwNjIxMnww&ixlib=rb-4.1.0&q=80&w=1080')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="text-center py-16 px-8">
              <h1 className="text-white mb-4 font-bold text-[64px] font-[Amiri_Quran_Colored]">Welcome to ZooCast</h1>
              <p className="text-white max-w-2xl mx-auto leading-relaxed opacity-90">
                ZooCast is an advanced weather monitoring system designed specifically for zoo habitat management. 
                Monitor real-time temperature, humidity, rainfall, and environmental conditions across different 
                zones to ensure optimal living conditions for animals. Get instant alerts, track historical data, 
                and generate comprehensive weather reports for better habitat care.
              </p>
            </div>
          </div>

          {/* Location Selection */}
          <div>
            <h2 className="text-gray-900 text-center mb-6">Select Your Monitoring Zone</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => onLocationSelect(location.id)}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-${location.color}-400 hover:-translate-y-1`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${location.color}-100 flex items-center justify-center group-hover:bg-${location.color}-200 transition-colors`}>
                    <MapPin className={`w-8 h-8 text-${location.color}-600`} />
                  </div>
                  <h3 className="text-gray-900 mb-2">{location.name}</h3>
                  <p className="text-gray-600">{location.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}