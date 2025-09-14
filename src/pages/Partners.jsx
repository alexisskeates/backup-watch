import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

export default function Partners() {
  const { user } = useAuth()
  const [partners, setPartners] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [distributorFilter, setDistributorFilter] = useState('')
  const [distributors, setDistributors] = useState([])

  // Load mock data
  useEffect(() => {
    setTimeout(() => {
      // Different data based on role
      if (user.role === 'owner') {
        setDistributors([
          { id: '1', name: 'Tech Solutions Inc.' },
          { id: '2', name: 'Digital Innovations' },
          { id: '3', name: 'Global Systems' }
        ])
        
        setPartners([
          {
            id: '1',
            name: 'Partner A',
            email: 'partnera@example.com',
            company: 'Partner A LLC',
            distributorId: '1',
            distributorName: 'Tech Solutions Inc.',
            status: 'active',
            clientsCount: 12
          },
          {
            id: '2',
            name: 'Partner B',
            email: 'partnerb@example.com',
            company: 'Partner B Inc.',
            distributorId: '1',
            distributorName: 'Tech Solutions Inc.',
            status: 'active',
            clientsCount: 8
          },
          {
            id: '3',
            name: 'Partner C',
            email: 'partnerc@example.com',
            company: 'Partner C Co.',
            distributorId: '2',
            distributorName: 'Digital Innovations',
            status: 'inactive',
            clientsCount: 5
          },
          {
            id: '4',
            name: 'Partner D',
            email: 'partnerd@example.com',
            company: 'Partner D Group',
            distributorId: '2',
            distributorName: 'Digital Innovations',
            status: 'active',
            clientsCount: 15
          },
          {
            id: '5',
            name: 'Partner E',
            email: 'partnere@example.com',
            company: 'Partner E Solutions',
            distributorId: '3',
            distributorName: 'Global Systems',
            status: 'active',
            clientsCount: 7
          }
        ])
      } else if (user.role === 'distributor') {
        // Distributor only sees their own partners
        setPartners([
          {
            id: '1',
            name: 'Partner A',
            email: 'partnera@example.com',
            company: 'Partner A LLC',
            distributorId: user.id,
            distributorName: user.company,
            status: 'active',
            clientsCount: 12
          },
          {
            id: '2',
            name: 'Partner B',
            email: 'partnerb@example.com',
            company: 'Partner B Inc.',
            distributorId: user.id,
            distributorName: user.company,
            status: 'active',
            clientsCount: 8
          },
          {
            id: '3',
            name: 'Partner C',
            email: 'partnerc@example.com',
            company: 'Partner C Co.',
            distributorId: user.id,
            distributorName: user.company,
            status: 'inactive',
            clientsCount: 5
          }
        ])
      }
      
      setIsLoading(false)
    }, 1000)
  }, [user])

  // Filter partners based on search query and distributor filter
  const filteredPartners = partners.filter(partner => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = 
      partner.name.toLowerCase().includes(query) ||
      partner.email.toLowerCase().includes(query) ||
      partner.company.toLowerCase().includes(query)
    
    const matchesDistributor = distributorFilter ? partner.distributorId === distributorFilter : true
    
    return matchesSearch && matchesDistributor
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Partners</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage partners and their access to the system.
        </p>
      </div>
      
      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative rounded-md w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {user.role === 'owner' && (
            <select
              className="form-input"
              value={distributorFilter}
              onChange={(e) => setDistributorFilter(e.target.value)}
            >
              <option value="">All Distributors</option>
              {distributors.map((distributor) => (
                <option key={distributor.id} value={distributor.id}>
                  {distributor.name}
                </option>
              ))}
            </select>
          )}
        </div>
        
        <button
          type="button"
          className="btn btn-primary inline-flex items-center w-full sm:w-auto"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Partner
        </button>
      </div>
      
      {/* Partners Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Partner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                {user.role === 'owner' && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Distributor
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Clients
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={user.role === 'owner' ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Loading partners...
                  </td>
                </tr>
              ) : filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserGroupIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {partner.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {partner.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{partner.email}</div>
                    </td>
                    {user.role === 'owner' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {partner.distributorName}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${
                        partner.status === 'active' ? 'status-success' : 'status-neutral'
                      }`}>
                        {partner.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {partner.clientsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/partners/${partner.id}`}
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
                ))
              ) : (
                <tr>
                  <td colSpan={user.role === 'owner' ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No partners found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
