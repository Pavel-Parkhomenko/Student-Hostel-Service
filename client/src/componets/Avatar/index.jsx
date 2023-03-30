import React from 'react'
import './style.css'

export function Avatar() {
  return (
    <div className="shadow bg-white pt-3 rounded w-30 me-4 avatar__container">
      <img className="foto mb-3"/>
      <div className="w-100 px-3">
        <div className="d-flex flex-column">
          <p><small className="text-muted">Фамилия</small>Пархоменко</p>
          <p><small className="text-muted">Имя</small>Павел</p>
          <p><small className="text-muted">Отчество</small>Леонидович</p>
        </div>
        <hr className="hr"/>
        <div className="d-flex flex-column">
          <p><small className="text-muted">Этаж</small>14</p>
          <p><small className="text-muted">Блок</small>1</p>
          <p><small className="text-muted">Комната</small>1</p>
        </div>
        <hr className="hr"/>
        <div className="d-flex flex-column">
          <p><small className="text-muted">Форма обучения</small>Бесплатное</p>
          <p><small className="text-muted">№ зачетки</small>12345678</p>
        </div>
        <hr className="hr"/>
      </div>
    </div>
  )
}