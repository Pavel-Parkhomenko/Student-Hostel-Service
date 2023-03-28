import React, { useState } from 'react'
import readXlsxFile from 'read-excel-file'
import {useHttp} from "../../hooks";

export function Home() {

  const [file, setFile] = useState([])
  function handleChange(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      console.log(rows)
      setFile(rows)
    })
  }
  const {loading, request} = useHttp();
  async function loginHandle() {
    try {
      const { message } = await request('/student/import-students', 'POST', file)
      console.log(message)
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div className="container">
      <input onChange={e => handleChange(e)} type="file" id="input" className="w-100"/>
      <button type="button" onClick={loginHandle} className="btn-primary">test</button>
    </div>
  )
}