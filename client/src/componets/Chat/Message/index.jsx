import React from 'react'

export function Message({ text, user, createdAt }) {
  return (
    <div className="border w-75 rounded p-3">
      <p>{text}</p>
      <div className="d-flex justify-content-between text-muted" style={{fontSize: '12px'}}>
        <span>{user}</span>
        <span>{createdAt}</span>
      </div>
    </div>
  )
}