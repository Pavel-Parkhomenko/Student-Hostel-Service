import React, { useState } from 'react'
import readXlsxFile from "read-excel-file"
import { useHttp } from "../../../hooks"
import { SERVER } from '../../../constants'
import { toastMess } from '../../../helpers'

export function ImportStudents() {
  const [file, setFile] = useState([])
  const [valueRadio, setValueRadio] = useState(1);
  const { request } = useHttp()

  function handleChange(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      setFile(rows)
    })
  }

  async function handleImport(event) {
    event.preventDefault()
    const { message, status } = await request(SERVER + '/student/import-students', 'POST', {
      students: file,
      type: valueRadio
    })
    toastMess(status, message)
  }

  function changeHandler(event) {
    setValueRadio(event.target.value);
  }

  return (
    <form
      className="px-3 py-3 bg-white rounded"
      style={{height: '100vh'}}
      onSubmit={(event) => handleImport(event)}
    >
      <label htmlFor="formFileStudents" className="form-label">Импортировать данные студентов из фала формата Excel</label>
      <input
        onChange={e => handleChange(e)} className="form-control my-3"
        type="file" id="formFileStudents" required
      />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="radio"
          id="formRadioImport1"
          value="new"
          checked={valueRadio === 'new'}
          onChange={changeHandler}
        />
        <label className="form-check-label" htmlFor="formRadioImport1">
          Заменить все данные<br />
          <small className="text-muted">*Внимание: студентам придется заново регистрироваться</small>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="radio"
          id="formRadioImport2"
          value="add"
          checked={valueRadio === 'add'}
          onChange={changeHandler}
        />
        <label className="form-check-label" htmlFor="formRadioImport2">Добавить новые данные</label>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-3"
      >
        Импортировать данные
      </button>
    </form>
  )
}