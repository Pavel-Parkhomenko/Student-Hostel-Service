import React, { useEffect, useState } from 'react'
import { useHttp } from "../../hooks";
import { URL } from "../../constants";
import { Link } from "react-router-dom";
import { Loading } from '../Loading'

export function StudentList() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await request(URL + '/student/get-info', "GET")
      setRes([...data])
    }
    fetchData()
  }, [])

  if(loading) return <Loading />

  if(res.length === 0) {
    return <div className="bg-light rounded min-vh-100 p-3">
      <p>Для начала нужно ипортировать список студентов</p>
      <Link to='/admin/students/import'>Перейти</Link>
    </div>
  }

  return (
    <table className="table table-striped bg-light rounded">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Имя</th>
        <th scope="col">Отчество</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      {res.map(({ firstName, middleName, secondName, numberTest}, ind) => (
        <tr key={numberTest}>
          <th scope="row">{ind + 1}</th>
          <td>{secondName}</td>
          <td>{firstName}</td>
          <td>{middleName}</td>
          <td><Link to={`${numberTest}`}>
            <i className="bi bi-file-text"></i>
          </Link></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}