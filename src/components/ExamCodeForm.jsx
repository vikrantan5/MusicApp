import React from 'react'

function ExamCodeForm() {
  return (
    <div className="bg-gray-800 p-6 mt-6 rounded-xl shadow-lg w-full max-w-md">
    <p className="text-blue-400 font-semibold text-sm">STUDENT ACCESS</p>
    <h2 className="text-white text-2xl font-bold mt-2">Enter Exam Code</h2>
    <p className="text-gray-400 text-sm mt-1">Access your secure examination environment</p>
    <input
      type="text"
      placeholder="Enter exam code (e.g., EX-2025-001)"
      className="w-full p-3 mt-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    <button className="w-full mt-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg">
      Enter Exam →
    </button>
    <p className="text-gray-400 text-xs mt-4 text-center">Are you an exam administrator?</p>
  </div>
  )
}

export default ExamCodeForm
