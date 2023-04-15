import React, { useState } from 'react'
import { STUDENT } from '../../../mocks'

export const STUDENTA = {
  privateTechs: [{
    model: "Test",
    number: "12RT124",
    type: "Холодильник",
  }],
  remarks: [{
    dateAndTime: "10.10.2023 10:10",
    text: "ad fsdf sdf fdg fgdf ert gdgdf",
    mentor: {
      firstName: "Светлана",
      secondName: "Общажновна",
      middleName: "Евгеневно",
    }
  }],
  account: {
    login: 'login1'
  }
}

export function MainStudent() {
  const [data] = useState(STUDENT)
  return (
    <div className="w-100 px-3 py-3 bg-white rounded">
      <div className="d-flex flex-column w-50">
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Фамилия</small>
          <p>{data.secondName}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Имя</small>
          <p>{data.firstName}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Отчество</small>
          <p>{data.middleName}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column w-50">
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Этаж</small>
          <p>{data.room.floor}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Блок</small>
          <p>{data.room.block}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Комната</small>
          <p>{data.room.apartament}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column w-50">
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Номер зачетки</small>
          <p>{data.numberTest}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Email</small>
          <p>{data.email}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Форма обучения</small>
          <p>{data.formEducation}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Дата заселения</small>
          <p>{data.dateEntry}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <small className="text-muted">Баллы</small>
          <p>{data.balls}</p>
        </div>
      </div>
      <hr className="hr" />
    </div>
  )
}