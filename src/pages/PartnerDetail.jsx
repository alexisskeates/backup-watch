import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeftIcon,
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  PencilIcon,
  PlusIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { useAuth } from '../contexts/AuthContext'

export default function PartnerDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [partner, setPartner] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Load mock data
  useEffect(() => {
    setTimeout(() => {
      setPartner({
        id,
        name: 'Partner A',
        email: 'partnera@example.com',
        company: 'Partner A LLC',
        phone: '(555) 234-5678',
        distributorId: '1',
        distributorName: 'Tech Solutions Inc.',
        status: 'active',
        createdAt: new Date(2024, 6, 10),
        address: '456 Market St, San Francisco, CA 94105',
        website: 'https://partnera.example.com',
        notes: 'Specializes in financial sector clients.',
        clients: [
          { 
            id: '1', 
            name: 'Client X', 
            email: 'clientx@example.com',
            status: 'active',
            createdAt: new Date(2024, 7, 15)
          },
          { 
            id: '2', 
            name: 'Client Y', 
            email: 'clienty@example.com',
            status: 'active',
            createdAt: new Date(2024, 8, 5)
          },
          { 
            id: '3', 
            name: 'Client Z', 
            email: 'clientz@example.com',
            status: 'inactive',
            createdAt: new Date(2024, 9, 20)
          }
        ],
        recentActivity: [
          { id: '1', action: 'Added new client', date: new Date(2025, 0, 12) },
          { id: '2', action: 'Updated configuration', date: new Date(2025, 0, 10) },
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
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading partner details...</p>
        </div>
      </div>
    )
  }

  if (!partner) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Partner not found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The partner you're looking for doesn't exist or you don't have access.</p>
        <div className="mt-6">
          <Link to="/partners" className="btn btn-primary">
            Back to Partners
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
          <Link to="/partners" className="mr-4 text-gray-400 hover:text-gray-500">
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{partner.name}</h1>
          <span className={`ml-4 status-badge ${
            partner.status === 'active' ? 'status-success' : 'status-neutral'
          }`}>
            {partner.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {partner.company}
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
              activeTab === 'clients'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('clients')}
          >
            Clients ({partner.clients.length})
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
          {/* Partner Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Partner Information
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
                      {partner.name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      {partner.company}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      <a href={`mailto:${partner.email}`} className="text-primary hover:text-primary/80">
                        {partner.email}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                      <a href={`tel:${partner.phone}`} className="text-primary hover:text-primary/80">
                        {partner.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {partner.address}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        {partner.website.replace(/^https?:\/\//, '')}
                      </a>
                    </dd>
                  </div>
                  {(user.role === 'owner' || user.role === 'distributor') && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Distributor</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        <Link to={`/distributors/${partner.distributorId}`} className="text-primary hover:text-primary/80">
                          {partner.distributorName}
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {partner.notes}
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
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Clients</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <UsersIcon className="h-5 w-5 text-primary mr-2" />
                      {partner.clients.length}
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Active</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      {partner.clients.filter(client => client.status === 'active').length} clients
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      {format(partner.createdAt, 'MMM d, yyyy')}
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
                  {partner.recentActivity.slice(0, 3).map((activity) => (
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
      
      {activeTab === 'clients' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Clients
            </h3>
            <button
              type="button"
              className="btn btn-primary inline-flex items-center"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Client
            </button>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-surface divide-y divide-gray-200 dark:divide-gray-700">
                  {partner.clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <UsersIcon className="h-6 w-6 text-secondary" aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {client.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{client.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`status-badge ${
                          client.status === 'active' ? 'status-success' : 'status-neutral'
                        }`}>
                          {client.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {format(client.createdAt, 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/clients/${client.id}`}
                            className="text-primary hover:text-primary/80"
                          >
                            <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">View</span>
                          </Link>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              {partner.recentActivity.map((activity) => (
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
