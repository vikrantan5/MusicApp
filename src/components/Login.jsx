import React from 'react'

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-purple-400">Login</h2>
      <p className="text-gray-400 text-sm text-center mt-2">Access your account</p>
      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-3 mt-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mt-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button className="w-full mt-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg">
        Login →
      </button>
      <p className="text-gray-400 text-xs mt-4 text-center">Forgot password?</p>
    </div>
  </div>
  )
}

export default Login
