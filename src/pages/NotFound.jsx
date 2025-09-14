import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h2 className="text-9xl font-extrabold text-primary">404</h2>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link to="/dashboard" className="btn btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
