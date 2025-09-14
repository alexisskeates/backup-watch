import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function Distributors() {
  const [distributors, setDistributors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDistributor, setNewDistributor] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'active'
  })

  // Load mock data
  useEffect(() => {
    setTimeout(() => {
      setDistributors([
        {
          id: '1',
          name: 'John Smith',
          email: 'john@example.com',
          company: 'Tech Solutions Inc.',
          phone: '(555) 123-4567',
          status: 'active',
          partnersCount: 12,
          clientsCount: 48
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          company: 'Digital Innovations',
          phone: '(555) 987-6543',
          status: 'active',
          partnersCount: 8,
          clientsCount: 31
        },
        {
          id: '3',
          name: 'Michael Brown',
          email: 'michael@example.com',
          company: 'Global Systems',
          phone: '(555) 456-7890',
          status: 'inactive',
          partnersCount: 5,
          clientsCount: 19
        },
        {
          id: '4',
          name: 'Emily Davis',
          email: 'emily@example.com',
          company: 'Future Technologies',
          phone: '(555) 789-0123',
          status: 'active',
          partnersCount: 10,
          clientsCount: 42
        },
        {
          id: '5',
          name: 'Robert Wilson',
          email: 'robert@example.com',
          company: 'Innovative Solutions',
          phone: '(555) 234-5678',
          status: 'active',
          partnersCount: 7,
          clientsCount: 26
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter distributors based on search query
  const filteredDistributors = distributors.filter(distributor => {
    const query = searchQuery.toLowerCase()
    return (
      distributor.name.toLowerCase().includes(query) ||
      distributor.email.toLowerCase().includes(query) ||
      distributor.company.toLowerCase().includes(query)
    )
  })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Add new distributor to the list
    const newId = (distributors.length + 1).toString()
    const distributor = {
      ...newDistributor,
      id: newId,
      partnersCount: 0,
      clientsCount: 0
    }
    
    setDistributors([...distributors, distributor])
    
    // Reset form and close modal
    setNewDistributor({
      name: '',
      email: '',
      company: '',
      phone: '',
      status: 'active'
    })
    setShowAddModal(false)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDistributor({
      ...newDistributor,
      [name]: value
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Distributors</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your distributors and their access to the system.
        </p>
      </div>
      
      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="relative rounded-md w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Search distributors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary inline-flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Distributor
        </button>
      </div>
      
      {/* Distributors Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Distributor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Partners
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
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Loading distributors...
                  </td>
                </tr>
              ) : filteredDistributors.length > 0 ? (
                filteredDistributors.map((distributor) => (
                  <tr key={distributor.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {distributor.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {distributor.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{distributor.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{distributor.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${
                        distributor.status === 'active' ? 'status-success' : 'status-neutral'
                      }`}>
                        {distributor.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {distributor.partnersCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {distributor.clientsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/distributors/${distributor.id}`}
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
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No distributors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Distributor Modal */}
      {showAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-surface rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white dark:bg-surface px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Add New Distributor
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Fill in the details to add a new distributor to the system.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-input"
                        value={newDistributor.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-input"
                        value={newDistributor.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="form-label">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="form-input"
                        value={newDistributor.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-input"
                        value={newDistributor.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="form-input"
                        value={newDistributor.status}
                        onChange={handleInputChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Add Distributor
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline mt-3 w-full sm:mt-0 sm:w-auto"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
