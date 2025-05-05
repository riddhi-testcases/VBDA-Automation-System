import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DataProvider } from './contexts/DataContext';

// Layouts and Pages
import AppLayout from './components/layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Recipients from './pages/Recipients';
import Templates from './pages/Templates';
import Campaigns from './pages/Campaigns';
import NewCampaign from './pages/NewCampaign';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <DataProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="recipients" element={<Recipients />} />
            <Route path="templates" element={<Templates />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="campaigns/new" element={<NewCampaign />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;