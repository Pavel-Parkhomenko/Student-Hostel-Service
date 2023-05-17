import React, { useEffect, useState } from 'react'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { Loading } from '../../Loading'
import { CHANGE_MENTOR_DATA_FORM } from "../../../mocks";
import { SimpleForm } from "../../SimpleForm";
import { toastMess } from "../../../helpers"

export function MainMentor() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState({})
  const [url, setUrl] = useState('')
  const [form, setForm] = useState({
    login: '',
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
    phone: '',
    email: '',
  })
  const [file, setFile] = useState(null)
  const [checkForm, setCheckFrom] = useState(false)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setCheckFrom(true)
  };

  useEffect(() => {
    const fetchData = async () => {
      const mentor = JSON.parse(localStorage.getItem('user'))
      const { data } = await request(
        SERVER + '/mentor/info-mentor', "POST", { login: mentor.account?.login}
      )
      setRes({...data})

      fetch(SERVER + '/mentor/load?' + `img=${data.img}`)
        .then(response => {
          if(!response.ok) setUrl('')
          return response.blob()
        })
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          setUrl(url)
        });
    }
    fetchData()
  }, [])

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
    setCheckFrom(true)
  }

  async function handleClick(event) {
    event.preventDefault()
    if(!checkForm) toastMess(false, "Форма не может быть пустая")

    if(form.newPassword !== form.repeatPassword) {
      toastMess(false,'Пароли должны совпадать')
      return
    }

    const formData = new FormData()
    formData.append('id', res._id)
    formData.append('login', form.login)
    formData.append('newPassword', form.newPassword)
    formData.append('oldPassword', form.oldPassword)
    formData.append('phone', form.phone)
    formData.append('email', form.email)
    formData.append('file', file)
    const response = await fetch(SERVER + '/mentor/update-info', {
      method: 'POST',
      body: formData,
    })
    const mentor = await response.json()
    if(!response.ok){
      toastMess(false, mentor.message)
    } else {
      toastMess(true, mentor.message)
      localStorage.setItem('user', JSON.stringify(mentor.data))
    }
  }


  if(loading) return<Loading />

  return (
    <>
      <div className="px-3 py-3 bg-white rounded">
        {url
          ?
          <div className="d-flex justify-content-center align-items-center mb-3">
            <img className="rounded-4" src={url} alt="avatar" style={{maxWidth: '300px'}} />
          </div>
          :
          <div className="d-flex justify-content-center align-items-center">
            <p className="text-muted bg-light rounded-4"
               style={{ width: '300px', height: "200px", textAlign: 'center'}}
            >
              Фотография остуствует
            </p>
          </div>
        }
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Фамилия</small>
            <p>{res.secondName}</p>
          </div>
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Имя</small>
            <p>{res.firstName}</p>
          </div>
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Отчество</small>
            <p>{res.middleName}</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Логин</small>
            <p>{res.account?.login}</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Этажи начало</small>
            <p>{res.impact?.from}</p>
          </div>
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Этажи конец</small>
            <p>{res.impact?.to}</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Телефон</small>
            <p>{res.phone || 'Нет данных'}</p>
          </div>
          <div className="d-flex flex-row justify-content-between w-50">
            <small className="text-muted">Email</small>
            <p>{res.email || 'Нет данных'}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded mt-3">
        <div className="p-3">
          <div className="mb-4 w-75">
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
            fields={CHANGE_MENTOR_DATA_FORM}
            onChange={handleInput}
            onClick={(event) => handleClick(event)}
            buttonName="Сохранить"
            placeHolders={{
              login: res.account?.login || '',
              email: res.email || 'введите свой email',
              phone: res.phone || '',
            }}
          />
        </div>
      </div>
    </>
  )
}