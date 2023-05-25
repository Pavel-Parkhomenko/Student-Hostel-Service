import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { toastMess } from "../../../helpers";

export function CreateChat() {
  const { request } = useHttp()
  const [res, setRes] = useState([])
  const [usersId, setUsersId] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const impact = JSON.parse(localStorage.getItem('user')).impact
      const { data } = await request(SERVER + '/mentor/get-students-by-impact', "POST", {
        impact
      })
      setRes([...data])
    }
    fetchData()
  }, [])

  async function handleCreateChat(event) {
    event.preventDefault()
    const { message, status } = await request(SERVER + '/chat/create-chat', 'POST', {
      arrayId: usersId,
      name: name,
      idMentor: JSON.parse(localStorage.getItem('user'))._id
    })
    toastMess(status, message)
  }

  return (
    <div className="rounded bg-light p-3">
      <form onSubmit={(event) => handleCreateChat(event)}>
        <div className="input-group input-group-sm">
          <span className="input-group-text" id="input-group-sm-example">Название чата</span>
          <input
            pattern="[A-Za-zА-Яа-яЁё-.0-9]{3,10}"
            title="Минимум 3 и максимум 10 символов"
            type="text"
            className="form-control"
            aria-label="input group"
            aria-describedby="input-group"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <p className="text-muted">Перед созданием чата, сначала выберите студентов</p>
        <button
          type="submit"
          className="btn btn-info my-3"
        >
          Создать чат
        </button>
      </form>
      <div>
        <table className="table table-striped bg-light rounded">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Фамилия</th>
            <th scope="col">Имя</th>
            <th scope="col">Отчество</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {res.map(({ _id, firstName, middleName, secondName, numberTest}, ind) => (
            <tr key={numberTest}>
              <th scope="row">{ind + 1}</th>
              <td><input type="checkbox" onChange={() => setUsersId([...usersId, _id])}/></td>
              <td>{secondName}</td>
              <td>{firstName}</td>
              <td>{middleName}</td>
              <td><Link to={`/mentor/students/${numberTest}`}><i className="bi bi-file-text"></i></Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}