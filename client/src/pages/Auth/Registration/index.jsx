import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useHttp } from '../../../hooks'
import { fieldsRegistration } from '../../../mocks'
import { Form } from '../Form'
import { SERVER } from '../../../constants'
import '../styles.css'
import { toastMess } from "../../../helpers";

export function Registration() {
  const [form, setForm] = useState({
    numberTest: '',
    email: ''
  })
  const [errors, setErrors] = useState(new Map())
  const navigate = useNavigate();

  const { request } = useHttp();

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function loginHandle() {
    try {
      const {message, errors, status} = await request(SERVER + '/auth/registr', 'POST', {...form})
      if (!errors) navigate("/login")
      setErrors(errors)
      toastMess(status, message)
    } catch (error) {
      toastMess(false, "Ой, кажется, что-то сломалось")
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
          messFromServer={''}
        />
        <div>
          <span>У вас уже есть аккаунт?</span>&nbsp;&nbsp;
          <Link to='/login'>Вход</Link>
        </div>
        <Link className="text-primary text-decoration-none" to='/'>На главную</Link>
      </div>
      <div className="auth__figure"/>
    </div>
  )
}