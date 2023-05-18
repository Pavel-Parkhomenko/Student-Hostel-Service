import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css'
import { SERVER } from '../../../constants'
import { dateFormat, toastMess } from '../../../helpers'

export function CreateEvent() {
  const [file, setFile] = useState(null)
  const [form, setForm] = useState({
    header: '',
    description: '',
    dateEvent: '',
    placeEvent: '',
  })

  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleSaveEvent(event) {
    event.preventDefault()
    if(form.description.length < 10 || form.description.length > 1000) {
      toastMess(false, "Описание слишком короткое или длинное")
      return
    }
    if(!selectedDate) {
      toastMess(false, "Дата обязательна")
      return
    }
    const formData = new FormData()
    formData.append('header', form.header)
    formData.append('description', form.description)
    formData.append('dateEvent', dateFormat(selectedDate))
    formData.append('placeEvent', form.placeEvent)
    formData.append('file', file)
    const res = await fetch(SERVER + '/event/create-event', {
      method: 'POST',
      body: formData,
    })
    const mess = await res.json()
    toastMess(res.ok, mess.message)
  }

  return (
    <form className="bg-light rounded p-3 form-user"
          onSubmit={(event) => handleSaveEvent(event)}
    >
      <div className="input-group input-group-sm">
          <span className="input-group-text">
            Заголовок
          </span>
        <input
          type="text"
          className="form-control"
          aria-label="Small input group"
          aria-describedby="input-group-sm"
          name="header"
          onChange={handleInput}
          required
        />
      </div>

      <div>
        <label htmlFor="formControlInput2" className="form-label">Описание</label>
        <textarea
          name="description"
          style={{minHeight: "200px"}}
          className="form-control"
          id="formControlInput2"
          onChange={handleInput}
          required
        />
      </div>

      <div>
        <label htmlFor="file" className="form-label mt-3">Картинка</label>
        <input
          className="form-control"
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          required
        />
      </div>

      <hr className="hr" />

      <div className="input-group input-group-sm">
        <span className="input-group-text">Место проведения</span>
        <input
          type="text"
          className="form-control"
          aria-label="Small input group"
          aria-describedby="input-group-sm"
          name="placeEvent"
          onChange={handleInput}
          required
          pattern=".{5,40}"
          title="Минимум 5 и максимум 40 символов"
        />
      </div>
      <div className="input-group input-group-sm">
        <span className="text-muted mb-2">Дата проведения</span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <button type="submit" className="btn btn-primary">Сохранить</button>
    </form>
  )
}