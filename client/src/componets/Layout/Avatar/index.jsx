import React, { useEffect, useState } from 'react'
import './style.css'
import defaultImg from '../../../assets/student.png'
import { SERVER } from "../../../constants";
import { Link } from "react-router-dom";

export function Avatar({ data }) {

  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      fetch(SERVER + '/student/load?' + `img=${data.img}`)
        .then(response => {
          if(!response.ok) throw new Error()
          return response.blob()
        })
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          setUrl(url)
        })
        .catch(err => setUrl(''))
    }
    fetchData()
  }, [data])

  return (
    <div className="shadow bg-white pt-3 rounded w-30 me-4" style={{height: '800px'}}>
      <div className="d-flex justify-content-center">
        <img src={url || defaultImg} className="foto mb-3"/>
      </div>
      <div className="w-100 px-3">
        <div className="d-flex flex-column justify-content-between">
          <small className="text-muted">Фамилия</small>
          <p>{data.secondName}</p>
          <small className="text-muted">Имя</small>
          <p>{data.firstName}</p>
          <small className="text-muted">Отчество</small>
          <p>{data.middleName}</p>
        </div>
        <hr className="hr"/>
        <div className="d-flex flex-column justify-content-between">
          <p className="d-flex justify-content-between">
            <small className="text-muted">Этаж</small>
            {data.room?.floor}
          </p>
          <p className="d-flex justify-content-between">
            <small className="text-muted">Блок</small>
            {data.room?.block}
          </p>
          <p className="d-flex justify-content-between">
            <small className="text-muted">Комната</small>
            {data.room?.apartament}
          </p>
        </div>
        <hr className="hr"/>
        <div className="d-flex flex-column justify-content-between">
          <small className="text-muted">Образование</small>
          <p>{data.formEducation}</p>
          <small className="text-muted">Номер зачетки</small>
          <p>{data.numberTest}</p>
        </div>
        <hr className="hr"/>
        <p className="d-flex justify-content-between">
          <small className="text-muted">Баллы</small>
          {data.balls || 0}
        </p>
        <p><Link to={'balls-info'}>История начисления</Link></p>
      </div>
    </div>
  )
}