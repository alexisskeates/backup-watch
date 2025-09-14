import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  ChartBarIcon, 
  UsersIcon, 
  BellAlertIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { format } from 'date-fns'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

// Status badge component
const StatusBadge = ({ status }) => {
  const statusMap = {
    success: {
      className: 'status-success',
      icon: CheckCircleIcon,
      text: 'Success'
    },
    warning: {
      className: 'status-warning',
      icon: ExclamationTriangleIcon,
      text: 'Warning'
    },
    error: {
      className: 'status-error',
      icon: XCircleIcon,
      text: 'Error'
    }
  }
  
  const { className, icon: Icon, text } = statusMap[status] || statusMap.success
  
  return (
    <span className={`status-badge ${className}`}>
      <Icon className="mr-1 h-3 w-3" />
      {text}
    </span>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    totalNotifications: 0,
    successRate: 0
  })
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')
  
  // Mock data loading
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Different stats based on role
      if (user.role === 'owner') {
        setStats({
          totalClients: 124,
          activeClients: 98,
          totalNotifications: 1243,
          successRate: 94
        })
      } else if (user.role === 'distributor') {
        setStats({
          totalClients: 47,
          activeClients: 42,
          totalNotifications: 567,
          successRate: 91
        })
      } else if (user.role === 'partner') {
        setStats({
          totalClients: 18,
          activeClients: 15,
          totalNotifications: 234,
          successRate: 89
        })
      } else {
        setStats({
          totalClients: 1,
          activeClients: 1,
          totalNotifications: 56,
          successRate: 95
        })
      }
      
      // Mock notifications
      setNotifications([
        {
          id: 1,
          title: 'New client onboarded',
          message: 'Client "Acme Corp" has been successfully onboarded',
          timestamp: new Date(2025, 0, 15, 9, 30),
          status: 'success',
          client: 'Acme Corp'
        },
        {
          id: 2,
          title: 'Connection warning',
          message: 'IMAP connection timeout for "TechSolutions Inc"',
          timestamp: new Date(2025, 0, 14, 14, 45),
          status: 'warning',
          client: 'TechSolutions Inc'
        },
        {
          id: 3,
          title: 'Authentication failed',
          message: 'Failed login attempt for "Global Industries"',
          timestamp: new Date(2025, 0, 14, 11, 20),
          status: 'error',
          client: 'Global Industries'
        },
        {
          id: 4,
          title: 'Configuration updated',
          message: 'Email templates updated for "Stellar Services"',
          timestamp: new Date(2025, 0, 13, 16, 10),
          status: 'success',
          client: 'Stellar Services'
        },
        {
          id: 5,
          title: 'New notification rule',
          message: 'Added invoice notification rule for "MegaCorp"',
          timestamp: new Date(2025, 0, 12, 10, 15),
          status: 'success',
          client: 'MegaCorp'
        }
      ])
    }, 500)
  }, [user])
  
  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    return notification.status === filter
  })
  
  // Chart data
  const doughnutData = {
    labels: ['Success', 'Warning', 'Error'],
    datasets: [
      {
        data: [stats.successRate, 100 - stats.successRate - 2, 2],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Notifications',
        data: [65, 59, 80, 81, 56, 25, 40],
        backgroundColor: 'rgba(158, 127, 255, 0.8)',
      },
    ],
  }
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Notifications',
      },
    },
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {user?.name}! Here's what's happening.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Total Clients */}
        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary/10 rounded-md p-3">
              <UsersIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Clients</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalClients}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Active Clients */}
        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-md p-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Clients</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.activeClients}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Total Notifications */}
        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-md p-3">
              <BellAlertIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Notifications</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalNotifications}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Success Rate */}
        <div className="card p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 rounded-md p-3">
              <ChartBarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Success Rate</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.successRate}%</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts and Notifications */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Charts */}
        <div className="card p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Doughnut data={doughnutData} />
              <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">Notification Status</p>
            </div>
            <div>
              <Bar options={barOptions} data={barData} />
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="card">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Notifications</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-2 py-1 text-xs rounded-md ${filter === 'all' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('success')}
                  className={`px-2 py-1 text-xs rounded-md ${filter === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  Success
                </button>
                <button 
                  onClick={() => setFilter('warning')}
                  className={`px-2 py-1 text-xs rounded-md ${filter === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  Warning
                </button>
                <button 
                  onClick={() => setFilter('error')}
                  className={`px-2 py-1 text-xs rounded-md ${filter === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  Error
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                        <StatusBadge status={notification.status} />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                      <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{format(notification.timestamp, 'MMM d, yyyy h:mm a')}</span>
                        <span className="mx-1">•</span>
                        <span>{notification.client}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications found
              </div>
            )}
          </div>
          {filteredNotifications.length > 0 && (
            <div className="p-4 text-center">
              <button className="text-sm text-primary hover:text-primary/80 font-medium">
                View all notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
