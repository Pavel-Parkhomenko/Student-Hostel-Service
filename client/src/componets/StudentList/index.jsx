import React, { useEffect, useState } from 'react'
import { useHttp } from "../../hooks";
import { URL } from "../../constants";
import { Link } from "react-router-dom";

export function StudentList() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, message } = await request(URL + '/student/get-info', "GET")
      console.log(data)
      console.log(message)
      setRes([...data])
    }
    fetchData()
  }, [])

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
          <td><Link to={`${numberTest}`}>Full</Link></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}