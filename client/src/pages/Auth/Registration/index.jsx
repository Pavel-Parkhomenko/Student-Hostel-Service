import React, {useState} from 'react'
import {useHttp} from '../../../hooks'
import {fieldsRegistration} from '../../../mocks'
import {Form} from '../../../componets/Form'
import '../styles.css'

export function Registration() {
  const [form, setForm] = useState({
    numberTest: '',
    email: ''
  })

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  return (
    <div className="container__auth">
      <Form
        fields={fieldsRegistration}
        onChange={handleInput}
        onClick={()=>console.log(form)}
        buttonName="Регистрация"
      />
    </div>
  )
}