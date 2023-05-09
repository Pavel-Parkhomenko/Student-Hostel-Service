import React, { useContext, useState } from 'react'
import readXlsxFile from "read-excel-file"
import { useHttp } from "../../../hooks"
import { URL } from '../../../constants'
import { MyContext } from '../../../context'

export function ImportStudents() {
  const [file, setFile] = useState([])
  const { request } = useHttp()
  const { toast } = useContext(MyContext)

  function handleChange(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      setFile(rows)
    })
  }

  async function handleImport(event) {
    event.preventDefault()
    try {
      const { message } = await request(URL + '/student/import-students', 'POST', file)
      toast.success(message);
    } catch (error) {
      toast.error("Упс. Ошибка");
    }
  }

  return (
    <form className="px-3 py-3 bg-white rounded" style={{height: '100vh'}}>
      <label htmlFor="formFileStudents" className="form-label">Импортировать данные студентов из фала формата Excel</label>
      <input
        onChange={e => handleChange(e)} className="form-control my-3"
        type="file" id="formFileStudents" required
      />
      <button
        type="submit"
        onClick={(event) => handleImport(event)}
        className="btn btn-primary"
      >
        Импортировать данные
      </button>
    </form>
  )
}