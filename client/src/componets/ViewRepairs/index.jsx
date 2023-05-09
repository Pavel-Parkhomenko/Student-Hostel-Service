import React, { useEffect, useState } from 'react'

export function ViewRepairs({ repairs = [] }) {
  if(repairs.length === 0) {
    return <p>Заявок нет</p>
  }
  return (
    <div className='mt-3'>
      <h4>Заявки на починку</h4>
      {repairs.map((item, ind) => (
        <div
          className="card mb-3"
          key={ind}
        >
          <div className="card-header bg-transparent text-muted">
            <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
            {item.dateCreate}
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.header}</h5>
            <p className="card-text">{item.description}</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <div className="text-muted">
              <i className="bi bi-person text-primary fs-5 pe-2" />
              <span>{item.student?.secondName}</span>
              <span className="px-2">{item.student?.firstName}</span>
              <span>{item.student?.middleName}</span>
            </div>
            <div className="text-muted">
              <i className="bi bi-house-check text-primary fs-5 pe-2" />
              <span>{item.room?.floor}-</span>
              <span>{item.room?.block}-</span>
              <span>{item.room?.apartament}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

  )
}