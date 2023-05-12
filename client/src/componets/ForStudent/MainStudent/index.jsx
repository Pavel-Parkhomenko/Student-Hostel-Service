import React, { useContext, useEffect, useState } from 'react'
import { SimpleForm } from "../../SimpleForm";
import { CHANGE_INFO_STUDENT } from "../../../mocks";
import { useHttp } from "../../../hooks";
import { URL } from "../../../constants";
import { MyContext } from '../../../context'

export function MainStudent() {
  const [data, setData] = useState({})

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("user")))
  }, [])

  const { toast } = useContext(MyContext)

  const [form, setForm] = useState({
    email: '',
    login: '',
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  })
  const [file, setFile] = useState(null)

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function handleClick(event) {
    event.preventDefault()
    if(form.newPassword !== form.repeatPassword ){
      toast.error('Пароли должны совпадать')
      return
    }

    const formData = new FormData()
    formData.append('numberTest', data.numberTest)
    formData.append('email', form.email)
    formData.append('login', form.login)
    formData.append('newPassword', form.newPassword)
    formData.append('oldPassword', form.oldPassword)
    formData.append('file', file)
    const response = await fetch(URL + '/student/update-info', {
      method: 'POST',
      body: formData,
    })
    const student = await response.json()
    if(!response.ok){
      toast.error(student.message)
    } else {
      toast.success(student.message)
      localStorage.setItem('user', JSON.stringify(student.data))
    }
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="w-100 p-3 bg-white rounded">
      <div className="mb-4">
        <p className="text-muted">Выберите свою фотографию</p>
        <input
          className="form-control mt-3"
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
        />
      </div>
      <SimpleForm
        fields={CHANGE_INFO_STUDENT}
        onChange={handleInput}
        onClick={(event) => handleClick(event)}
        buttonName="Сохранить"
        errors={null}
        messFromServer={''}
      />
    </div>
  )
}