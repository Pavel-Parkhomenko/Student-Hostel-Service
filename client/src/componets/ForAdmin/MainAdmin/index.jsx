import React, { useEffect, useState } from 'react'
import { ADMIN_MAIN_FORM } from "../../../mocks";
import { SimpleForm } from "../../SimpleForm";
import { useHttp } from '../../../hooks'
import { SERVER } from "../../../constants";
import { toastMess } from '../../../helpers'

export function MainAdmin(data = null) {
  const { request } = useHttp()
  const [form, setForm] = useState({
    costHostel: '',
  })
  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const [res, setRes] = useState(data)

  useEffect(() => {
    const fetchData = async () => {
      const admin = JSON.parse(localStorage.getItem('user'))
      setRes(admin)
    }
    fetchData()
  }, [data])

  async function handleClick(event) {
    event.preventDefault()
    const { message, status } = await request(SERVER + '/admin/change-pay-hostel', 'POST', {
      cost: form.costHostel
    })
    toastMess(status, message)
  }

  async function handlePlaces() {
    await request(SERVER + '/admin/change-places', 'GET')
  }

  return (
    <div className="px-3 py-3 bg-white rounded">
      <button onClick={handlePlaces}>Places</button>
      <div className="p-lg-5">
        <SimpleForm
          fields={ADMIN_MAIN_FORM}
          onChange={handleInput}
          onClick={(event) => handleClick(event)}
          buttonName="Сохранить"
          errors={null}
          messFromServer={''}
        />
      </div>
      <hr className="hr" />
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
    </div>
  )
}