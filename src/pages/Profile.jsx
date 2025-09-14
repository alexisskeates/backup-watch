import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState({
    name: user.name || 'User Name',
    email: user.email || 'user@example.com',
    phone: '(555) 123-4567',
    bio: 'I am a user of the multi-tenant dashboard system.',
    notifications: {
      email: true,
      browser: true,
      mobile: false
    }
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value
    })
  }
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setProfileData({
      ...profileData,
      notifications: {
        ...profileData.notifications,
        [name]: checked
      }
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save to an API
    setTimeout(() => {
      alert('Profile updated successfully!')
    }, 500)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Profile</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your personal information and preferences.
        </p>
      </div>
      
      <div className="card">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Profile Information
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update your personal details and preferences.
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="flex items-center">
                  <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.name.charAt(0)}
                  </div>
                  <div className="ml-5">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="btn btn-outline"
                      >
                        Change Avatar
                      </button>
                      <button
                        type="button"
                        className="ml-3 btn btn-outline text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-input"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-input"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="form-input bg-gray-100 dark:bg-gray-700"
                  value={user.role}
                  readOnly
                  disabled
                />
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="form-input"
                  value={profileData.bio}
                  onChange={handleInputChange}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Brief description for your profile.
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Notification Preferences</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose how you want to receive notifications.
              </p>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      name="email"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
                      checked={profileData.notifications.email}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive notifications via email.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="browser-notifications"
                      name="browser"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
                      checked={profileData.notifications.browser}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="browser-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Browser Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive browser push notifications.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="mobile-notifications"
                      name="mobile"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
                      checked={profileData.notifications.mobile}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="mobile-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Mobile Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive notifications on your mobile device.
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
    </div>
  )
}
