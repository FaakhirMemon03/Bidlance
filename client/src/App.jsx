import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Explore from './pages/Explore';
import Wallet from './pages/Wallet';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import Profile from './pages/Profile';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />

            {/* Protected — Buyer */}
            <Route path="/dashboard" element={
              <ProtectedRoute><BuyerDashboard /></ProtectedRoute>
            } />
            <Route path="/wallet" element={
              <ProtectedRoute><Wallet /></ProtectedRoute>
            } />

            {/* Protected — Seller */}
            <Route path="/dashboard/seller" element={
              <ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>
            } />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/create-project" element={
              <ProtectedRoute role="seller"><CreateProject /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center text-center">
                <div>
                  <p className="text-8xl mb-4">🌌</p>
                  <h1 className="text-4xl font-black text-white mb-3">404 — Not Found</h1>
                  <p className="text-gray-500 mb-6">This page seems to have gone into orbit.</p>
                  <a href="/" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">Go Home</a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
