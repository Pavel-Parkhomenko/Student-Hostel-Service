import React, { useEffect, useState } from 'react'
import { useHttp } from "../../hooks"
import { URL } from "../../constants"
import { useParams } from "react-router-dom"
import { Loading } from "../Loading"

export function FullMentor() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState({})
  const [url, setUrl] = useState('')

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await request(
        URL + '/mentor/info-mentor', "POST", { login: id}
      )
      setRes({...data})

      fetch(URL + '/mentor/load?' + `img=${data.img}`)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          setUrl(url)
        });
    }
    fetchData()
  }, [])

  if(loading) return <Loading />

  return (
    <div className="px-3 py-3 bg-white rounded">
      {url
        ?
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img className="rounded-4" src={url} alt="avatar" style={{ maxHeight: '400px' }} />
        </div>
        :
        <div className="d-flex justify-content-center align-items-center">
          <p className="text-muted bg-light rounded-4"
             style={{ width: '300px', height: "200px", textAlign: 'center'}}
          >
            Фотография остуствует
          </p>
        </div>
      }
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Фамилия</small>
          <p>{res.secondName}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Имя</small>
          <p>{res.firstName}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Отчество</small>
          <p>{res.middleName}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Логин</small>
          <p>{res.account?.login}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Этажи начало</small>
          <p>{res.impact?.from}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Этажи конец</small>
          <p>{res.impact?.to}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Телефон</small>
          <p>{res.phone || 'Нет данных'}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Email</small>
          <p>{res.email || 'Нет данных'}</p>
        </div>
      </div>
    </div>
  )
}