import React, {useState} from 'react'
import {useHttp} from '../../../hooks'
import {fieldsLogin} from '../../../mocks'
import {Form} from '../../../componets/Form'
import '../styles.css'
import {Link, useNavigate} from "react-router-dom";

export function Login() {
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
      const {message, errors} = await request('auth/login', 'POST', {...form})
      if(!errors) navigate("/st-room")
      setErrors(errors)
      setMessage(message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container__auth">
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
  )
}