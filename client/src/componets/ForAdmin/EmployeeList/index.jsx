import React, { useEffect, useState } from 'react'
import { useHttp } from "../../../hooks";
import { URL } from "../../../constants";
import { Link } from "react-router-dom";
import { Loading } from "../../Loading";

export function EmployeeList() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await request(URL + '/admin/get-employee', "GET")
      setRes([...data])
    }
    fetchData()
  }, [])

  if(loading) return <Loading />

  return(
    <div className="min-vh-100 bg-light rounded p-3">
      <table className="table table-striped">
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
        {res.map(({ firstName, middleName, secondName, _id, account}, ind) => (
          <tr key={_id}>
            <th scope="row">{ind + 1}</th>
            <td>{secondName}</td>
            <td>{firstName}</td>
            <td>{middleName}</td>
            <td><Link to={`${account?.login}`}>
              <i className="bi bi-file-text"></i>
            </Link></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}