import React, { useState } from 'react'
import { useHttp } from '../../../hooks'
import { fieldsLogin } from '../../../mocks'
import { Form } from '../Form'
import '../styles.css'
import { Link, useNavigate } from "react-router-dom";
import { SERVER } from '../../../constants'
import { toastMess } from '../../../helpers'

export function Login() {
  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  const [errors, setErrors] = useState(new Map())
  const navigate = useNavigate();

  const { request } = useHttp();

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function loginHandle() {
    try {
      const {data, message, errors, status} = await request(SERVER + '/auth/login', 'POST', {...form})
      if(!errors && data.role === 'mentor'){
        localStorage.setItem('user', JSON.stringify(data._doc));
        navigate("/mentor")
      }
      if(!errors && data.role === 'student') {
        localStorage.setItem('user', JSON.stringify(data._doc));
        navigate("/student")
      }
      if(!errors && data.role === 'admin') {
        localStorage.setItem('user', JSON.stringify(data._doc));
        navigate("/admin")
      }
      setErrors(errors)
      toastMess(status, message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container__auth">
      <div className="container__auth-into">
        <h1>Вход</h1>
        <Form
          fields={fieldsLogin}
          onChange={handleInput}
          onClick={loginHandle}
          buttonName="Вход"
          errors={errors}
          messFromServer={''}
        />
        <div>
          <span>У вас еще нет аккаунта?</span>&nbsp;&nbsp;
          <Link to='/reg'>Регистрация</Link>
        </div>
      </div>
      <div className="auth__figure"/>
    </div>
  )
}