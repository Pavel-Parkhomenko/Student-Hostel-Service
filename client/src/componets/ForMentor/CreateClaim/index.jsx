import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { useParams } from 'react-router-dom'
import { MyContext } from '../../../context'
import { dateFormat } from '../../../helpers'

export function CreateClaim() {
  const [dateAndTime, setDateAndTime] = useState('')
  const [header, setHeader] = useState('')
  const [text, setText] = useState('')
  const [mentorStorage] = useState(JSON.parse(localStorage.getItem("user")))
  const {loading, request} = useHttp();
  const { id } = useParams()
  const { toast } = useContext(MyContext)

  useEffect(() => {
    setDateAndTime(dateFormat())
  }, [])

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const btnClickHandle = async () => {
    const form = {
      numberTest: id,
      header,
      text,
      mentor: {
        firstName: mentorStorage.firstName,
        secondName: mentorStorage.secondName,
        middleName: mentorStorage.middleName
      },
      dateAndTime
    }
    const { message } = await request(SERVER + '/student/create-claim', 'POST', {...form})
    toast.success(message)
  }

  return (
    <div className="card mb-3">
      <div className="card-header bg-transparent text-muted">
        <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
        {dateAndTime}
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <label htmlFor="inputEmail1" className="col-sm-2 col-form-label w-25">Заголовок</label>
          <div className="col-sm-10 w-50">
            <input
              type="text"
              className="form-control"
              id="inputEmail1"
              value={header}
              onChange={handleHeaderChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail2" className="col-sm-2 col-form-label w-25">Текст</label>
          <div className="col-sm-10 w-50">
            <textarea
              style={{minHeight: "300px"}}
              className="form-control"
              id="inputEmail2"
              value={text}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div className="text-muted">
          <i className="bi bi-person text-primary fs-5 pe-2" />
          <span>{mentorStorage.secondName}</span>
          <span className="px-2">{mentorStorage.firstName}</span>
          <span>{mentorStorage.middleName}</span>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={btnClickHandle}
        >
          Создать
        </button>
      </div>
    </div>
  )
}