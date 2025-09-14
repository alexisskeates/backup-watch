import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeftIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  PencilIcon,
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { useAuth } from '../contexts/AuthContext'

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

export default function ClientDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [client, setClient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [notificationFilter, setNotificationFilter] = useState('all')
  
  // Load mock data
  useEffect(() => {
    setTimeout(() => {
      setClient({
        id,
        name: 'Client X',
        email: 'clientx@example.com',
        company: 'Client X Corp',
        distributorId: '1',
        distributorName: 'Tech Solutions Inc.',
        partnerId: '1',
        partnerName: 'Partner A',
        status: 'active',
        createdAt: new Date(2024, 7, 15),
        address: '789 Oak St, San Francisco, CA 94105',
        website: 'https://clientx.example.com',
        notes: 'Enterprise client with custom notification rules.',
        imapSettings: {
          server: 'imap.clientx.example.com',
          port: 993,
          username: 'notifications@clientx.example.com',
          useSSL: true,
          folderPath: 'INBOX/Notifications'
        },
        notificationRules: [
          { id: '1', name: 'Invoice Received', pattern: 'Subject contains "Invoice"', isActive: true },
          { id: '2', name: 'Payment Confirmation', pattern: 'Subject contains "Payment" AND From contains "accounting"', isActive: true },
          { id: '3', name: 'Shipping Update', pattern: 'Subject contains "Shipping" OR Subject contains "Delivery"', isActive: false }
        ],
        notifications: [
          {
            id: '1',
            title: 'Invoice #12345 Received',
            message: 'New invoice received from Supplier ABC',
            timestamp: new Date(2025, 0, 15, 9, 30),
            status: 'success',
            rule: 'Invoice Received'
          },
          {
            id: '2',
            title: 'Payment Confirmation #98765',
            message: 'Payment of $1,250.00 confirmed',
            timestamp: new Date(2025, 0, 14, 14, 45),
            status: 'success',
            rule: 'Payment Confirmation'
          },
          {
            id: '3',
            title: 'Connection Warning',
            message: 'IMAP connection timeout',
            timestamp: new Date(2025, 0, 14, 11, 20),
            status: 'warning',
            rule: 'System'
          },
          {
            id: '4',
            title: 'Authentication Failed',
            message: 'Invalid IMAP credentials',
            timestamp: new Date(2025, 0, 13, 16, 10),
            status: 'error',
            rule: 'System'
          },
          {
            id: '5',
            title: 'Invoice #12346 Received',
            message: 'New invoice received from Supplier XYZ',
            timestamp: new Date(2025, 0, 12, 10, 15),
            status: 'success',
            rule: 'Invoice Received'
          }
        ],
        recentActivity: [
          { id: '1', action: 'Added notification rule', date: new Date(2025, 0, 10) },
          { id: '2', action: 'Updated IMAP settings', date: new Date(2025, 0, 8) },
          { id: '3', action: 'Changed status to active', date: new Date(2025, 0, 5) }
        ]
      })
      setIsLoading(false)
    }, 1000)
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading client details...</p>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Client not found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The client you're looking for doesn't exist or you don't have access.</p>
        <div className="mt-6">
          <Link to="/clients" className="btn btn-primary">
            Back to Clients
          </Link>
        </div>
      </div>
    )
  }

  // Filter notifications
  const filteredNotifications = client.notifications.filter(notification => {
    if (notificationFilter === 'all') return true
    return notification.status === notificationFilter
  })

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center">
          <Link to="/clients" className="mr-4 text-gray-400 hover:text-gray-500">
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{client.name}</h1>
          <span className={`ml-4 status-badge ${
            client.status === 'active' ? 'status-success' : 'status-neutral'
          }`}>
            {client.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {client.company}
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`${
              activeTab === 'notifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`${
              activeTab === 'settings'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button
            className={`${
              activeTab === 'activity'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </nav>
      </div>
      
      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Client Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Client Information
                </h3>
                {(user.role === 'owner' || user.role === 'distributor' || user.role === 'partner') && (
                  <button
                    type="button"
                    className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </button>
                )}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      {client.name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      {client.company}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      <a href={`mailto:${client.email}`} className="text-primary hover:text-primary/80">
                        {client.email}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {client.address}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        {client.website.replace(/^https?:\/\//, '')}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      {format(client.createdAt, 'MMM d, yyyy')}
                    </dd>
                  </div>
                  {(user.role === 'owner' || user.role === 'distributor') && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Partner</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <Link to={`/partners/${client.partnerId}`} className="text-primary hover:text-primary/80">
                          {client.partnerName}
                        </Link>
                      </dd>
                    </div>
                  )}
                  {user.role === 'owner' && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Distributor</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <Link to={`/distributors/${client.distributorId}`} className="text-primary hover:text-primary/80">
                          {client.distributorName}
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {client.notes}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* Stats & Recent Activity */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Notification Statistics
                </h3>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <dl>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <BellIcon className="h-5 w-5 text-primary mr-2" />
                      {client.notifications.length}
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Success</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      {client.notifications.filter(n => n.status === 'success').length}
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Warnings</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      {client.notifications.filter(n => n.status === 'warning').length}
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Errors</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      {client.notifications.filter(n => n.status === 'error').length}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="card">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {client.recentActivity.slice(0, 3).map((activity) => (
                    <li key={activity.id} className="px-4 py-3">
                      <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{format(activity.date, 'MMM d')}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-3 text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                    onClick={() => setActiveTab('activity')}
                  >
                    View all activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'notifications' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Notifications
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setNotificationFilter('all')}
                className={`px-2 py-1 text-xs rounded-md ${notificationFilter === 'all' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                All
              </button>
              <button 
                onClick={() => setNotificationFilter('success')}
                className={`px-2 py-1 text-xs rounded-md ${notificationFilter === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                Success
              </button>
              <button 
                onClick={() => setNotificationFilter('warning')}
                className={`px-2 py-1 text-xs rounded-md ${notificationFilter === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                Warning
              </button>
              <button 
                onClick={() => setNotificationFilter('error')}
                className={`px-2 py-1 text-xs rounded-md ${notificationFilter === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                Error
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
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
                          <span>Rule: {notification.rule}</span>
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
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* IMAP Settings */}
          <div className="card">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                IMAP Settings
              </h3>
              {(user.role === 'owner' || user.role === 'distributor' || user.role === 'partner') && (
                <button
                  type="button"
                  className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Edit</span>
                </button>
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Server</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {client.imapSettings.server}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Port</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {client.imapSettings.port}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {client.imapSettings.username}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">SSL/TLS</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {client.imapSettings.useSSL ? 'Enabled' : 'Disabled'}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Folder Path</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {client.imapSettings.folderPath}
                  </dd>
                </div>
              </dl>
              
              {(user.role === 'owner' || user.role === 'distributor' || user.role === 'partner') && (
                <div className="mt-6">
                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    Test Connection
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Notification Rules */}
          <div className="card">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Notification Rules
              </h3>
              {(user.role === 'owner' || user.role === 'distributor' || user.role === 'partner') && (
                <button
                  type="button"
                  className="btn btn-primary inline-flex items-center"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add Rule
                </button>
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {client.notificationRules.map((rule) => (
                  <li key={rule.id} className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          {rule.name}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            rule.isActive 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {rule.pattern}
                        </p>
                      </div>
                      {(user.role === 'owner' || user.role === 'distributor' || user.role === 'partner') && (
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button
                            type="button"
                            className="text-red-400 hover:text-red-500"
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'activity' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Activity History
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {client.recentActivity.map((activity) => (
                <li key={activity.id} className="px-4 py-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format(activity.date, 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
