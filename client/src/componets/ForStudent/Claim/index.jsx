import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { MyContext } from '../../../context'
import { Loading } from '../../Loading'
import { EmptyData } from '../../EmptyData'

export function Claim({ remarks = [], role='student' }) {
  const [remarksState, setRemarksState] = useState(remarks)
  const { loading, request } = useHttp()
  const { toast } = useContext(MyContext)

  useEffect(() => {
    async function fetchRemarks() {
      const user = JSON.parse(localStorage.getItem('user'))
      const { data } = await request(SERVER + '/student/get-remarks', 'POST', {
        numberTest: user.numberTest
      })
      setRemarksState(data)
    }
    if(role === 'student') fetchRemarks()
  }, [])

  async function handleIRead(event, ind) {
    console.log(event.target)
    event.target.textContent = "Прочитано"
    event.target.classList.remove('btn-primary')
    event.target.classList.add('btn-light')
    const user = JSON.parse(localStorage.getItem('user'))
    const { message } = await request(
      SERVER + `/student/change-status-claim`, "POST", {
        numberTest: user.numberTest,
        ind: ind
      }
    )
    toast.success(message)
  }

  if(loading) return <Loading />

  if(remarksState.length === 0) return <EmptyData message="Замечания отсуствуют"/>

  console.log(remarksState)

  return (
    <div>
      <p>Замечания</p>
      {remarksState.map((item, ind) => (
        <div
          className="card mb-3"
          key={ind}
        >
          <div className="card-header bg-transparent text-muted d-flex justify-content-between">
            <span>
              <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
              {item.dateAndTime}
            </span>
            { item.status === 0 ?
              <span className="text-warning">Новое</span>
              :
              <span className="text-warning">Уже прочитанно</span>
            }
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.header}</h5>
            <p className="card-text">{item.text}</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <div className="text-muted">
              <i className="bi bi-person text-primary fs-5 pe-2" />
              <span>{item.mentor.secondName}</span>
              <span className="px-2">{item.mentor.firstName}</span>
              <span>{item.mentor.middleName}</span>
            </div>
            {role === 'mentor' ?
              <div>
                {item.status === 0 ?
                  <span className="text-danger">Не прочитано</span>
                  :
                  <span className="text-success">Прочитано</span>
                }
              </div>
              :
              item.status === 0
                ?
                <button type="button" className="btn btn-primary" onClick={( event) => handleIRead(event, ind)}>
                  Я понял
                </button>
                :
                <button type="button" className="btn btn-light">
                  Прочитано
                </button>
              }
          </div>
        </div>
      )).reverse()}
    </div>

  )
}