import React from 'react'
import './style.css'

export function Avatar({ data }) {
  return (
    <div className="shadow bg-white pt-3 rounded w-30 me-4 avatar__container">
      <img className="foto mb-3"/>
      <div className="w-100 px-3">
        <div className="d-flex flex-column">
          <p><small className="text-muted">Фамилия</small>{data.secondName}</p>
          <p><small className="text-muted">Имя</small>{data.firstName}</p>
          <p><small className="text-muted">Отчество</small>{data.middleName}</p>
        </div>
        <hr className="hr"/>
        <div className="d-flex flex-column">
          <p><small className="text-muted">Форма обучения</small>{data.formEducation}</p>
          <p><small className="text-muted">Кол-во баллов</small>{data.balls}</p>
        </div>
        <hr className="hr"/>
      </div>
    </div>
  )
}