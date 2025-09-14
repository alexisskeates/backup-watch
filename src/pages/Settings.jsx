import React from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export default function Settings() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('general')
  const [generalSettings, setGeneralSettings] = useState({
    companyName: user.company || 'Your Company',
    emailNotifications: true,
    darkMode: true,
    language: 'en'
  })
  const [imapSettings, setImapSettings] = useState({
    server: 'imap.example.com',
    port: 993,
    username: 'notifications@example.com',
    password: '••••••••••••',
    useSSL: true,
    folderPath: 'INBOX',
    checkInterval: 5
  })
  const [testResult, setTestResult] = useState(null)
  const [isTesting, setIsTesting] = useState(false)
  
  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  const handleImapChange = (e) => {
    const { name, value, type, checked } = e.target
    setImapSettings({
      ...imapSettings,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  const handleSaveGeneral = (e) => {
    e.preventDefault()
    // In a real app, this would save to an API
    setTimeout(() => {
      alert('General settings saved successfully!')
    }, 500)
  }
  
  const handleSaveImap = (e) => {
    e.preventDefault()
    // In a real app, this would save to an API
    setTimeout(() => {
      alert('IMAP settings saved successfully!')
    }, 500)
  }
  
  const handleTestConnection = () => {
    setIsTesting(true)
    setTestResult(null)
    
    // Simulate API call to test connection
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3
      setTestResult({
        success,
        message: success 
          ? 'Connection successful! IMAP server is reachable and credentials are valid.' 
          : 'Connection failed. Please check your server settings and credentials.'
      })
      setIsTesting(false)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'general'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`${
              activeTab === 'imap'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('imap')}
          >
            IMAP Configuration
          </button>
          <button
            className={`${
              activeTab === 'notifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('notifications')}
          >
            Notification Rules
          </button>
          <button
            className={`${
              activeTab === 'security'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </nav>
      </div>
      
      {/* Content */}
      {activeTab === 'general' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              General Settings
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update your basic preferences and account information.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSaveGeneral} className="px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="companyName" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    className="form-input"
                    value={generalSettings.companyName}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="language" className="form-label">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    className="form-input"
                    value={generalSettings.language}
                    onChange={handleGeneralChange}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailNotifications"
                        name="emailNotifications"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
                        checked={generalSettings.emailNotifications}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="emailNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                        Email Notifications
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Receive email notifications about important system events.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="darkMode"
                        name="darkMode"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
                        checked={generalSettings.darkMode}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="darkMode" className="font-medium text-gray-700 dark:text-gray-300">
                        Dark Mode
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Use dark theme for the dashboard interface.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="btn btn-outline mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {activeTab === 'imap' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              IMAP Configuration
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure the IMAP server settings for email notifications.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSaveImap} className="px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="server" className="form-label">
                    IMAP Server
                  </label>
                  <input
                    type="text"
                    name="server"
                    id="server"
                    className="form-input"
                    value={imapSettings.server}
                    onChange={handleImapChange}
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="port" className="form-label">
                    Port
                  </label>
                  <input
                    type="number"
                    name="port"
                    id="port"
                    className="form-input"
                    value={imapSettings.port}
                    onChange={handleImapChange}
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-input"
                    value={imapSettings.username}
                    onChange={handleImapChange}
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-input"
                    value={imapSettings.password}
                    onChange={handleImapChange}
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="folderPath" className="form-label">
                    Folder Path
                  </label>
                  <input
                    type="text"
                    name="folderPath"
                    id="folderPath"
                    className="form-input"
                    value={imapSettings.folderPath}
                    onChange={handleImapChange}
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="checkInterval" className="form-label">
                    Check Interval (minutes)
                  </label>
                  <input
                    type="number"
                    name="checkInterval"
                    id="checkInterval"
                    className="form-input"
                    value={imapSettings.checkInterval}
                    onChange={handleImapChange}
                    min="1"
                    max="60"
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="useSSL"
                        name="useSSL"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
                        checked={imapSettings.useSSL}
                        onChange={handleImapChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="useSSL" className="font-medium text-gray-700 dark:text-gray-300">
                        Use SSL/TLS
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Enable secure connection to the IMAP server.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {testResult && (
                <div className={`mt-6 p-4 rounded-md ${
                  testResult.success 
                    ? 'bg-green-50 dark:bg-green-900/30' 
                    : 'bg-red-50 dark:bg-red-900/30'
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {testResult.success ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-400 dark:text-green-500" aria-hidden="true" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-400 dark:text-red-500" aria-hidden="true" />
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${
                        testResult.success 
                          ? 'text-green-800 dark:text-green-300' 
                          : 'text-red-800 dark:text-red-300'
                      }`}>
                        {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                      </h3>
                      <div className={`mt-2 text-sm ${
                        testResult.success 
                          ? 'text-green-700 dark:text-green-400' 
                          : 'text-red-700 dark:text-red-400'
                      }`}>
                        <p>{testResult.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="btn btn-outline mr-3"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                >
                  {isTesting ? 'Testing...' : 'Test Connection'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {activeTab === 'notifications' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Notification Rules
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure default notification rules for all clients.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Default Rules</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  These rules will be applied to all new clients by default.
                </p>
                
                <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          Invoice Detection
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Active
                          </span>
                        </h5>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Subject contains "Invoice" OR Subject contains "Bill"
                        </p>
                      </div>
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
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          Payment Confirmation
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Active
                          </span>
                        </h5>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Subject contains "Payment" AND From contains "accounting"
                        </p>
                      </div>
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
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          Shipping Update
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            Inactive
                          </span>
                        </h5>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Subject contains "Shipping" OR Subject contains "Delivery"
                        </p>
                      </div>
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
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Add New Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'security' && (
        <div className="card">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Security Settings
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your account security and authentication options.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Change Password</h4>
                <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      className="form-input"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      className="form-input"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-input"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <button
                      type="button"
                      className="btn btn-primary"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account.
                </p>
                
                <div className="mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    Enable Two-Factor Authentication
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Session Management</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage your active sessions and sign out from other devices.
                </p>
                
                <div className="mt-4">
                  <div className="bg-gray-50 dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      <li>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="text-sm font-medium text-primary truncate">
                                Current Session
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span>Chrome on Windows • San Francisco, CA</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Active Now
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Safari on iPhone
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span>San Francisco, CA • Last active 2 days ago</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                              <button
                                type="button"
                                className="btn btn-outline py-1 px-3 text-xs"
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Firefox on MacOS
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span>New York, NY • Last active 5 days ago</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                              <button
                                type="button"
                                className="btn btn-outline py-1 px-3 text-xs"
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn btn-outline text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Sign Out From All Other Devices
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
