import React from 'react'

export function Loading() {
  return (
    <div className="bg-light rounded d-flex flex-column justify-content-center align-items-center"
         style={{height: '20vh'}}>
      <p>Загрузка...</p>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}