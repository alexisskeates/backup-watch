import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeftIcon,
  UserGroupIcon,
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'

export default function DistributorDetail() {
  const { id } = useParams()
  const [distributor, setDistributor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Load mock data
  useEffect(() => {
    setTimeout(() => {
      setDistributor({
        id,
        name: 'John Smith',
        email: 'john@example.com',
        company: 'Tech Solutions Inc.',
        phone: '(555) 123-4567',
        status: 'active',
        createdAt: new Date(2024, 5, 15),
        address: '123 Main St, San Francisco, CA 94105',
        website: 'https://techsolutions.example.com',
        notes: 'Enterprise distributor with focus on financial sector clients.',
        partners: [
          { id: '1', name: 'Partner A', clientsCount: 12 },
          { id: '2', name: 'Partner B', clientsCount: 8 },
          { id: '3', name: 'Partner C', clientsCount: 15 },
          { id: '4', name: 'Partner D', clientsCount: 7 },
          { id: '5', name: 'Partner E', clientsCount: 6 }
        ],
        clients: [
          { id: '1', name: 'Client X', partnerId: '1' },
          { id: '2', name: 'Client Y', partnerId: '1' },
          { id: '3', name: 'Client Z', partnerId: '2' },
          { id: '4', name: 'Client A', partnerId: '3' },
          { id: '5', name: 'Client B', partnerId: '3' }
        ],
        recentActivity: [
          { id: '1', action: 'Added new partner', date: new Date(2025, 0, 10) },
          { id: '2', action: 'Updated configuration', date: new Date(2025, 0, 8) },
          { id: '3', action: 'Added new client', date: new Date(2025, 0, 5) },
          { id: '4', action: 'Changed status to active', date: new Date(2025, 0, 1) }
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
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading distributor details...</p>
        </div>
      </div>
    )
  }

  if (!distributor) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Distributor not found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The distributor you're looking for doesn't exist or you don't have access.</p>
        <div className="mt-6">
          <Link to="/distributors" className="btn btn-primary">
            Back to Distributors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center">
          <Link to="/distributors" className="mr-4 text-gray-400 hover:text-gray-500">
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{distributor.name}</h1>
          <span className={`ml-4 status-badge ${
            distributor.status === 'active' ? 'status-success' : 'status-neutral'
          }`}>
            {distributor.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {distributor.company}
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
              activeTab === 'partners'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('partners')}
          >
            Partners ({distributor.partners.length})
          </button>
          <button
            className={`${
              activeTab === 'clients'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('clients')}
          >
            Clients ({distributor.clients.length})
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
          {/* Distributor Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Distributor Information
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Edit</span>
                </button>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      {distributor.name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      {distributor.company}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      <a href={`mailto:${distributor.email}`} className="text-primary hover:text-primary/80">
                        {distributor.email}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      <a href={`tel:${distributor.phone}`} className="text-primary hover:text-primary/80">
                        {distributor.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {distributor.address}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <a href={distributor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        {distributor.website.replace(/^https?:\/\//, '')}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {distributor.notes}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Statistics
                </h3>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <dl>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Partners</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <UserGroupIcon className="h-5 w-5 text-primary mr-2" />
                      {distributor.partners.length}
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Clients</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <UsersIcon className="h-5 w-5 text-secondary mr-2" />
                      {distributor.clients.length}
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      {format(distributor.createdAt, 'MMM d, yyyy')}
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
                  {distributor.recentActivity.slice(0, 3).map((activity) => (
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
      
      {activeTab === 'partners' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Partners
            </h3>
            <button
              type="button"
              className="btn btn-primary inline-flex items-center"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Partner
            </button>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {distributor.partners.map((partner) => (
                <li key={partner.id} className="px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserGroupIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{partner.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {partner.clientsCount} {partner.clientsCount === 1 ? 'client' : 'clients'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/partners/${partner.id}`}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {activeTab === 'clients' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Clients
            </h3>
            <div className="flex space-x-2">
              <select className="form-input py-1 text-sm">
                <option value="">All Partners</option>
                {distributor.partners.map((partner) => (
                  <option key={partner.id} value={partner.id}>{partner.name}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-primary inline-flex items-center"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add Client
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {distributor.clients.map((client) => {
                const partner = distributor.partners.find(p => p.id === client.partnerId)
                return (
                  <li key={client.id} className="px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <UsersIcon className="h-6 w-6 text-secondary" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Partner: {partner ? partner.name : 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`/clients/${client.id}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
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
              {distributor.recentActivity.map((activity) => (
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
