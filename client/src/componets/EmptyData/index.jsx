import React from 'react'

export function EmptyData({ message }) {
  return(
    <div className="bg-light p-3 rounded min-vh-100">
      <p className="text-muted">{message}</p>
    </div>
  )
}