import React from 'react'
import './style.css'
import defaultImg from '../../../assets/student.png'

export function Avatar({ data, ava='' }) {
  return (
    <div className="shadow bg-white pt-3 rounded w-30 me-4 avatar__container">
      <img src={ava || defaultImg} className="foto mb-3"/>
      <div className="w-100 px-3">
        <div className="d-flex flex-column">
          <p><small className="text-muted">Фамилия</small>{data.secondName}</p>
          <p><small className="text-muted">Имя</small>{data.firstName}</p>
          <p><small className="text-muted">Отчество</small>{data.middleName}</p>
        </div>
        <hr className="hr"/>
        <div className="d-flex flex-column">
          <p><small className="text-muted">Этажи</small>{data.room?.floor}</p>
          <p><small className="text-muted">Блок</small>{data.room?.block}</p>
          <p><small className="text-muted">Комната</small>{data.room?.apartament}</p>
        </div>
        <hr className="hr"/>
        <div className="d-flex flex-column">
          <p><small className="text-muted">Образование</small>{data.formEducation}</p>
          <p><small className="text-muted">Номер зачетки</small>{data.numberTest}</p>
        </div>
      </div>
    </div>
  )
}