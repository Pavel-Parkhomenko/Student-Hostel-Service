import React, { useEffect, useState } from 'react'
import { useHttp } from "../../../hooks";
import { URL } from "../../../constants";


export function Claim({ remarks = [], role }) {
  const [remarksState, setRemarksState] = useState(remarks)
  const { loading, request } = useHttp()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user.remarks) {
      setRemarksState(user.remarks)
    }
  }, [])

  async function handleIRead(event, ind) {
    event.target.textContent = "Прочитано"
    const user = JSON.parse(localStorage.getItem('user'))
    const { message } = await request(
      URL + `/student/change-status-claim`, "POST", {
        numberTest: user.numberTest,
        ind: ind
      }
    )
  }

  return (
    <div>
      {remarksState.map((item, ind) => (
        <div
          className="card mb-3"
          key={ind}
        >
          <div className="card-header bg-transparent text-muted">
            <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
            {item.dateAndTime}
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
            { role === 'mentor' ? null :
              <button type="button" className="btn btn-primary"
                      onClick={( event) => handleIRead(event, ind)}
            >
                {item.status === 0 ? "Я прочитал" : "Прочитано"}
            </button> }
          </div>
        </div>
      ))}
    </div>

  )
}