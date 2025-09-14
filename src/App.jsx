import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import CreateOwner from './pages/CreateOwner' // Import CreateOwner
import Distributors from './pages/Distributors'
import DistributorDetail from './pages/DistributorDetail'
import Partners from './pages/Partners'
import PartnerDetail from './pages/PartnerDetail'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  const { isAuthenticated } = useAuth()
  
  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/create-owner" element={<CreateOwner />} /> {/* Add CreateOwner route */}
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        <Route path="distributors" element={
          <ProtectedRoute allowedRoles={['owner']}>
            <Distributors />
          </ProtectedRoute>
        } />
        <Route path="distributors/:id" element={
          <ProtectedRoute allowedRoles={['owner']}>
            <DistributorDetail />
          </ProtectedRoute>
        } />
        
        <Route path="partners" element={
          <ProtectedRoute allowedRoles={['owner', 'distributor']}>
            <Partners />
          </ProtectedRoute>
        } />
        <Route path="partners/:id" element={
          <ProtectedRoute allowedRoles={['owner', 'distributor']}>
            <PartnerDetail />
          </ProtectedRoute>
        } />
        
        <Route path="clients" element={
          <ProtectedRoute allowedRoles={['owner', 'distributor', 'partner']}>
            <Clients />
          </ProtectedRoute>
        } />
        <Route path="clients/:id" element={
          <ProtectedRoute allowedRoles={['owner', 'distributor', 'partner', 'client']}>
            <ClientDetail />
          </ProtectedRoute>
        } />
        
        <Route path="settings" element={
          <ProtectedRoute allowedRoles={['owner', 'distributor']}>
            <Settings />
          </ProtectedRoute>
        } />
        
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
