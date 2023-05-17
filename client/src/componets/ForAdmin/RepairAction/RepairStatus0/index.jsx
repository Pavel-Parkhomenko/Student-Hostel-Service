import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useHttp } from '../../../../hooks'
import { SERVER } from '../../../../constants'
import { toastMess } from '../../../../helpers'

export function RepairStatus0({ idRepair }) {

  const [value, setValue] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { request } = useHttp()
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  function handleChange(event) {
    setValue(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const { message, status } = await request(SERVER + '/repair/change-run', 'POST', {
      master: value,
      id: idRepair
    })
    toastMess(status, message)
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="input-group input-group-sm w-50">
        <span className="text-muted mb-2 me-3">Выберите мастера</span>
        <select
          value={value}
          onChange={handleChange}
          className="form-select"
          aria-label="Default select"
          required
        >
          <option selected="">Выберите тип мастера</option>
          <option>Электрик</option>
          <option>Сантехник</option>
          <option>Столяр</option>
        </select>
      </div>
      <div className="input-group input-group-sm">
        <span className="text-muted mb-2">Выберите дату и время исполнения</span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <button className="btn btn-primary mt-3">Сохранить</button>
    </form>
  )
}