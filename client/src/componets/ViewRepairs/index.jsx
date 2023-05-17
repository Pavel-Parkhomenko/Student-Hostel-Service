import React from 'react'
import { RepairStatus0 } from "../ForAdmin/RepairAction/RepairStatus0";
import { RepairStatus1 } from "../ForAdmin/RepairAction/RepairStatus1";
import { EmptyData } from "../EmptyData";

const STATUS = {
  0: 'Новый',
  1: 'В процессе',
  2: 'Завершен'
}

export function ViewRepairs({ repairs = [], role, children }) {
  if(repairs.length === 0) {
    return <EmptyData message="Заявок на починку оборудования нет"/>
  }
  return (
    <div className='mt-3'>
      {repairs.map((item, ind) => (
        <div
          className="card mb-3"
          key={ind}
        >
          <div className="card-header bg-transparent text-muted d-flex justify-content-between">
            <span>
              <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
              {item.dateCreate}
            </span>
            <span className="text-warning">{STATUS[item.status]}</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.header}</h5>
            <p className="card-text">{item.description}</p>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
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
            {children || null}
            {role === 'admin' && item.status === 0 ?
              <RepairStatus0 idRepair={item._id}/>
            : null}
            {role === 'admin' && item.status === 1 ?
              <RepairStatus1 idRepair={item._id} run={item.run} />
              : null}
          </div>
        </div>
      ))}
    </div>
  )
}