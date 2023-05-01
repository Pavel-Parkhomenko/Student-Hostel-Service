import React, { useEffect, useState } from 'react'

export function MainStudent() {
  const [data, setData] = useState({})

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("user")))
  }, [])

  return (
    <div className="w-100 px-3 py-3 bg-white rounded">
      <p className="text-muted mb-3">Здесь вы можете изменить логин, пароль или email</p>
      <div className="d-flex flex-column">
        <div className="row mb-3">
          <label htmlFor="inputEmail1" className="col-sm-2 col-form-label w-25">Email</label>
          <div className="col-sm-10 w-50">
            <input type="email" className="form-control" id="inputEmail1"
                   placeholder={data.email}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail2" className="col-sm-2 col-form-label w-25">Логин</label>
          <div className="col-sm-10 w-50">
            <input type="email" className="form-control" id="inputEmail2"
                   placeholder={data.account?.login}
            />
          </div>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column">
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label w-25">Введите старый пароль</label>
          <div className="col-sm-10 w-50">
            <input type="email" className="form-control" id="inputEmail3"/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label w-25">Введите новый пароль</label>
          <div className="col-sm-10 w-50">
            <input type="email" className="form-control" id="inputEmail3"/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail4" className="col-sm-2 col-form-label w-25">Повторите пароль</label>
          <div className="col-sm-10 w-50">
            <input type="email" className="form-control" id="inputEmail4"/>
          </div>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex justify-content-between bd-highlight mt-3">
        <button
          type="button"
          className="bg-primary border-0 text-light rounded"
          onClick={() => console.log()}
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  )
}