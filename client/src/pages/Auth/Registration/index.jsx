import React, {useState} from 'react'
import {useHttp} from '../../../hooks'
import {fieldsRegistration} from '../../../mocks'
import {Form} from '../../../componets/Form'

export function Registration() {
  const [form, setForm] = useState({
    login: '',
    password: ''
  })

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  return (
    <Form
      fields={fieldsRegistration}
      onChange={handleInput}
      onClick={()=>console.log(form)}
      buttonName="Регистрация"
    />
  )
}