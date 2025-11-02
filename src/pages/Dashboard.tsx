import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/hooks'
import { useNavigate, Link } from 'react-router-dom'
import type { RootState } from '../app/store'
import { logoutThunk } from '../features/auth/authThunks'
import Button from '../components/Button'
import { FaUserEdit, FaKey, FaSignOutAlt, FaBoxOpen } from 'react-icons/fa'

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)!
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logoutThunk())
    navigate('/login')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 mb-8 shadow-md">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.firstName} 👋</h1>
        <p className="text-lg">Manage your profile, explore products, and stay in control.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/profile/edit">
          <div className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <FaUserEdit className="text-blue-600 text-xl" />
              <div>
                <h2 className="text-lg font-semibold">Edit Profile</h2>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/profile/password">
          <div className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <FaKey className="text-yellow-500 text-xl" />
              <div>
                <h2 className="text-lg font-semibold">Change Password</h2>
                <p className="text-sm text-gray-600">Secure your account</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/products">
          <div className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <FaBoxOpen className="text-green-600 text-xl" />
              <div>
                <h2 className="text-lg font-semibold">Browse Products</h2>
                <p className="text-sm text-gray-600">Explore our latest collection</p>
              </div>
            </div>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition w-full text-left"
        >
          <div className="flex items-center gap-3">
            <FaSignOutAlt className="text-red-500 text-xl" />
            <div>
              <h2 className="text-lg font-semibold">Logout</h2>
              <p className="text-sm text-gray-600">Sign out of your account</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Dashboard
