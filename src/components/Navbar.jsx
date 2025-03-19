import React from 'react';

function Navbar({ setPage }) { 
  return (
    <nav className="flex justify-between items-center p-4 bg-transparent text-white">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">V</div>
        <span className="text-lg font-semibold">ExamSpy</span>
      </div>
      <div className="space-x-4">
        <button className="text-white" onClick={() => setPage("home")}>Home</button> {/* ✅ Added onClick */}
        <button className="px-4 py-2 bg-gray-700 rounded-lg" onClick={() => setPage("login")}>Login</button> 
      </div>
    </nav>
  );
}

export default Navbar;
