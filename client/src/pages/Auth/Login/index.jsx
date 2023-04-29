import React, { useState, useContext } from 'react'
import {useHttp} from '../../../hooks'
import {fieldsLogin} from '../../../mocks'
import {Form} from '../../../componets/Form'
import '../styles.css'
import {Link, useNavigate} from "react-router-dom";
import { URL } from '../../../constants'

export function Login({ setContextState }) {
  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  const [errors, setErrors] = useState(new Map())
  const [mess, setMessage] = useState('')
  const navigate = useNavigate();

  const {loading, request} = useHttp();

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function loginHandle() {
    try {
      const {data, message, errors} = await request(URL + '/auth/login', 'POST', {...form})
      if(!errors && data.role === 'mentor'){
        localStorage.setItem('mentor', JSON.stringify(data._doc));
        navigate("/mentor")
      }
      if(!errors && data.role === 'student') {
        localStorage.setItem('student', JSON.stringify(data._doc));
        navigate("/student")
      }
      setErrors(errors)
      setMessage(message)
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
          messFromServer={mess}
        />
        <div>
          <span>У вас еще нет аккаунта?</span>&nbsp;&nbsp;
          <Link to='/reg'>Регистрация</Link>
        </div>
      </div>
    </div>
  )
}