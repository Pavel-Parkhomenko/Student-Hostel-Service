import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useHttp } from "../../hooks"
import { SERVER } from "../../constants"
import { TableTech} from '../ForStudent/Tech/TableTech'
import { Claim } from "../ForStudent";
import defaultImg from '../../assets/student.png'
import { Loading } from "../Loading";
import { toastMess } from "../../helpers";

export function StudentFull(props) {
  const { loading, request } = useHttp()
  const [balls, setBalls] = useState(0)
  const [res, setRes] = useState({})
  const [url, setUrl] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();

  const userRole = useMemo(() => JSON.parse(localStorage.getItem('user')).role, [])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await request(
        SERVER + `/student/get-student-id?id=${id}`
      )
      setRes({...data})
      if(data.balls) setBalls(data.balls)

      fetch(SERVER + '/student/load?' + `img=${data.img}`)
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
    const { message, status, data } = await request(SERVER + '/student/update-balls', "POST", {
      numberTest: id,
      balls
    })
    setRes({...res, balls: data})
    toastMess(status, message)
  }

  async function handleDeleteStudent() {
    const { message, status } = await request(SERVER + `/admin/delete-student?id=${id}`)
    toastMess(status, message)
    return navigate('/admin/students')
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
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Факультет</small>
          <p>{res.faculty}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Группа</small>
          <p>{res.group}</p>
        </div>
      </div>
      <hr className="hr" />
      <button type="button" className="btn btn-light">
        <Link className="text-decoration-none" to={"change-balls"}>Начислить баллы</Link>
      </button>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        { props.children || null }
        {res.privateTechs?.length !== 0
          ?
          <div className="w-75">
            <TableTech privateTechs={res.privateTechs} />
          </div>
          :
          <p>Техники нет</p>
        }
      </div>
      <hr className="hr" />
      {
        userRole === 'mentor'
        ?
        <div className="d-flex flex-column align-items-center">
          <button type="button" className="btn btn-light">
            <Link className="text-decoration-none" to={"create"}>Создать замечание</Link>
          </button>
          {res.remarks?.length !== 0
            ?
            <div className="w-75">
              <Claim remarks={res.remarks} role="mentor" />
            </div>
            :
            <p>Замечаний нет</p>
          }
        </div>
        :
        null
      }
      {
        userRole === 'admin'
          ?
          <div>
            <button
              className="btn btn-danger"
              onClick={handleDeleteStudent}
            >
              Выселить
            </button>
            <br/>
            <small className="text-danger">Будут удалены все данные о студенте.
              Также он потеряет доступ к своей учетной записи</small>
          </div>
          :
          null
      }
    </div>
  )
}

//<div className="d-flex flex-column align-items-center">
//         <label htmlFor="formControlInputBalls" className="form-label">Начислить баллы</label>
//         <input type="number" className="form-control w-25" id="formControlInputBalls" placeholder="50"
//                value={balls}
//                onChange={(event) => setBalls(event.target.value)}
//         />
//         <small className="text-muted">*количество может быть отрицательным</small>
//         <button type="button" className="btn btn-primary mt-3"
//                 onClick={handleChangeBalls}
//         >
//           Сохранить
//         </button>
//       </div>
