import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHttp } from "../../hooks"
import { URL } from "../../constants"
import { TableTech} from '../ForStudent/Tech/TableTech'
import { Claim } from "../ForStudent";

export function StudentFull() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState({})
  const [url, setUrl] = useState('')
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data, message } = await request(
        URL + `/student/get-student-id?id=${id}`
      )
      setRes({...data})

      // fetch(URL + '/test/load?' + `img=${data.img}`)
      //   .then(response => response.blob())
      //   .then(blob => {
      //     const url = window.URL.createObjectURL(new Blob([blob]));
      //     setUrl(url)
      //   });
    }
    fetchData()
  }, [])

  if(loading) return <div>ЗАГРУЗКА</div>

  return (
    <div className="px-3 py-3 bg-white rounded">
      <div className="d-flex justify-content-center w-100 mb-5">
        <img src={url} alt="avatar" style={{ width: '300px', height: "200px"}} />
      </div>
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
          <small className="text-muted">Этаж</small>
          <p>{res.room?.floor}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Блок</small>
          <p>{res.room?.block}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Комната</small>
          <p>{res.room?.apartament}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Этажи начало</small>
          <p>{res.formEducation}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Этажи конец</small>
          <p>{res.numberTest}</p>
        </div>
      </div>
      <hr className="hr" />
      <div>
        {res.privateTechs?.length !== 0
          ?
          <div>
            <TableTech privateTechs={res.privateTechs} />
          </div>
          :
          <div className="d-flex flex-column align-items-center">
            <p>Техники нет</p>
          </div>
        }
      </div>
      <hr className="hr" />
      <div>
        <div>
          <Link to={"create"}>Создать замечание</Link>
        </div>
        {res.remarks?.length !== 0
          ?
          <div>
            <Claim remarks={res.remarks} role="mentor" />
          </div>
          :
          <div className="d-flex flex-column align-items-center">
            <p>Замечаний нет</p>
          </div>
        }
      </div>
    </div>
  )
}