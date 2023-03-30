import React, {useState} from 'react'
import {useHttp} from '../../../hooks'
import {fieldsLogin} from '../../../mocks'
import {Form} from '../../../componets/Form'
import '../styles.css'
import {Link} from "react-router-dom";

export function Login() {
  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  const {loading, request} = useHttp();

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function loginHandle() {
    let response;
    try {
      response = await request('/auth/login', 'POST', {...form})
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
      />
      <div>
        <span>У вас еще нет аккаунта?</span>&nbsp;&nbsp;
        <Link to='/reg'>Регистрация</Link>
      </div>
    </div>
  )
}