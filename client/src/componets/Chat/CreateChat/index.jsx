import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useHttp } from "../../../hooks";
import { URL } from "../../../constants";

export function CreateChat() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])
  const [usersId, setUsersId] = useState([])
  const [chatId, setChatId] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data, message } = await request(URL + '/student/get-info', "GET")
      setRes([...data])
      const id = await request(URL + '/chat/create-chat', "GET")
      setChatId(id.data.id)
    }
    fetchData()
  }, [])

  async function handleCreateChat() {
    await request(URL + '/chat/add-id-to-user', 'POST', {
      arrayId: usersId,
      idChat: chatId,
      name: name,
      idMentor: JSON.parse(localStorage.getItem('user'))._id
    })
  }

  return (
    <div className="rounded bg-light p-3">
      <div className="input-group input-group-sm">
        <span className="input-group-text" id="input-group-sm-example">Название чата</span>
        <input
          type="text"
          className="form-control"
          aria-label="Small input group"
          aria-describedby="input-group-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className="btn-info" onClick={handleCreateChat}>Создать чат</button>
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
          {res.map(({ id, firstName, middleName, secondName, numberTest}, ind) => (
            <tr key={numberTest}>
              <th scope="row">{ind + 1}</th>
              <td><input type="checkbox" onChange={() => setUsersId([...usersId, id])}/></td>
              <td>{secondName}</td>
              <td>{firstName}</td>
              <td>{middleName}</td>
              <td><Link to={`/mentor/students/${numberTest}`}>Full</Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}