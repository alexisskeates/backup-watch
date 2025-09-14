import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

export default function Clients() {
  const { user } = useAuth()
  const [clients, setClients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [distributorFilter, setDistributorFilter] = useState('')
  const [partnerFilter, setPartnerFilter] = useState('')
  const [distributors, setDistributors] = useState([])
  const [partners, setPartners] = useState([])

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
          { id: '1', name: 'Partner A', distributorId: '1' },
          { id: '2', name: 'Partner B', distributorId: '1' },
          { id: '3', name: 'Partner C', distributorId: '2' },
          { id: '4', name: 'Partner D', distributorId: '2' },
          { id: '5', name: 'Partner E', distributorId: '3' }
        ])
        
        setClients([
          {
            id: '1',
            name: 'Client X',
            email: 'clientx@example.com',
            company: 'Client X Corp',
            distributorId: '1',
            distributorName: 'Tech Solutions Inc.',
            partnerId: '1',
            partnerName: 'Partner A',
            status: 'active',
            notificationsCount: 156
          },
          {
            id: '2',
            name: 'Client Y',
            email: 'clienty@example.com',
            company: 'Client Y Ltd',
            distributorId: '1',
            distributorName: 'Tech Solutions Inc.',
            partnerId: '1',
            partnerName: 'Partner A',
            status: 'active',
            notificationsCount: 89
          },
          {
            id: '3',
            name: 'Client Z',
            email: 'clientz@example.com',
            company: 'Client Z Inc',
            distributorId: '1',
            distributorName: 'Tech Solutions Inc.',
            partnerId: '2',
            partnerName: 'Partner B',
            status: 'inactive',
            notificationsCount: 42
          },
          {
            id: '4',
            name: 'Client A',
            email: 'clienta@example.com',
            company: 'Client A Group',
            distributorId: '2',
            distributorName: 'Digital Innovations',
            partnerId: '3',
            partnerName: 'Partner C',
            status: 'active',
            notificationsCount: 213
          },
          {
            id: '5',
            name: 'Client B',
            email: 'clientb@example.com',
            company: 'Client B Solutions',
            distributorId: '2',
            distributorName: 'Digital Innovations',
            partnerId: '3',
            partnerName: 'Partner C',
            status: 'active',
            notificationsCount: 78
          }
        ])
      } else if (user.role === 'distributor') {
        // Distributor only sees their partners and clients
        setPartners([
          { id: '1', name: 'Partner A', distributorId: user.id },
          { id: '2', name: 'Partner B', distributorId: user.id },
          { id: '3', name: 'Partner C', distributorId: user.id }
        ])
        
        setClients([
          {
            id: '1',
            name: 'Client X',
            email: 'clientx@example.com',
            company: 'Client X Corp',
            distributorId: user.id,
            distributorName: user.company,
            partnerId: '1',
            partnerName: 'Partner A',
            status: 'active',
            notificationsCount: 156
          },
          {
            id: '2',
            name: 'Client Y',
            email: 'clienty@example.com',
            company: 'Client Y Ltd',
            distributorId: user.id,
            distributorName: user.company,
            partnerId: '1',
            partnerName: 'Partner A',
            status: 'active',
            notificationsCount: 89
          },
          {
            id: '3',
            name: 'Client Z',
            email: 'clientz@example.com',
            company: 'Client Z Inc',
            distributorId: user.id,
            distributorName: user.company,
            partnerId: '2',
            partnerName: 'Partner B',
            status: 'inactive',
            notificationsCount: 42
          }
        ])
      } else if (user.role === 'partner') {
        // Partner only sees their clients
        setClients([
          {
            id: '1',
            name: 'Client X',
            email: 'clientx@example.com',
            company: 'Client X Corp',
            distributorId: '1',
            distributorName: 'Tech Solutions Inc.',
            partnerId: user.id,
            partnerName: user.company,
            status: 'active',
            notificationsCount: 156
          },
          {
            id: '2',
            name: 'Client Y',
            email: 'clienty@example.com',
            company: 'Client Y Ltd',
            distributorId: '1',
            distributorName: 'Tech Solutions Inc.',
            partnerId: user.id,
            partnerName: user.company,
            status: 'active',
            notificationsCount: 89
          }
        ])
      }
      
      setIsLoading(false)
    }, 1000)
  }, [user])

  // Filter clients based on search query, distributor filter, and partner filter
  const filteredClients = clients.filter(client => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = 
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.company.toLowerCase().includes(query)
    
    const matchesDistributor = distributorFilter ? client.distributorId === distributorFilter : true
    const matchesPartner = partnerFilter ? client.partnerId === partnerFilter : true
    
    return matchesSearch && matchesDistributor && matchesPartner
  })

  // Update partners when distributor filter changes
  useEffect(() => {
    if (distributorFilter) {
      const filteredPartners = partners.filter(partner => partner.distributorId === distributorFilter)
      setPartnerFilter('')
      // Don't update the partners list if we're not an owner
      if (user.role === 'owner') {
        setPartners(filteredPartners)
      }
    } else if (user.role === 'owner') {
      // Reset partners for owner
      setTimeout(() => {
        setPartners([
          { id: '1', name: 'Partner A', distributorId: '1' },
          { id: '2', name: 'Partner B', distributorId: '1' },
          { id: '3', name: 'Partner C', distributorId: '2' },
          { id: '4', name: 'Partner D', distributorId: '2' },
          { id: '5', name: 'Partner E', distributorId: '3' }
        ])
      }, 100)
    }
  }, [distributorFilter, user.role])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Clients</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage clients and their notification settings.
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
              placeholder="Search clients..."
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
          
          {(user.role === 'owner' || user.role === 'distributor') && (
            <select
              className="form-input"
              value={partnerFilter}
              onChange={(e) => setPartnerFilter(e.target.value)}
            >
              <option value="">All Partners</option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </select>
          )}
        </div>
        
        {(user.role === 'owner' || user.role === 'distributor' || user.role === 'partner') && (
          <button
            type="button"
            className="btn btn-primary inline-flex items-center w-full sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Client
          </button>
        )}
      </div>
      
      {/* Clients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                {user.role === 'owner' && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Distributor
                  </th>
                )}
                {(user.role === 'owner' || user.role === 'distributor') && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Partner
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Notifications
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={user.role === 'owner' ? 7 : user.role === 'distributor' ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Loading clients...
                  </td>
                </tr>
              ) : filteredClients.length > 0 ? (
                filteredClients.map((client) => (
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
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {client.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{client.email}</div>
                    </td>
                    {user.role === 'owner' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {client.distributorName}
                      </td>
                    )}
                    {(user.role === 'owner' || user.role === 'distributor') && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {client.partnerName}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${
                        client.status === 'active' ? 'status-success' : 'status-neutral'
                      }`}>
                        {client.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {client.notificationsCount}
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
                        {(user.role === 'owner' || user.role === 'distributor' || user.role === 'partner') && (
                          <>
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
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={user.role === 'owner' ? 7 : user.role === 'distributor' ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No clients found
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
