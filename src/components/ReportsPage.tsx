import { ArrowLeft, LogOut } from 'lucide-react';
import { Reports } from './Reports';

interface ReportsPageProps {
  selectedZone: string;
  onBackToDashboard: () => void;
  onLogout: () => void;
}

const zones = {
  'laman': 'Laman',
  'sangkar-burung': 'Sangkar Burung',
  'taman-rama-rama': 'Taman Rama Rama',
};

export function ReportsPage({ selectedZone, onBackToDashboard, onLogout }: ReportsPageProps) {
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
                <h1 className="text-gray-900">Weather Reports</h1>
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
        <Reports selectedZone={selectedZone} />
      </main>
    </div>
  );
}