import React, { useState } from 'react'
import { SimpleForm } from "../../SimpleForm";
import { CREATE_MENTOR_FORM } from '../../../mocks'
import { useHttp } from '../../../hooks'
import { SERVER } from '../../../constants'
import { toastMess } from '../../../helpers'

export function CreateMentor() {
  const [form, setForm] = useState({
    secondName: '',
    firstName: '',
    middleName: '',
    impactFrom: '',
    impactTo: '',
    login: '',
    password: '',
  })

  const { request } = useHttp()

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function handleClick(event) {
    event.preventDefault()
    const { message, status } = await request(SERVER + '/admin/create-employee', 'POST', {
      ...form
    })
    toastMess(status, message)
  }

  return (
    <div className="w-100 p-3 bg-white rounded">
      <SimpleForm
        fields={CREATE_MENTOR_FORM}
        onChange={handleInput}
        onClick={(event) => handleClick(event)}
        buttonName="Сохранить"
        errors={null}
        messFromServer={''}
      />
    </div>
  )
}