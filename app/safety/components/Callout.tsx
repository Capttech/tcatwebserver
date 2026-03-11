import React from 'react'

export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-purple-900/30 border-l-4 border-purple-400/90 p-4 rounded-md text-purple-50 mb-4">
      {children}
    </div>
  )
}
