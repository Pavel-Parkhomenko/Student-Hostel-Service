import React, { useState } from 'react'
import './style.css'
import { useHttp } from '../../../hooks'
import { URL } from '../../../constants'

export function CreateEvent() {
  const [file, setFile] = useState(null)
  const [party, setParty] = useState([])
  const { request, loading } = useHttp()
  const [form, setForm] = useState({
    header: '',
    description: '',
    dateEvent: '',
    placeEvent: '',
  })

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleSaveEvent() {
    const formData = new FormData()
    formData.append('header', form.header)
    formData.append('description', form.description,)
    formData.append('dateEvent', form.dateEvent)
    formData.append('placeEvent', form.placeEvent)
    formData.append('file', file)
    await fetch(URL + '/event/create-event', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <form className="bg-light rounded p-3 form-user">
      <div className="input-group input-group-sm">
          <span className="input-group-text">
            Заголовок
          </span>
        <input type="text" className="form-control" aria-label="Small input group" aria-describedby="input-group-sm"
               name="header" onChange={handleInput} />
      </div>

      <div>
        <label htmlFor="formControlInput2" className="form-label">Описание</label>
        <textarea name="description" style={{minHeight: "200px"}} className="form-control" id="formControlInput2"
                  onChange={handleInput} />
      </div>

      <div>
        <label htmlFor="file" className="form-label mt-3">Картинка</label>
        <input className="form-control" type="file" id="file" name="file"
               onChange={handleFileChange}/>
      </div>

      <hr className="hr" />

      <div className="input-group input-group-sm">
        <span className="input-group-text">Место проведения</span>
        <input type="text" className="form-control" aria-label="Small input group" aria-describedby="input-group-sm"
               name="placeEvent" onChange={handleInput} />
      </div>
      <div className="input-group input-group-sm">
        <span className="input-group-text">Дата проведения</span>
        <input type="text" className="form-control" aria-label="Small input group" aria-describedby="input-group-sm"
               name="dateEvent" onChange={handleInput} />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSaveEvent}>Сохранить</button>
    </form>
  )
}

//<div>
//         <p>Участники</p>
//         <div className="input-group input-group-sm mb-3">
//           <span className="input-group-text">Фамилия</span>
//           <input type="text" className="form-control" aria-label="Small input group" aria-describedby="input-group-sm"
//                  name="secondName" onChange={handleInput} />
//         </div>
//         <div className="input-group input-group-sm">
//           <span className="input-group-text">Имя</span>
//           <input type="text" className="form-control" aria-label="Small input group" aria-describedby="input-group-sm"
//                  name="firstName" onChange={handleInput} />
//         </div>
//         <div>
//           <label htmlFor="formControlInput3" className="form-label mt-3">Описание</label>
//           <textarea className="form-control" id="formControlInput3" />
//         </div>
//         <div className="mt-3 d-flex align-items-center justify-content-between">
//           <button onClick={handleAddMember} type="button" className="btn btn-outline-primary">Добавить</button>
//           <p className="m-0">Добавлено участников: <span>{party.length}</span></p>
//         </div>
//       </div>
//
//       <hr className="hr" />