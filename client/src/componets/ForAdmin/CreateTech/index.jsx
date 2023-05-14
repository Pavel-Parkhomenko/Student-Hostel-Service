import React, { useContext, useState } from 'react'
import { SimpleForm } from "../../SimpleForm"
import { CREATE_TECH_FORM } from '../../../mocks'
import { SERVER } from "../../../constants"
import { useParams } from "react-router-dom"
import { useHttp } from "../../../hooks"
import { toastMess } from '../../../helpers'

export function CreateTech() {
  const [form, setForm] = useState({
    model: '',
    number: '',
    type: '',
  })
  const { id } = useParams()
  const { request } = useHttp()

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function handleClick(event) {
    event.preventDefault()
    const data = {
      numberTest: id,
      ...form,
    }
    const { message, status } = await request(SERVER + '/student/add-tech', 'POST', {...data})
    toastMess(status, message)
  }

  return (
    <div className="w-100 p-3 bg-white rounded">
      <SimpleForm
        fields={CREATE_TECH_FORM}
        onChange={handleInput}
        onClick={(event) => handleClick(event)}
        buttonName="Сохранить"
        errors={null}
        messFromServer={''}
      />
    </div>
  )
}