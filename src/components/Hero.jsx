import React from 'react'
import ExamCodeForm from "./ExamCodeForm"

function Hero() {
  return (
    <div className="text-center text-white py-16 px-4 bg-gradient-to-b from-teal-900 to-black min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-5xl font-bold text-green-200">ExamSpy</h1>
    <p className="mt-2 text-lg">Take Your Exams Freely</p>
    <p className="mt-2 text-gray-400">Absolute Security, User-Enabled: Because Trust Starts with Control.</p>
    <ExamCodeForm />
  </div>
  )
}

export default Hero
