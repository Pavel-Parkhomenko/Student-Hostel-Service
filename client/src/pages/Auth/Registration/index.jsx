import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useHttp } from '../../../hooks'
import { fieldsRegistration } from '../../../mocks'
import { Form } from '../../../componets/Form'
import '../styles.css'

export function Registration({ setContextState }) {
  const [form, setForm] = useState({
    numberTest: '',
    email: ''
  })
  const [errors, setErrors] = useState(new Map())
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const {loading, request} = useHttp();

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function loginHandle() {
    try {
      const {message, errors} = await request('auth/registr', 'POST', {...form})
      if (!errors) navigate("/student")
      setErrors(errors)
      setMessage(message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container__auth">
      <div className="container__auth-into">
        <h1>Регистрация</h1>
        <Form
          fields={fieldsRegistration}
          onChange={handleInput}
          onClick={loginHandle}
          buttonName="Регистрация"
          errors={errors}
          messFromServer={message}
        />
        <div>
          <span>У вас уже есть аккаунт?</span>&nbsp;&nbsp;
          <Link to='/login'>Вход</Link>
        </div>
      </div>
    </div>
  )
}