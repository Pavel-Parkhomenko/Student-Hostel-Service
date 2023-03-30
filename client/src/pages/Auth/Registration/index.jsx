import React, {useState} from 'react'
import { Link } from "react-router-dom"
import {useHttp} from '../../../hooks'
import {fieldsRegistration} from '../../../mocks'
import {Form} from '../../../componets/Form'
import '../styles.css'

export function Registration() {
  const [form, setForm] = useState({
    numberTest: '',
    email: ''
  })
  const [errors, setErrors] = useState(new Map())
  const [message, setMessage] = useState('')

  const {loading, request} = useHttp();

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function loginHandle() {
    try {
      const {message, errors} = await request('/auth/registr', 'POST', {...form})
      if (errors) setErrors(errors)
      else setErrors(errors)
      setMessage(message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container__auth">
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
  )
}