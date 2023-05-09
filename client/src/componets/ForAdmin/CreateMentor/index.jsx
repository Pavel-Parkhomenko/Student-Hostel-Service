import React, { useState } from 'react'
import { SimpleForm } from "../../SimpleForm";
import { CREATE_MENTOR_FORM } from '../../../mocks'

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

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  function handleClick() {
    console.log(form)
  }

  return (
    <div className="w-100 p-3 bg-white rounded">
      <SimpleForm
        fields={CREATE_MENTOR_FORM}
        onChange={handleInput}
        onClick={handleClick}
        buttonName="Сохранить"
        errors={null}
        messFromServer={''}
      />
    </div>
  )
}