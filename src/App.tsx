import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ForgotPassword } from './components/ForgotPassword';
import { VerificationPage } from './components/VerificationPage';
import { LocationSelection } from './components/LocationSelection';
import { Dashboard } from './components/Dashboard';
import { HistoricalData } from './components/HistoricalData';
import { ReportsPage } from './components/ReportsPage';

type Page = 'login' | 'signup' | 'forgot-password' | 'verification' | 'location-selection' | 'dashboard' | 'historical' | 'reports';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('');

  const handleLogin = (username: string) => {
    setUserEmail(username);
    setIsAuthenticated(true);
    setCurrentPage('location-selection');
  };

  const handleSignUpComplete = (email: string) => {
    setUserEmail(email);
    setCurrentPage('verification');
  };

  const handleVerificationComplete = () => {
    setIsAuthenticated(true);
    setCurrentPage('location-selection');
  };

  const handleLocationSelect = (location: string) => {
    setSelectedZone(location);
    setCurrentPage('dashboard');
  };

  const handleChangeLocation = () => {
    setCurrentPage('location-selection');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setSelectedZone('');
    setCurrentPage('login');
  };

  if (!isAuthenticated) {
    if (currentPage === 'signup') {
      return (
        <SignUpPage
          onSignUpComplete={handleSignUpComplete}
          onBackToLogin={() => setCurrentPage('login')}
        />
      );
    }

    if (currentPage === 'forgot-password') {
      return (
        <ForgotPassword
          onBackToLogin={() => setCurrentPage('login')}
        />
      );
    }

    if (currentPage === 'verification') {
      return (
        <VerificationPage
          email={userEmail}
          onVerificationComplete={handleVerificationComplete}
          onBackToLogin={() => setCurrentPage('login')}
        />
      );
    }

    return (
      <LoginPage
        onLogin={handleLogin}
        onSignUp={() => setCurrentPage('signup')}
        onForgotPassword={() => setCurrentPage('forgot-password')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'location-selection' && (
        <LocationSelection
          onLocationSelect={handleLocationSelect}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard
          userEmail={userEmail}
          selectedZone={selectedZone}
          onNavigateToHistorical={() => setCurrentPage('historical')}
          onNavigateToReports={() => setCurrentPage('reports')}
          onLogout={handleLogout}
          onChangeLocation={handleChangeLocation}
        />
      )}
      {currentPage === 'historical' && (
        <HistoricalData
          selectedZone={selectedZone}
          onBackToDashboard={() => setCurrentPage('dashboard')}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'reports' && (
        <ReportsPage
          selectedZone={selectedZone}
          onBackToDashboard={() => setCurrentPage('dashboard')}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}