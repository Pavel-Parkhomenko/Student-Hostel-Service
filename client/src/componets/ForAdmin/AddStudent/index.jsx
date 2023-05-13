import React, { useState } from 'react'
import { SimpleForm } from "../../SimpleForm";
import { ADD_STUDENT_FORM } from "../../../mocks";
import { useHttp } from "../../../hooks";
import { URL } from "../../../constants";
import { toastMess } from "../../../helpers";

export function AddStudent() {

  const [form, setForm] = useState({
    firstName: '',
    secondName: '',
    middleName: '',
    formEducation: 0,
    floor: 0,
    block: 0,
    apartament: 0,
  })

  const { request } = useHttp()

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function handleClick(event) {
    event.preventDefault()
    const { message, status } = await request(URL + '/student/add-student', 'POST', {
      ...form
    })
    toastMess(status, message)
  }

  return (
    <div className="w-100 p-3 bg-white rounded">
      <SimpleForm
        fields={ADD_STUDENT_FORM}
        onChange={handleInput}
        onClick={(event) => handleClick(event)}
        buttonName="Сохранить"
        errors={null}
        messFromServer={''}
      />
    </div>
  )
}