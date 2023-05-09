import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHttp } from "../../hooks"
import { URL } from "../../constants"
import { TableTech} from '../ForStudent/Tech/TableTech'
import { Claim } from "../ForStudent";
import defaultImg from '../../assets/student.png'
import { Loading } from "../Loading";

export function StudentFull() {
  const { loading, request } = useHttp()
  const [balls, setBalls] = useState(0)
  const [res, setRes] = useState({})
  const [url, setUrl] = useState('')
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data, message } = await request(
        URL + `/student/get-student-id?id=${id}`
      )
      setRes({...data})
      if(data.balls) setBalls(data.balls)

      fetch(URL + '/student/load?' + `img=${data.img}`)
        .then(response => {
          if(!response.ok) throw new Error()
          return response.blob()
        })
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          setUrl(url)
        }).catch(err => {
          setUrl('')
      })
    }
    fetchData()
  }, [])

  async function handleChangeBalls() {
    const { message } = await request(URL + '/student/update-balls', "POST", {
      numberTest: id,
      balls
    })
  }

  if(loading) return <Loading />

  return (
    <div className="px-3 py-3 bg-white rounded">
      <div className="d-flex justify-content-center w-100 mb-5">
        <img src={url || defaultImg} alt="avatar" style={{ width: '300px'}} />
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
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Баллы</small>
          <p>{res.balls || 0}</p>
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
          <small className="text-muted">Форма образования</small>
          <p>{res.formEducation}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Номер зачетки</small>
          <p>{res.numberTest}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        <label htmlFor="formControlInputBalls" className="form-label">Начислить баллы</label>
        <input type="number" className="form-control w-25" id="formControlInputBalls" placeholder="50"
               value={balls}
               onChange={(event) => setBalls(event.target.value)}
        />
        <small className="text-muted">*количество может быть отрицательным</small>
        <button type="button" className="btn btn-primary mt-3"
                onClick={handleChangeBalls}
        >
          Сохранить
        </button>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        {res.privateTechs?.length !== 0
          ?
          <div className="w-75">
            <TableTech privateTechs={res.privateTechs} />
          </div>
          :
          <p>Техники нет</p>
        }
        <Link to={"add-tech"}>Добавить технику</Link>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        {res.remarks?.length !== 0
          ?
          <div className="w-75">
            <Claim remarks={res.remarks} role="mentor" />
          </div>
          :
          <p>Замечаний нет</p>
        }
        <Link to={"create"}>Создать замечание</Link>
      </div>
    </div>
  )
}
