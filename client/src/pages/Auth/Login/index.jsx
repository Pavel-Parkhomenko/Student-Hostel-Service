import React, {useState} from 'react'
import {useHttp} from '../../../hooks'
import {fieldsLogin} from '../../../mocks'
import {Form} from '../../../componets/Form'
import {requestPost} from '../../../helpers'

export function Login() {
  const [form, setForm] = useState({
    login: '',
    password: '',
    numberTest: ''
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
    <Form
      fields={fieldsLogin}
      onChange={handleInput}
      onClick={loginHandle}
      buttonName="Вход"
    />
  )
}