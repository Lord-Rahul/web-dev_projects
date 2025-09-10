import React from 'react'


function Logo({ width = '100px' }) {
  return (
    <div style={{ width }} className="flex items-center gap-2 font-bold text-xl text-blue-700">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#2563eb"/>
        <path d="M7 17V7h2v10H7zm4 0V7h2v10h-2zm4 0V7h2v10h-2z" fill="#fff"/>
      </svg>
      BlogApp
    </div>
  );
}

export default Logo